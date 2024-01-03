* **Platform Adaptation**: Supports Linux, Windows, macOS, Android, (Tob, small machines: HP-UX, Solaris, AIX)<br>
* **CPU Architectures**: Supports x86, arm, mips, riscv (Tob: alpha, PowerPC, SPRAC)<br>
* **Security Focus**: Intranet-to-intranet penetration, no need to map any ports to the external network, no changes to firewall configurations<br>
* **Bandwidth Emphasis**: "4G phone + v6 broadband" accesses intranet services using P2P (based on TCP protocol, v4 supports NAT1-3 penetration)<br>
* **Cost Savings Priority**: No need to buy VPS, no need for a public IP; old Android phones at home can be used as servers<br>
* **Reliability Priority**: On-demand availability, can provide uninterrupted service 24/7, and unaffected by UDP protocol QoS issues<br>
* **Control Emphasis**: Client configuration is straightforward, and service can be controlled to start/stop anytime, anywhere<br>
* **Environmental Friendliness**: No installation required, compact size (around 1MB for the mini version), all-in-one, high performance with minimal resource usage<br>
* **Portability Priority**: Whether working or on vacation, everything is in control as long as the phone has a network connection<br>
* ... If this is what you want! Please continue reading patiently; if you have additional requirements, please raise an issue, and there's also interesting stuff in the [Update History].

* **Free**, considering open source after stable testing.
* Includes an Android client and a server that needs to be installed in the intranet.

# APP Configuration (Required) --- Typical usage may be affected if not configured properly
* Must configure "Allow Background Running" permission, otherwise, the connection will be severed by the system when switching to the background.
* Must configure "Keep Network Connection Always Active during Sleep," otherwise, the connection will be severed by the system once in sleep mode.
* "Allow Auto-Start" permission can be configured, otherwise, Android server mode cannot start on boot (v0.30 and later versions).
* "Microphone" permission can be configured, otherwise, the Android server cannot provide voice monitoring functionality (v0.30 and later versions).
* Note: SG official proxy does not provide data forwarding to IPs in Hong Kong, Macau, Taiwan, and foreign countries.

## What is smarGate?
#### Officially named "Mobile Gateway," it exposes the server network located in the intranet on demand through the mobile client. The core engine is implemented in C++.
#### "Mobile Gateway" is a user's private gateway, and all shared access entry points are in the client, not like other penetration tools that promote public access entry points based on domain names. In other words, smarGate is like carrying a personal theft-proof door, while other penetration products place the theft-proof door in public places... Although they need a key, there's a profession called a locksmith.

##### It has the following technical features:
* **Security**
  * The mobile client serves as the main access entry, opened on demand and closed promptly.
  * Supports port mapping networking between servers (v0.31 and later versions).
  * Computers can connect to the internal network through access to open ports on the phone in a hotspot or Wi-Fi environment (the client will display the phone's IP).
  * The phone network is generally in a private network segment that others cannot access.
  * User isolation.
* **Scalability**
  * Based on intranet segment proxy, it can work with numerous tools to achieve various network service capabilities (telnet, ssh, http services, intranet cameras, remote desktop, etc.).
  * Geared towards geeks, can access custom intranet services (RPC).
* **Convenience**
  * Simple configuration with the mobile client.
  * Dynamic addition and removal of service capabilities.
* **High Performance**
  * Starting from version 0.1.1, it uses a proprietary network engine with high performance. The client on a thousand-dollar phone can support over 1,000 concurrent shared accesses.
  * High-performance design:
    * Cross-platform implementation of socket multiplexing, supporting models such as poll, epoll, kqueue, port, select, IOCP, etc.
    * Uses lock-free algorithms.
    * Thread pool design.
    * Socket connection pool.
    * Multi-level task queue.
    * ...

<details>
<summary>
  <mark><font size=6 color=darkred>Attachment: Interaction Diagram</font></mark>
</summary>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/smarGateArch.png" /><br>
</details>

## What are the main functions of smarGate?
* **Supports Proxy Penetration**
  * The official provides a free proxy server (shared bandwidth, slower when shared by multiple users, best practice is to use a self-owned proxy server).
  * <I>If you have your own cloud server (with a public IP), you can customize your proxy server, and install proxy_server on the proxy server. All data transmission goes through the user-configured proxy server (the proxy server needs a certificate, which can be generated automatically or configured with an existing certificate).</I>

```
1、Configuration of the "Proxy Server" is as follows (the proxy server must allow any port "inbound" connections):
```
```
<?xml version="1.0" encoding="GBK"?>
<app-config code="PROXY" name="proxy-server">
    <app-parameter>
        <proxy-service-port value="9001"/><!--Custom proxy port-->
        <owner-id value="xxxx" /><!-- xxxx is the user ID returned after successful registration -->
        <access-token value="nnnnn"/><!--Access token, must be a number [optional] -->
        <ssl-create-certfile value="true" /><!-- If the following options are not used to specify the certificate, it will be generated automatically [Must ensure that openssl is installed], default is false meaning no need to generate -->
        <!-- If you have a certificate and private key, configure the following items. Start a secure SSL channel. The file names need to be configured correctly. If there is no certificate, no need to configure. Enable the above option to generate the certificate automatically.
        <ssl-cacert-file value="xxx.crt"/>
        <ssl-privatekey-file value="xxx.key"/>
        -->
    </app-parameter>
    <module-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
    </module-parameter>
</app-config>
```
```
2. Add the following configuration to the "Server":
```
```
......
<app-parameter>
    <ssl-create-certfile value="true" />
    <!-- If the proxy server starts a secure SSL channel, you must configure the certificate and private key here.
    <ssl-cacert-file value="xxx.crt"/>
    <ssl-privatekey-file value="xxx.key"/>
    -->
</app-parameter>
<module-parameter>
  ......
</module-parameter>
<!-- Configure the IP or domain name + port of the proxy server mentioned above. Note: the IP must be a public IP. The ssl option must be configured correctly. If the proxy server has a certificate (including automatically generated certificates) and is effective, configure it as true, otherwise, it is false -->
<channel address="xxx.xxx.xxx.xxx:9001" ssl="true" token="nnnnn" /><!--Access token, must match the proxy server, if not, no need to configure -->
```
* **Supports P2P Channel**
  * Utilizes TCP protocol for P2P penetration, enhancing security.
  * Not all networks support P2P, depending on the NAT types on both ends.
  * From version v0.14 and above, directly supports IPv6 and provides firewall penetration.
  * P2P Test Conclusion: Unable to establish a connection when one end is NAT4 and the other end is NAT3 or NAT4.
Note: NAT1-〉Full Cone, NAT2-〉Restricted Cone, NAT3-〉Port Restricted Cone, NAT4-〉Symmetric

  <table>
    <th>Server NAT</th><th>Client NAT</th><th>P2P Success</th>
    <tr><td>NAT1-3</td><td>NAT1-3</td><td>YES</td></tr>
    <tr><td>NAT1-2</td><td>NAT4</td><td>YES</td></tr>
    <tr><td>NAT4</td><td>NAT1-2</td><td>YES</td></tr>
    <tr><td>NAT4</td><td>NAT3-4</td><td>NO</td></tr>
    <tr><td>NAT3-4</td><td>NAT4</td><td>NO</td></tr>
  </table>

* **Supports External Network Publishing (Contrary to Security Design Principles, Opened in v0.31)**
  * The main mode of other intranet penetration tools, directly mapping internal network services to external network ports.
* **Supports P2P Port Mapping Between Servers (v0.31 and Later Versions)**
  * Specific configuration mainly supported through ip@index.
  * 
<details>
<summary>
  <mark><font size=6 color=darkred>Attachment: Brief Overview of Main Functions</font></mark>
</summary>
  
1. Supports TCP-based P2P connection tunnels
   - Secure and reliable, avoiding QoS issues
  
2. Supports all types of protocols based on TCP for "transparent proxy"
   - Can proxy all internal TCP services (SSH, RDP, SMB, VNC, cameras, database services, etc.)
     
3. Supports HTTP, HTTPS to HTTP
   - Supports HTTP-head rewrite, can proxy HTTPS services as HTTP
     
4. Supports UDP over TCP
   - Can proxy services using the UDP protocol
     
5. Transparent mode (no need to focus on IPv6 addresses) supports IPv6 tunnel
   - Automatically establishes a v6 tunnel, always using v4 address for access
6. Supports custom proxy (requires public IP), taking over all data forwarding
   - When P2P is not possible, automatically connects to a custom proxy for data forwarding
7. Custom proxy supports token and whitelist configuration
   - Supports security mechanisms
8. Supports multi-level cascading proxy
   - Supports chained proxies, supports multi-level acyclic proxies
9. Supports mobile phones as the only access point — Secure + Mobile Convenience
   - With the phone in hand, access is available on demand
10. Dynamic configuration for port mapping, supports "hot-plugging" of mapping configurations
    - Proxies are effective immediately when added or removed, no need to restart
11. All features are "one-point configuration" on the app side
    - Client configuration is a single point, no need for server configuration during runtime
12. Supports automatic detection and connection of P2P tunnels and custom proxy tunnels
    - No intervention required, the app automatically connects and retries
13. Supports dynamic negotiation of ports, supports specifying negotiated ports
    - Default dynamic port negotiation, supports negotiating ports in conjunction with firewall configurations
14. Supports tunnel connection priority (P2P -> Custom Proxy -> Official Proxy)
    - During data transmission, supports priority for tunnels
15. Supports SSL encrypted tunnel
    - Supports SSL encryption for both P2P and proxy tunnels, ensuring data transmission is secure
16. Supports traffic limitation
    - Supports network bandwidth limitation, default is unlimited
17. Supports network switching (e.g., mobile <-> Wi-Fi) automatic identification + automatic connection
    - Intelligent reconnection on the app side, ensuring service availability at all times
18. Supports port mapping between different LAN hosts — If one end host has a public IP, it can be accessed directly from the external network (version > v0.31)
    - Supports server-side networking mapping, traffic does not need to pass through the mobile app (traditional penetration mode)
19. App supports server mode, can configure the phone as a server
    - Android phones can be used as servers
20. Supports remote file management functionality: browsing, uploading, downloading, deleting, supports resuming downloads (version >= v0.31.6)
    - Activates file management functionality when there is P2P or custom proxy, basic operations on files on the phone and server-side computer are possible
21. Supports built-in SOCKS5, HTTP proxies (version >= v0.32.1)
    - Since there are third-party specialized tools such as ss5, squid, etc., SOCKS5 and HTTP proxies are optional features
22. SOCKS5, HTTP proxies support domain and IP whitelists (version >= v0.32.1)
    - Domain whitelist supports four matching modes (exact match, forward match, backward match, middle match), default configuration file name: .white_list
    - IP whitelist supports CIDR format ip-range configuration, default configuration file name: .ipchecks
      
... To be continued

</details>
  
## User Guide:

### 1. Download the App and Register a New User
* Download the Android app (app-release.apk includes both the client and server) supporting armv7 and arm64 CPU architectures.
* Register a new user (Invitation code is required and can be any number. Note: If the required information is not filled in completely or contains Chinese characters, registration will fail).
* After successful registration, remember to note the returned service ID (N). [Important]: After successful registration, be sure to complete the first login within 1 hour.

<details>
<summary>
  <mark><font size=5 color=darkred>Expand for Illustrations</font></mark>
</summary>

![Login](https://github.com/lazy-luo/smarGate/blob/master/res/login.png)
![Register](https://github.com/lazy-luo/smarGate/blob/master/res/register.png)
![Register Success](https://github.com/lazy-luo/smarGate/blob/master/res/registerok.png)
</details>

### 2. Download Server and Configure

* Download the server version suitable for the intranet server (currently supports linux-x86-32/64, windows, and linux-arm [Raspberry Pi, Synology], also: Android app comes with server mode).
* Unzip the server compression package and modify the configuration file (conf-proxy.xml):

<details>
<summary>
  <mark><font size=5 color=darkred>Configuration Example</font></mark>
</summary>

```xml
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
       <app-parameter>
	<!-- [ none | first | only ] , none is the default. Enable SSL encryption for P2P connections, only means only accept encrypted connections -->
	<ssl-tunnel-required value="first" />
	<!-- If not specifying a certificate with the following options, it will generate a certificate [must ensure openssl is installed], default is false means no need to generate -->
	<ssl-create-certfile value="true" /> 
 <!-- The following options are only applicable to the mini version under dynamic, specify the actual files of the ssl library and crypto library, on Linux, you can obtain them with: ldd $(which openssl)|grep -E "libssl|libcrypto"|awk '{print $1}' -->
	<libssl value="libssl.so" />
	<libcrypto value="libcrypto.so" />
       </app-parameter>
       <moudle-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
        <app-name value="xxxxx [name of service points]." /><!-- need to modify -->
        <app-description value="yyyyy [description of service points]" /><!-- need to modify -->
	<!-- user-audit needs to be modified (N is the service ID returned after successful registration, index is the custom server instance number, it is recommended to start from 1, cannot be repeated. For example: [12345:1]) -->
        <user-audit value="N:index"/>
    </moudle-parameter>
  </app-config>
```
</details>

### 3. Run the Intranet Server (Command Parameters Explanation i: Max incoming connections, o: Max outgoing connections, w: Max threads)
* Execute the command on Linux: `chmod +x proxy_server && nohup ./proxy_server -i1000 -o1000 -w8 >/dev/null &`
* Execute the command on Windows: `proxy_server.exe -i1000 -o1000 -w8`
* Android Phone/Device: Run the app -> In edit mode, configure server information -> Turn on the "Server" switch -> Restart the app
* For OpenWrt MIPS devices installation, see: [【Correct Usage on MIPS Linux】](https://github.com/lazy-luo/smarGate/issues/65)

### 4. Log in to the mobile app and configure port mapping
* In the client, you can see the online server ("access point") and define port mapping rules on the client.

<details>
<summary>
  <mark><font size=5 color=darkred>Expand for Illustrations</font></mark>
</summary>

![Operational](https://github.com/lazy-luo/smarGate/blob/master/res/oper2.png)
<b>In the configuration, the "Remote IP" corresponds to the IP of a host in the intranet ("access point"). "localhost" or "127.0.0.1" represents the machine where the internal server-side is located.</b>
![Operational](https://github.com/lazy-luo/smarGate/blob/master/res/oper3.png)

</details>

### 5. Computers or phones can directly access the services set in the mobile client (such as SSH, HTTP, etc.)

## Additional Information:
* All versions come with packaged dependencies and are ready to use.
* The system will automatically clear "zombie accounts" that have not been used for more than 30 days.
* Android client requires permissions:
    1. Background execution permission (if not allowed, the connection will be disconnected when the app goes to the background).
    2. Network access permission (basic permission).
* Phone settings (Android):
    1. Settings -> Wireless & networks -> WLAN -> Keep Wi-Fi on during sleep "Allow" (otherwise, the connection will be disconnected during system sleep).
    2. Settings -> Wireless & networks -> Mobile network -> Advanced -> Keep mobile data always active "Allow".
    
* Q: How to download and install the Android app?
  >> A: Open the link [https://github.com/lazy-luo/smarGate/raw/master/app-release.apk](https://github.com/lazy-luo/smarGate/raw/master/app-release.apk) in the browser of your Android phone, and then install it when prompted.
  >> B: Pan.baidu.com download link for the latest test version: [https://pan.baidu.com/s/14Iq60kxHW711NVoCVKWySg](https://pan.baidu.com/s/14Iq60kxHW711NVoCVKWySg)
  >> C: Gitee address (faster download speed, no issues with image display): [https://gitee.com/lazy-luo/smarGate](https://gitee.com/lazy-luo/smarGate)
  >> D: If needed, add WeChat: ws_lzy008, specifying "smarGate". Depending on the situation, a technical discussion group may be formed.
* Q: Do I need to install the server on every device at home to access multiple devices on the local network?
  >> A: No, you only need to install the server on any one device.
* Q: Why sometimes unable to connect?
  >> A: The server will automatically disconnect after about 2-3 minutes of idle time and will reconnect after waiting for about 10 seconds.
* Q: Why can't I establish a P2P connection over IPv6?
  >> A: Please update both the client and server to the latest version; make sure your phone and the internal computer can obtain a global IPv6 address; ensure it is not blocked by the firewall (Windows); check if both IPv6 can be routed out; and check the hosts file to ensure the hostname resolves to the IPv6 address.
* Q: Why does P2P connection over IPv4 and IPv6 not have UDP ports?
  >> A: smarGate uses TCP protocol for P2P penetration, which provides better security and connection reliability.
* Q: Why can't the phone NAS client log in?
  >> A: Make sure the phone NAS client's IP is not blacklisted, and it does not include "localhost" (127.0.0.1).
* Q: How to share machines in a remote company network with multiple teams in different locations?
  >> A: Connect the phone to Wi-Fi, let team members' computers connect to the phone's IP: PORT, and access directly through the phone's proxy. Tested on phones with 2k resolution or higher, it can support sharing access for up to a hundred people.
* Q: Why doesn't the Windows server have a console window?
  >> A: To prevent accidental shutdown of the server, the new version of the Windows server runs in the background. If you need to close it, use "Task Manager".
* Q: Do I still need to go through an intermediate proxy when using P2P?
  >> A: No, connect directly point-to-point, and the network speed depends on the networks of your client and server.
* Q: Does smarGate consume a lot of power when running in the background?
  >> A: After long-term testing, for occasional use, the power consumption is similar to any system process, extremely low. In the case of frequent background use, the overall power consumption is equivalent to occasional use of WeChat. The power management prompt "Frequent background refresh..." can be ignored; it appears whenever there is background data transfer, and the key is to look at the power consumption ranking.
* Q: What are the connection priority rules in smarGate?
  >> A: Prefer P2P connection. If there is no P2P, use a custom proxy connection. If neither of the previous two connects, use the official proxy connection.
* Q: Can the same user log in from multiple locations?
  >> A: Multiple logins are allowed, but only one client can perform P2P at a time. Each server machine can only run one instance, and the configuration of each instance ensures that the serial number is not duplicated, otherwise it will not work properly.
* Q: Can the server support Android phones?
  >> A: The Android app version 0.27 has added support for "server mode".
* Q: What does the different color represent in the client?
  >> A: P2P identification under IPv4:
    ![IPv4 P2P](https://github.com/lazy-luo/smarGate/blob/master/res/ipv4p2p.png)
  >> A: P2P identification under IPv6:
    ![IPv6 P2P](https://github.com/lazy-luo/smarGate/blob/master/res/ipv6p2p.png)
  >> A: User-defined proxy identification:
    ![User-defined proxy P2P](https://github.com/lazy-luo/smarGate/blob/master/res/userdefineproxyer.png)

## Best Practices
* The following are recommended best practices for reference:
  1. Set the Android client to "Auto Login" to avoid the hassle of entering the username/password each time.
  2. Let the Android client run in the background after setting it up. If it remains in the foreground, it will refresh regularly, consuming power due to the WebView component.
  3. Keep the server running in the background at all times for security and peace of mind. Only you can access it.


## Disclaimer
* Please read the following disclaimer carefully. Your use of the smarGate tool software indicates your acceptance of the following:
  1. It is strictly forbidden to use this software for computer hacking and any other activities that may harm computer information network security.
  2. This software is a regular network access tool. Please use it reasonably and legally. Do not use it for activities that violate laws, morals, and affect the interests of others. If used for illegal purposes, the user is responsible for any consequences, and the developer of this software assumes no responsibility or loss.

## Donation
If you find smarGate helpful, feel free to make a donation to support the long-term development of the project!
Note: It is recommended to include your registered username with the donation.

<details>
<summary>
	<mark><font size=5 color=darkred>WeChat Donation</font></mark>
</summary>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/donation.png"/>
</details>

## Appendix
<details>
<summary>
	<mark><font size=5 color=darkred>Update History</font></mark>
</summary>
  
### 2023-11-28:<br>
1. Safety protection for the elderly and children, supports GPS positioning for easy tracking of the latitude and longitude of the care recipient (manual authorization required).<br>
   * This feature is only supported on the Android server.<br>
   * If the coordinates are successfully obtained, the latitude and longitude will be automatically copied to the clipboard.<br>

2. Other optimizations<br>

### Update to v0.32.2 on 2023-11-17:<br>
1. Support for username/password authentication in the SOCKS protocol.<br>
2. Support for saving and playing recordings (VIP).<br>
3. Version updated to v0.32.2.<br>

### Update to v0.32.1 on 2023-10-25:<br>
1. Bug fixes<br>
2. Improved support for SOCKS protocol (IPv4 TCP only).<br>
3. Improved support for HTTP proxy protocol.<br>
4. App supports VIP function license.<br>
5. Version updated to v0.32.1.<br>

### Update to v0.31.12 on 2023-09-08:<br>
1. Bug fixes<br>
2. Experimental support for SOCKS protocol (IPv4 TCP only).<br>
3. Added built-in support for HTTP proxy protocol.<br>
4. Memory recycling (for devices with memory limitations).<br>
5. Improved response speed with full asynchronous mode.<br>
6. Version updated to v0.31.12.<br>

### Update to v0.31.11 on 2023-08-29:<br>
1. File management supports default sorting by time.<br>
2. Added support for macOS M1/M2.<br>
3. Version updated to v0.31.11.<br>

### Update to v0.31.10 on 2023-06-03:<br>
1. Network reliability optimization.<br>
2. Improved network transmission efficiency.<br>
3. Version updated to v0.31.10.<br>

### Update to v0.31.9 on 2023-03-04:<br>
1. App server mode adds "Accessibility" service, user manually opens it for automatic restart.<br>
2. App-side operation optimization: Added automatic fill-in feature for click operations, making it easier to add configurations.<br>
3. Fixed the BUG that custom proxy installation on MIPS routers could not provide services.<br>
4. Provided server-side custom proxy domain timed IP refresh function (dynamic domain).<br>
5. Other optimizations.<br>

### Update to v0.31.8 on 2022-12-14:<br>
1. App server mode supports configuring custom proxies and SSL encryption.<br>
2. Custom proxy server supports SSL self-signed certificate distribution.<br>
3. Other optimizations.<br>

### Update to v0.31.7 on 2022-11-04:<br>
1. Provided one-click version upgrade function, no manual update required.<br>
   * This feature's version source points to GitHub. If unable to update, please confirm GitHub connectivity.<br>
   * Generally, usability is restored in about 10-20 seconds after the update.<br>
   * The server provides an automatic update option (checks once a day), which is off by default.<br>
   ```xml
   <auto-update value="true" />
   ```
### Update to v0.31.6 on 2022-10-20:<br>
1. File management adds file deletion functionality.<br>
2. File management adds breakpoint resume functionality.<br>
3. File management adds file timestamp.<br>
4. File management on Windows adds disk switching operation.<br>
   * This feature is only activated when there is P2P or custom proxy connection.<br>
   * Upload and download through drag-and-drop mode.<br>
   * Confirmation box for file deletion pops up with a double click.<br>

### Update to v0.31.5 on 2022-10-14:<br>
1. Fixed the bug where custom proxy couldn't connect under short interval reconnection.<br>
2. Added simple file upload and download functionality for easy synchronization of documents in different locations.<br>
   * This feature is only activated when there is P2P or custom proxy connection.<br>
   * Upload and download through drag-and-drop mode.<br>
3. Version updated to v0.31.5.<br>

### Update on 2022-09-05:<br>
1. Resolved the bug of abnormal disconnection in custom proxy connection.<br>
2. Version remains unchanged.<br>

### Update to v0.31.4 on 2022-08-30:<br>
1. Reduced virtual memory usage during runtime.<br>
2. Routine optimizations.<br>
3. Version updated to v0.31.4.<br>

### Update to v0.31.3 on 2022-08-14:<br>
1. Fixed the bug where MIPS architecture systems couldn't connect to custom proxies.<br>
2. Fixed the issue of long loading time for HTTP protocol.<br>
3. Version updated to v0.31.3.<br>

### Update to v0.31.2 on 2022-08-06:<br>
1. Fixed occasional crashes on the Windows platform, enhanced stability.<br>
2. Keep-alive operations for P2P connection and custom proxy to minimize reconnection time window, improving availability.<br>
3. Other usability optimizations, reduced app consumption.<br>
4. Version updated to v0.31.2.<br>

### Update to v0.31.1 on 2022-07-28:<br>
1. Fixed the bug where, under specific circumstances, network configurations did not take effect when the server restarted.<br>
2. Fixed NAT1 server P2P negotiation bug.<br>
3. Version updated to v0.31.1.<br>

### Update to v0.31 on 2022-07-22:<br>
1. Provided port mapping between servers, allowing direct access from the public network if the server has a public IP (only needs to be configured on the app).
   * Configuration: In the original mapping configuration, "Remote IP" supports configuration in the form of ip@idx (idx is the sequence number of different "access points").
   * The "Local Port" configured in this way is actually on the host where the current "access point" is located (Note: not on the phone where the app is located).
   * If P2P between servers is successful (or custom proxy connection is successful), the configured mapping will take effect, otherwise, it will not.
   * On the app, the proxy status between servers is refreshed only when there is a P2P connection.
   * After successful configuration, it takes about 10 seconds to see the actual status on the app.
2. Version upgraded to v0.31.<br>

### Update on 2022-06-30:<br>
1. Fixed the bug where the server could not proxy normally on 32-bit big-endian machines.<br>
2. Version remains unchanged.<br>

### Update on 2022-05-17:<br>
1. Server supports automatically generating self-signed certificates (default file name is server.xxx).
   * Configuration: ssl-create-certfile option<br>
     ```
     <app-parameter>	
       <ssl-create-certfile value="true" />
     ...
     </app-parameter>
     ```
   * Make sure to install openssl.
   * Do not specify certificate files (do not configure ssl-cacert-file and ssl-privatekey-file).
   
### Update on 2022-05-04:<br>
1. Support for riscv32/64 architecture, linked with musl library during compilation like mips architecture.<br>
2. Optimized network transmission layer.<br>
3. Version remains unchanged.<br>

### Update to v0.30.4 on 2022-02-07: <br>
1. Provided support for mips64el.<br>
2. Added system icon display on the app.<br>
3. Other optimizations.<br>

### Update to v0.30.3 on 2021-11-06: <br>
1. Fixed the bug where app-side memory usage only displayed JVM without native.<br>
2. Optimized network engine, improving stability and fairness under high concurrency.<br>

### Update to v0.30.2 on 2021-10-17: <br>
1. Custom proxy supports SSL verification.<br>
2. In the case of P2P network, supports configuring SSL tunnel ( **requires server-side certificate configuration** )<br>
```
<app-parameter>
     <ssl-tunnel-required value="first" /><!-- Options: none, first, only -->
     ...
   </app-parameter>
   ```
3. Other optimizations.<br>
  
### Update to v0.30 on 2021-09-24: <br>
1. Provided Android server-side automatic startup support (only in server mode, and manual authorization is required).<br>
2. In the case of P2P network, Android server-side supports real-time audio (microphone permission needs manual authorization, must open the SG interface to record).<br>
3. Other optimizations.<br>

### Update to v0.29.2 on 2021-05-03: <br>
1. Fixed the issue of not being able to exit on high versions of Android.<br>
2. Optimized network: Fixed a BUG that may cause network latency, further improving network transmission speed.<br>
3. Provided version number display for easier client and server version management.<br>
4. Optimized app CPU usage, reduced power consumption.<br>

### Update to v0.29 on 2021-03-05: <br>
1. Fixed the issue of server-side core dump when switching between IPv6 and IPv4 networks.<br>
2. Added IPv4-only network mode option on the client side, for scenarios where IPv6 is present but IPv4 is needed for P2P connections due to special requirements (forces the use of IPv4 for network penetration).<br>
3. Some other bug fixes.<br>
   Note: Due to fatal issues with core dump in specific scenarios, both the client and server need to be updated to version 0.29.

### Update to v0.28 on 2020-12-13: <br>
1. Custom proxy added token support to prevent unauthorized access. Also supports configuring an access permission list (access-token can only input numbers, access-restricting can input allowed SIDs, multiple SIDs separated by ":"; access-restricting can be left unconfigured).<br>
   A. Proxy server configuration:
   ```
   <app-parameter>
    <proxy-service-port value="9001"/>
    <access-token value="nnnnn"/>
    <access-restricting value="xxxxx"/>
    …
   </app-parameter>
   ```
  B、Server-side configuration (token must match the proxy server):
 ```
 <channel address="x.x.x.x:9001" ssl="true" token="nnnnn" />
```
2.Optimized the tunnel timeout disconnect mechanism (only for P2P tunnels and user agent tunnels): As long as there is a connection and the connection is normal, the client will randomly delay sending heartbeats to prevent timeout disconnections.<br>
Scenario: When accessing SSH, if there is no input for a long time, it will maintain a heartbeat to prevent disconnection after 1 or 2 minutes of inactivity.<br>
### Update to v0.27 on 2020-05-23: <br>
1. Removed the root permission acquisition feature to maintain the minimum permission requirement. Currently not developing support for configuring ports below 1024.<br>
2. Due to personal Raspberry Pi being damaged by a child, making use of the remaining value of old smartphones, Android app added "Server Mode" support, enabling it to be used as a server at home.<br>

### Update to v0.26 on 2020-04-30: <br>
1. Fixed the issue where configured HTTP services might be unavailable when IP is switched.<br>
~~2. For rooted phones, attempted to acquire root permissions, supporting the configuration of reserved ports below 1024.~~ (This feature has been removed.)<br>
3. Solved the problem of absolute path execution (mostly for startup scripts) and not specifying the -f parameter causing the inability to locate the default configuration file.<br>
4. Server-side added HTTP-based content replacement option (affects efficiency, ignores compressed data). For some non-standard intranet web applications that return IP ports in JavaScript to the browser, content filtering is not applied by default.<br>
```
	……
	<moudle-parameter>
		<http-content-type-filter value="application/javascript" />
		……
	<moudle-parameter/>
	……
```
5. Server-side added an option to specify the P2P negotiation port, with the default being a random port.<br>
```
	……
	<moudle-parameter>
		<negotiation-port value="xxxxx" />
		……
	<moudle-parameter/>
	……
```

6. Added an "Official Proxy" switch, defaulting to open. When closed, data will not be forwarded through the official proxy under any circumstances.<br>
### 2020-03-13：<br>
1. Fixed a bug causing network latency due to the loss of writable-event under specific conditions with tcp-cork.<br>
2. Improved the performance of the memory pool.<br>
3. Added the `-f` command line parameter to specify the full path of the configuration file.<br>
4. Other optimizations, version remains unchanged.<br>

### 2020-01-18 updated to v0.25：<br>
1. Fixed the issue of HTTP proxy failure.<br>
2. The app now provides IPv6 address display.<br>
3. Version updated to 0.25.<br>

### 2019-11-30 updated to v0.24：<br>
1. Peanut shell supports UDP now? Okay, support UDP port forwarding, friends who stream games can give it a try.<br>
2. Support UDP over TCP mode.<br>
3. Other minor optimizations.<br>

### 2019-11-03：<br>
1. Fixed memory leak bug.<br>
2. Other minor optimizations, version remains unchanged.<br>
3. Improved P2P reconnection reliability.<br>

### 2019-09-30 updated to v0.23：<br>
1. Fixed high CPU usage bug under weak network conditions on Windows server.<br>
2. Overall improved network transmission speed.<br>

### 2019-09-20 updated to v0.22：<br>
1. Improved P2P detection reliability.<br>
2. Fixed a bug on Windows that prevented P2P connection under certain conditions.<br>
3. The client now provides manual P2P reconnection feature (automatic reconnection may fail under weak network conditions, in such cases, manual reconnection can be used).<br>

### 2019-09-15：<br>
1. Further reduced server CPU usage under low-speed conditions.<br>
2. General optimizations, version remains unchanged.<br>

### 2019-09-10 updated to v0.21：<br>
1. Network performance optimization.<br>
2. The client now supports displaying real-time network speed.<br>

### 2019-09-05：<br>
1. Fixed the bug of automatic login failure after changing the password on the client.<br>
2. Provided automatic login timeout control.<br>

### 2019-09-01 updated to v0.20：<br>
1. Optimized connection checking performance (provided parallel asynchronous detection).<br>
2. Supports proxying HTTPS to HTTP (client-side HTTP access, server-side HTTPS).<br>

### 2019-08-18 updated to v0.19：<br>
1. Performance optimization.<br>
2. Fixed a bug where server connections could not be reliably disconnected under certain conditions (custom routing).<br>
3. Static compilation, no longer dependent on the gcc dynamic library of the inux system, can run directly in alpine (requires creating a symbolic link).<br>
4. Supports compiling as a mini version, no longer statically compiling OpenSSL; fully compatible with OpenSSL library from 0.9.8 to 1.1.1, binary package reduced to about 1M (already placed in the dynamic directory, SSL library needs to be configured).<br>

### 2019-05-27 updated to v0.18：<br>
1. Performance optimization.<br>
2. Provided IPv6 P2P switch mechanism: `<ipv4-tunnel-first value="false"/>` Set to "true" to close IPv6 P2P, the default value is "false".<br>
3. Added client IPv6 flag and connection status display.<br>

### 2019-05-21：<br>
1. Fixed the bug that IPv6 could not be detected under Raspbian jessie.<br>

### 2019-05-16 updated to v0.17：<br>
1. Performance optimization.<br>
2. Provided P2P disconnect and reconnect mechanism.<br>

### 2019-05-04：<br>
1. Fixed a bug where the server occasionally had high CPU usage when mounting private routes with a thread count < 4, version remains unchanged.<br>

### 2019-04-23 updated to v0.16：<br>
1. Fixed a bug where the server occasionally core dumped when mounting private routes.<br>

### 2019-04-16 updated to v0.15：<br>
1. Fixed the bug of IPV4/IPV6 network switching, unable to P2P.<br>

### 2019-04-15 updated to v0.14：<br>
1. Fixed the issue of network switching reconnection failure.<br>
2. Engine performance optimization.<br>
3. Added support for IPv6 firewall penetration (mobile end supports IPv6, and the internal network server supports IPv6).<br>
   [Important Note] Version 0.14 is incompatible with previous versions, be sure to update!<br>

### ....Initial version v0.13<br>

</details>
