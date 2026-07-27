## What is SG?

* A cross-network-segment remote port mapping tool
  * Supports intranet-to-intranet and intranet-to-extranet mapping
* A portable, flexibly-controlled access gateway
  * All configuration is done on the app client — full visibility, highly secure and controllable
  * Access entries can be configured on the mobile phone running the app, or on any SG server computer
* A simple remote file management tool
  * Perform file management operations on both the mobile device and server endpoints
* A simple SOCKS proxy tool
* A simple HTTP(S) proxy tool
* ......

## Key Features

* All mappings are configured through the app client; the server requires zero configuration at runtime
* Supports server-to-app and server-to-server port mapping
  * Map any port of any machine on the server's LAN to the app's mobile phone, enabling penetration access via the phone's local port
  * Through app client configuration, map any host/port on Server A's LAN to Server B's host
* Supports chained proxy
* Supports multi-user isolation
* Supports IPv4/IPv6 with TCP-based P2P tunneling
* Supports self-hosted proxy for data forwarding
* Supports encrypted data tunnels (TLS)
* Supports automatic tunnel selection
  * Priority: P2P → custom proxy → official proxy (fallback)
* Supports automatic version upgrades and one-click upgrade from the app client
* SOCKS and HTTP(S) proxy support custom IP whitelists and domain whitelists, including CIDR IP ranges and domain wildcards
* Supports both TCP and UDP protocols
  * UDP uses UDP-over-TCP mode
* ......

## What Problems Does SG Solve?

* Secure access to intranet resources regardless of network boundaries
* High-bandwidth secure data transfer via P2P
* Exposing intranet services when you have a public IP
* ......

## SG Version Guide   

  Android provides two build variants (Product Flavors), **Base** and **Advance**, sharing the same codebase and     
  differentiated through compile-time feature toggles + R8 dead code elimination:
                                                                                                                     
  | Feature | Base | Advance |                                                                                       
  |------|:----:|:-------:|
  | Proxy Tunnel | ✓ | ✓ |                                                                                           
  | File Management | ✓ | ✓ |                                                                                        
  | Audio Capture/Transmission | ✗ | ✓ |                                                                             
  | GPS Location Tracking | ✗ | ✓ |                                                                                  
  | App Upgrade | ✗ | ✓ |                                                                                            
  | Screen/Camera Monitoring | ✗ | ✗ |                                                                               
                                                                                                                     
  - **Base** — Lightweight edition. Retains only core proxy tunneling and file management, stripping out             
  high-permission/high-risk modules such as audio, location, upgrade, and monitoring. Smaller APK size with fewer    
  permissions, ideal for users who only need basic proxy and file access.                                            
  - **Advance** — Full-featured edition. Includes all feature modules except monitoring, supporting remote audio,
  location tracking, app upgrade, and other advanced capabilities. Suitable for users who require complete remote    
  management functionality.
    * Huawei phones may flag the Advance version as a "fraud app" by default. To install, first disable Pure Mode,   
  then enable Airplane Mode on the phone before installing. For similar issues on other phone brands, search for     
  solutions online.

## How to Use SG?

* Download the app and register
* Download the appropriate server version, configure it with your User ID, and run it
* Log into the app and configure port mapping rules
* Use the configured mappings to access your services

## Want to Dive Deeper?

<details>
<summary>
<mark><font size=3 color=darkred>View Details</font></mark>
</summary>

#
## Quick Overview <a href=https://github.com/lazy-luo/smarGate/wiki/快速上手手册>[Quick Start Guide]</a> <a href="https://www.bilibili.com/video/BV1LM411k7Rf">[Video Tutorial - Bilibili]</a><br>
* **Platform support**: Linux, Windows, macOS, Android (enterprise: HP-UX, Solaris, AIX)<br>
* **CPU architectures**: x86, ARM, MIPS, RISC-V, LoongArch64 (enterprise: Alpha, PowerPC, SPARC)<br>
* **Security-first**: "Intranet-to-intranet" tunneling — no ports exposed to the public internet, no firewall configuration changes<br>
* **Bandwidth-focused**: P2P access to intranet services with "4G phone + IPv6 broadband" (TCP-based, NAT1-3 traversal for IPv4)<br>
* **Cost-effective**: No VPS required, no public IP needed; repurpose old Android phones as servers<br>
* **Reliable**: Available on demand, supports 24/7 uninterrupted service, free from UDP QoS throttling<br>
* **Controllable**: Single-point configuration on the client, with the ability to start/stop services anytime, anywhere<br>
* **Lightweight**: No installation required, compact footprint (mini version ~1MB), all-in-one, high performance with minimal resource usage<br>
* **Portable**: Whether working or on vacation, as long as your phone has a network connection, everything is under control<br>
* ......If all this sounds like what you need, keep reading; if you want more, please submit an issue — the [Changelog] is worth checking out too<br>
* **Free**. Considering open-sourcing after stability testing.<br>
* Includes an Android client and a server component to be installed within the intranet.<br>

## App Configuration (Required) — Common Misconfiguration Issues
* **Must** grant "Allow background execution" permission, otherwise the system will disconnect when switching to background
* **Must** enable "Keep network connection during sleep", otherwise the system will disconnect when entering sleep mode
* **Recommended** to grant "Allow auto-start" permission, otherwise the Android server mode cannot auto-start on boot (v0.30+)
* **Recommended** to grant "Microphone" permission, otherwise the Android server cannot provide audio monitoring (v0.30+)
* **Note**: SG's official proxy does not forward data to IPs in Hong Kong, Macau, Taiwan, or overseas

## What is smarGate?<br>
#### Officially named "Mobile Gateway" — exposes intranet server networks on demand through a mobile client, with the core engine implemented in C++.<br>
#### The "Mobile Gateway" is a user-private gateway. All shared access entries reside on the client, unlike other tunneling tools that primarily promote domain-oriented public access entries. Analogy: smarGate is like carrying your security door with you; other tunneling products are like placing your security door in a public space — sure, it needs a key, but there's a profession called locksmithing...<br>

##### Technical Highlights:<br>
* **Security** <br>
  * The mobile client serves as the primary access gateway — open on demand, close promptly.<br>
  * Supports server-to-server port mapping networking (v0.31+).<br>
  * Computers can connect to the phone's hotspot or WiFi to access intranet services through ports exposed by the phone (the client displays the phone's IP).<br>
  * Mobile networks are generally private network segments inaccessible to others.<br>
  * User isolation.<br>
* **Extensibility**<br>
  * Based on intranet segment proxying, can work with numerous tools to enable various network services (Telnet, SSH, HTTP services, intranet cameras, remote desktop, etc.)<br>
  * Geek-oriented: can access custom intranet services (RPC)<br>
* **Convenience**<br>
  * Single-point configuration on the mobile client<br>
  * Dynamic addition/removal of service capabilities<br>
* **High Performance**<br>
  * Since v0.1.1, uses a self-developed network engine with high performance — a budget phone client can support 1,000+ concurrent shared accesses<br>
  * High-performance design:<br>
    * Cross-platform socket multiplexing supporting poll, epoll, kqueue, port, select, IOCP models<br>
    * Lock-free algorithms<br>
    * Thread pool design<br>
    * Socket connection pool<br>
    * Multi-level task queues<br>
    * ...<br>
<details>
<summary>
<mark><font size=6 color=darkred>Attachment: Architecture Diagram</font></mark>
</summary>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/smarGateArch.png" /><br>
</details>

## What Are the Main Features of smarGate?<br>
* **Proxy tunneling support**<br>
  * Official free proxy servers are provided (shared bandwidth, slower with multiple users — best practice is to set up your own proxy server)<br>
  * <I>If you have your own cloud server (with a public IP), you can configure a custom proxy server by installing proxy_server on it. All data will be forwarded through your configured proxy server (the proxy server requires certificates, which can be auto-generated or you can use existing ones).</I> <br>

```
  1. Proxy server configuration (the proxy server must allow inbound connections on any port):
```
```
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
        <app-parameter>
            <proxy-service-port value="9001"/><!-- Custom proxy port -->
            <owner-id value="xxxx" /><!-- xxxx is the User ID returned after successful registration -->
            <access-token value="nnnnn"/><!-- Access token, must be numeric [Optional] -->
            <ssl-create-certfile value="true" /><!-- If no certificate is specified below, auto-generate one [requires openssl installed]. Default is false (no auto-generation) -->
          <!-- If you have your own certificate and private key, configure them below to enable secure SSL channels. Filenames must be correct. If you don't have certificates, you can use the auto-generation option above.
            <ssl-cacert-file value="xxx.crt"/>
            <ssl-privatekey-file value="xxx.key"/>
          -->
       </app-parameter>
       <moudle-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
      </moudle-parameter>
  </app-config>
```
```
  2. Add the following configuration on the server side:
```
```
......
    <app-parameter>
             <ssl-create-certfile value="true" />
       <!-- If the proxy server has SSL enabled, certificates and private key must be configured here
         <ssl-cacert-file value="xxx.crt"/>
         <ssl-privatekey-file value="xxx.key"/>
       -->
    </app-parameter>
    <moudle-parameter>
      ......
    </moudle-parameter>
    <!-- Configure the proxy server IP or domain + port above. Note: the IP must be a public IP. The ssl option must be correctly configured — set to true if the proxy server has certificates (including auto-generated ones) and they are active, otherwise false -->
    <channel address="xxx.xxx.xxx.xxx:9001" ssl="true" token="nnnnn" /><!-- Access token, must match the proxy server; omit if not configured -->
```
* **P2P channel support**<br>
  * Uses TCP protocol for P2P tunneling, enhancing security<br>
  * Not all networks support P2P — depends on the NAT types at both ends
  * v0.14+ directly supports IPv6 with firewall traversal capability
  * P2P test conclusion: P2P fails when one end is NAT4 and the other is NAT3 or NAT4<br>
  Note: NAT1 → Full Cone, NAT2 → Restricted Cone, NAT3 → Port Restricted Cone, NAT4 → Symmetric<br>
  <table>
    <th>Server NAT</th><th>Client NAT</th><th>P2P Success</th>
    <tr><td>NAT1-3</td><td>NAT1-3</td><td>YES</td></tr>
    <tr><td>NAT1-2</td><td>NAT4</td><td>YES</td></tr>
    <tr><td>NAT4</td><td>NAT1-2</td><td>YES</td></tr>
    <tr><td>NAT4</td><td>NAT3-4</td><td>NO</td></tr>
    <tr><td>NAT3-4</td><td>NAT4</td><td>NO</td></tr>
  </table>

* **Public exposure support** (contrary to the security-first design philosophy, opened in v0.31)<br>
  * The primary mode promoted by other intranet tunneling tools — directly mapping intranet services to public-facing ports<br>
* **Server-to-server P2P port mapping** (v0.31+)<br>
  * Configuration primarily via the ip@index format<br>

<details>
<summary>
<mark><font size=6 color=darkred>Attachment: Key Feature Summary</font></mark>
</summary>

```
1. TCP-based P2P connection tunnels
  — Secure and reliable, avoids QoS throttling
2. Transparent proxying for all TCP-based protocols
  — Can proxy all intranet TCP services (SSH, RDP, SMB, VNC, cameras, databases, etc.)
3. HTTP and HTTPS-to-HTTP support
  — HTTP header rewriting, proxying HTTPS services as HTTP
4. UDP-over-TCP
  — Proxy support for UDP-based services
5. Transparent IPv6 tunneling (no need to manage IPv6 addresses)
  — Automatic IPv6 tunnel establishment, always use IPv4 addresses for access
6. Custom proxy support (requires a public IP) — handles all data forwarding
  — Automatically connects to the custom proxy when P2P is unavailable
7. Custom proxy supports token and whitelist configuration
  — Security mechanisms included
8. Multi-level cascading proxy
  — Chained proxy support, multi-level loop-free proxy
9. Mobile phone as the sole access gateway — security + mobile convenience
  — Phone in hand, access on demand
10. Fully dynamic port mapping configuration with hot-plug support
  — Proxy additions and deletions take effect immediately, no restart required
11. All features configurable from the app — single-point configuration
  — Client-side one-click configuration, server requires zero config at runtime
12. Automatic P2P tunnel and custom proxy tunnel detection and connection
  — No manual intervention; the app auto-connects and auto-retries
13. Dynamic and designated negotiation port support
  — Default dynamic port negotiation; supports designated negotiation ports for firewall configuration
14. Tunnel connection priority (P2P → Custom Proxy → Official Proxy)
  — Priority-based tunnel selection during data transfer
15. SSL-encrypted tunnels
  — SSL encryption for both P2P and proxy tunnels, ensuring data confidentiality
16. Traffic throttling support
  — Network bandwidth limiting, unlimited by default
17. Automatic network switch detection (e.g., Mobile ↔ WiFi) with auto-reconnection
  — Intelligent app-side reconnection, always ensuring service availability
18. Cross-LAN host port mapping — direct public access if one host has a public IP (v0.31+)
  — Server-to-server mesh mapping, traffic does not pass through the mobile app (traditional tunneling mode)
19. App supports server mode — can configure the phone as a server
  — Android phones can act as servers
20. Remote file management: browse, upload, download, delete, with resume support (v0.31.6+)
  — File management features activate when P2P or custom proxy connections are available; basic file operations on both phone and server
21. Built-in SOCKS5 and HTTP proxy (v0.32.1+)
  — Since professional third-party tools like SS5 and Squid exist, SOCKS5 and HTTP proxy are optional features
22. SOCKS5 and HTTP proxy support domain and IP whitelists (v0.32.1+)
  — Domain whitelist supports four match modes (exact, prefix, suffix, substring), default config file: .white_list
  — IP whitelist supports CIDR-format IP range configuration, default config file: .ipchecks
...to be continued

```
</details>

## Usage Guide:<br>
<a href="https://www.bilibili.com/video/BV1LM411k7Rf">Video Tutorial - Bilibili</a><br><br>
<a href="https://www.baidu.com/s?wd=smargate%20内网穿透">Usage Examples - Baidu</a><br><br>
<a href="https://www.google.com/search?q=smargate+内网穿透">Usage Examples - Google</a>

### 1. Download the App & Register a New User
* Download the Android app (app-release.apk includes both client and server) — supports armv7 and arm64 CPU architectures<br>
* Register a new user (invitation code is required, must be numeric, can be anything. Note: if required fields are incomplete or contain Chinese characters, registration will fail)<br>
* After successful registration, be sure to remember the returned Service ID (N). **[Important]**: You must complete your first login within 1 hour of registration<br>
<details>
<summary>
<mark><font size=5 color=darkred>Expand Screenshots</font></mark>
</summary>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/login.png" /><br>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/reg.png" /><br>
</details>

### 2. Download the Server & Configure
* Download the appropriate server version for your intranet environment (currently supporting Linux x86-32/64, Windows, and Linux-ARM [Raspberry Pi, Synology]; also: Android app has built-in server mode)<br>
* Extract the server archive and modify the configuration file (conf-proxy.xml):<br>
<details>
<summary>
<mark><font size=5 color=darkred>Configuration Example</font></mark>
</summary>

```
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
       <app-parameter>
    <!-- [ none | first | only ], none is default. Enable SSL encryption for P2P connections; "only" means only encrypted connections are accepted -->
    <ssl-tunnel-required value="first" />
    <!-- If no certificate is specified below, auto-generate one [requires openssl installed]. Default is false (no auto-generation) -->
    <ssl-create-certfile value="true" />
 <!-- The following options apply only to the mini version under dynamic. Specify the actual paths of the SSL and crypto libraries. On Linux, obtain via: ldd $(which openssl)|grep -E "libssl|libcrypto"|awk '{print $1}'
    <libssl value="libssl.so" />
    <libcrypto value="libcrypto.so" />
 -->
       </app-parameter>
       <moudle-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
        <app-name value="xxxxx [name of service points]." /><!-- need modify -->
        <app-description value="yyyyy [description of service points]" /><!-- need modify -->
    <!-- user-audit need modify (N is the Service ID returned after successful registration; index is a custom server instance number, recommended starting from 1, must not duplicate. e.g., [12345:1])-->
        <user-audit value="N:index"/>
    </moudle-parameter>
  </app-config>
```
</details>

### 3. Run the Intranet Server (command parameters: i = max inbound connections, o = max outbound connections, w = max threads)<br>
* **Linux**: `chmod +x proxy_server && nohup ./proxy_server -i1000 -o1000 -w8 >/dev/null &` <br>
* **Windows**: `proxy_server.exe -i1000 -o1000 -w8` <br>
* **Android phone/device**: Run the app → in edit mode, configure server info → toggle "Server" switch on → restart the app <br>
* **OpenWrt MIPS devices**: see <a href=https://github.com/lazy-luo/smarGate/issues/65>[Correct usage on MIPS Linux]</a><br>

### 4. Log into the Mobile App & Configure Port Mappings <a href="https://github.com/lazy-luo/smarGate/wiki/常用服务穿透配置">[Common Service Configurations]</a><br>
* In the client, you can see the online servers ("Access Points") and define port mapping rules on the client<br>
<details>
<summary>
<mark><font size=5 color=darkred>Expand Screenshots</font></mark>
</summary>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/proxy.png" /><br>
<b>For server-to-server port mapping, append the server index number to the IP in the format: ip@idx</b>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/server-proxy.png" /><br>
</details>

### 5. Computers or Phones Can Access Services Configured on the Mobile Client (e.g., SSH, HTTP, etc.)<br>

</details>

## Additional Notes:<br>
* All versions are self-contained with bundled dependencies — ready to use out of the box.<br>
* The system will automatically purge "zombie accounts" that have been unused for 30+ days.<br>
* Android client required permissions:<br>
>> 1. Background execution permission (the app will disconnect when backgrounded if not granted)<br>
>> 2. Network access permission (basic permission)<br>
* Phone settings (Android):<br>
>> 1. Settings → Wireless & Networks → WLAN → Keep connection during sleep → "Always" (otherwise the system will disconnect during sleep)<br>
>> 2. Settings → Wireless & Networks → Mobile Network → Advanced → Always keep data connection → "Enabled"<br>

<details>
<summary>
<mark><font size=5 color=darkred>FAQ</font></mark>
</summary>

* **Q: How to download and install the Android app?**<br>
  >> 1. Open https://github.com/lazy-luo/smarGate/raw/master/app-release.apk in an Android browser<br>
  >> 2. Download and install from the popup dialog<br>
  >> The GitHub release may lag slightly behind the latest test version.<br>
  >> Baidu Disk download link: https://pan.baidu.com/s/14Iq60kxHW711NVoCVKWySg <br>
  >> Gitee mirror (faster access, no image display issues): https://gitee.com/lazy-luo/smarGate <br>
  >> If needed, add WeChat: ws_lzy008 with the note "smarGate" — a technical discussion group may be formed based on interest.<br>
* **Q: To access multiple devices on the home LAN, does each device need the server installed?**<br>
   >> A: No. Just install the server on any one device.<br>
* **Q: Why does the connection sometimes fail?**<br>
   >> A: The server will automatically disconnect after 2-3 minutes of idle time. Wait about 10 seconds for automatic reconnection.<br>
* **Q: Why can't IPv6 P2P work?**<br>
   >> A: Update both client and server to the latest version; ensure both the phone and intranet computer can obtain a global IPv6 address; ensure the firewall is not blocking (Windows); verify that both IPv6 addresses are routable; check the hosts file to ensure hostnames resolve to IPv6 addresses.<br>
* **Q: Why are there no UDP ports for IPv4 and IPv6 P2P connections?**<br>
   >> A: smarGate uses TCP protocol for P2P tunneling, providing better security and connection reliability.<br>
* **Q: Why can't the mobile NAS client log in?**<br>
   >> A: Ensure that localhost (127.0.0.1) is not in the mobile NAS client's IP blacklist.<br>
* **Q: How to share a remote office's intranet machines with multiple teams?**<br>
   >> A: Connect the phone to WiFi and have team members' computers connect to the phone's IP:PORT, directly accessing through the phone proxy. In practice, a phone priced above 2,000 yuan can support sharing among approximately 100 team members.<br>
* **Q: Why is there no console window for the Windows server?**<br>
   >> A: To prevent accidental closure, the new version of the Windows server runs in the background. If you need to close it, use Task Manager.<br>
* **Q: Does P2P traffic still go through the intermediary proxy?**<br>
   >> A: No. It's a direct peer-to-peer connection. The speed depends on the networks where your client and server are located.<br>
* **Q: Is smarGate's background operation power-hungry?**<br>
   >> A: After extensive testing, for occasional usage, power consumption is extremely low — comparable to any system process. For frequent background usage, overall power consumption is similar to occasional WeChat usage. Power management warnings about "frequent background refresh..." can be ignored — any background data transfer triggers these alerts; the key metric is the power consumption ranking.<br>
* **Q: What are smarGate's connection priority rules?**<br>
   >> A: P2P connection is preferred. When P2P is unavailable, a custom proxy connection is used. When neither is available, the official proxy connection is used.<br>
* **Q: Can the same user log in from multiple locations?**<br>
   >> A: Yes, multi-point login is supported, but only one client can establish P2P connections at a time. Only one server instance can run on a single machine; ensure server instance indices do not duplicate, otherwise normal operation will be affected.<br>
* **Q: Can the server run on an Android phone?**<br>
   >> A: Starting from v0.27, the Android app has added "Server Mode" support.<br>
* **Q: What do the different colors on the client mean?**<br>
   >> A: IPv4 P2P indicator:<br>
   ![ipv4 p2p](https://github.com/lazy-luo/smarGate/blob/master/res/ipv4p2p.png)<br>
   >> A: IPv6 P2P indicator:<br>
   ![ipv6 p2p](https://github.com/lazy-luo/smarGate/blob/master/res/ipv6p2p.png)<br>
   >> A: Custom route indicator:<br>
   ![userdefineproxyer p2p](https://github.com/lazy-luo/smarGate/blob/master/res/userdefineproxyer.png)<br>

</details>

## Best Practices<br>
* Recommended best practices for reference:<br>
  1. Set the Android client to "Auto Login" to avoid the hassle of entering username/password each time;<br>
  2. After configuration, let the Android client run in the background. Keeping it in the foreground causes periodic refreshes and the WebView control consumes power unnecessarily;<br>
  3. Keep the server running in the background — it's safe and secure, only you can access it;<br>
  ...Usage scenarios...<br>
  <a href="https://cloud.tencent.com/developer/article/1926888">[Home Camera P2P Direct Connection]</a><br>

## Disclaimer<br>
* Please read the following disclaimer carefully. By using the smarGate software tool, you indicate your acceptance of the following:<br>
  1. It is strictly prohibited to use this software for computer hacking or any other activities that compromise computer network security;<br>
  2. This software is a legitimate network access tool. Please use it reasonably and lawfully; do not use it for activities that violate laws, ethics, or the interests of others. If used for illegal purposes, the resulting adverse consequences shall be borne by the user; the developer of this software assumes no responsibility or liability for any losses.<br>

## Donation
If you find smarGate helpful, donations are welcome to support the long-term development of the project!<br>
PS: It is recommended to include your registered username with the donation.<br>
<details>
<summary>
<mark><font size=5 color=darkred>WeChat Donation</font></mark>
</summary>
<img src="https://github.com/lazy-luo/smarGate/blob/master/res/donation.png"/>
</details>

## Appendix<br>
<details>
<summary>
<mark><font size=5 color=darkred>Changelog</font></mark>
</summary>

### 2026-07-24 — Updated to v0.41.1<br>
1. Added three new service display layouts, switchable via the top toolbar with one click:<br>
- **Card Mode**: Classic card view — service information at a glance
- **Tab Mode**: Horizontal scrolling tab bar at the top, grouped by access point, with scroll position auto-memorized
- **Compact Mode**: Compressed list view, click to expand details — ideal for managing large numbers of services

2. Theme selection support; layout preference automatically persisted (localStorage), restored on next launch<br>
3. Network engine optimization — improved performance and stability<br>
4. Added multi-language support for Persian, Korean, and Russian<br>
5. Version updated to v0.41.1<br>

### 2026-03-03 — Updated to v0.40.6<br>
1. Fixed TCP connection delayed disconnect issue<br>
2. Tuned the network engine for improved performance<br>
3. Version updated to v0.40.6<br>

### 2025-09-26 — Updated to v0.40.5<br>
1. Fixed a bug where connections would intermittently drop in proxy mode<br>
2. Enhanced stability and improved performance<br>
3. Added auto-start scripts. Usage:<br>
* Windows
```
On Windows, ensure enable_autostart.bat and enable_autostart.ps1 are in the same directory as the server executable.
Open a cmd window and run:
enable_autostart.bat on    → enable auto-start
enable_autostart.bat off   → disable auto-start
The script requires administrator privileges.
```
* Linux/macOS
```
Ensure enable_autostart.sh is in the same directory as the server executable.
enable_autostart.sh on     → enable auto-start
enable_autostart.sh off    → disable auto-start
```
4. Version updated to v0.40.5<br>

### 2025-03-25<br>
1. File management now supports deleting empty directories<br>
2. Server-to-server connections now connect on demand (retry once within 20 seconds)<br>
3. Enhanced stability — fixed unexpected exit issues<br>

### 2024-10-12 — Updated to v0.40.4:<br>
1. Added PROXY protocol — single port supports both SOCKS5 and HTTP proxy<br>
2. Added HTTP proxy username/password authentication<br>
```
<app-parameter>
    ...
    <httpx-user value="user" />
    <httpx-passwd value="pwd" />
    <socks-user value="user" />
    <socks-passwd value="pwd" />
    ...
</app-parameter>
```
3. Other optimizations<br>

### 2024-08-20<br>
1. Improved file transfer speed<br>
2. Other optimizations<br>

### 2024-08-17<br>
1. Fixed a bug where the server would be lost for extended periods when the network egress changed<br>
2. Improved P2P connection mechanism — increased P2P connection success rate<br>

### 2024-08-06 — Updated to v0.40.3<br>
1. Fixed an intermittent proxy connection drop bug on Windows<br>
2. Fixed a high CPU usage bug on Windows under low bandwidth<br>
3. Server now supports dynamic resource reclamation — suitable for memory-constrained devices<br>
4. Added build package supporting LoongArch64 architecture<br>
5. Version updated to v0.40.3<br>

### 2024-07-11<br>
1. Fixed a bug where the proxy address was incorrectly displayed as localhost<br>
2. Fixed an intermittent coredump bug on Windows<br>

### 2024-05-11<br>
1. Enabled asynchronous connections to prevent slow connections from blocking normal connections<br>
2. Fixed a bug where chained proxy, SOCKS5, and HTTP proxy connections could not be released under certain conditions<br>

### 2024-04-27 — Updated to v0.40.2:<br>
1. Improved P2P connection success rate<br>
2. Fixed some known bugs<br>
3. Version updated to v0.40.2<br>

### 2024-04-18:<br>
1. Fixed favorites bug<br>
2. Added service memo/note feature for easier service identification and tagging<br>

### 2024-04-10:<br>
1. VIP users now support Baidu Maps location tracking<br>
* App server supports GPS positioning
* Register on Baidu Maps Open Platform, apply for a "Browser" AK, then configure the AK in the SG client to use the map positioning feature

2. Version updated to v0.40.1<br>

### 2024-02-02:<br>
1. App usability update — future versions will adopt an entirely new interface<br>
2. Fixed a bug where IPv6 tunnels could not be created under certain conditions<br>
3. App now includes a Favorites feature for a clear overview of frequently used connections<br>
4. Version updated to v0.32.3<br>

### 2023-11-28:<br>
1. Safety protection for children and elderly — GPS positioning support to track the location of care recipients (manual authorization required)<br>
* This feature only supports Android server<br>
* Once coordinates are successfully obtained, latitude and longitude are automatically copied to the clipboard<br>

2. Other optimizations<br>

### 2023-11-17 — Updated to v0.32.2:<br>
1. SOCKS protocol now supports username/password authentication<br>
2. Audio recording save and playback support (VIP)<br>
3. Version updated to v0.32.2<br>

### 2023-10-25 — Updated to v0.32.1:<br>
1. Bug fixes<br>
2. Improved SOCKS protocol support (IPv4 TCP only)<br>
3. Improved HTTP proxy protocol support<br>
4. App now supports VIP feature licensing<br>
5. Version updated to v0.32.1<br>

### 2023-09-08 — Updated to v0.31.12:<br>
1. Bug fixes<br>
2. Experimental SOCKS protocol support (IPv4 TCP only)<br>
3. Added built-in HTTP proxy protocol support<br>
4. Memory reclamation (suitable for memory-constrained devices)<br>
5. Fully asynchronous approach for improved responsiveness<br>
6. Version updated to v0.31.12<br>

### 2023-08-29 — Updated to v0.31.11:<br>
1. File management now supports default sorting by time<br>
2. Added macOS M1/M2 support<br>
3. Version updated to v0.31.11<br>

### 2023-06-03 — Updated to v0.31.10:<br>
1. Network reliability optimization<br>
2. Optimized network transmission efficiency<br>
3. Version updated to v0.31.10<br>

### 2023-03-04 — Updated to v0.31.9:<br>
1. App server mode now includes an "Accessibility" service — users can enable it to achieve automatic restart<br>
2. App operation optimization: added auto-fill on click for easier configuration of new entries<br>
3. Fixed a bug where custom proxy services could not be provided when installed on MIPS routers<br>
4. Added periodic IP refresh for custom proxy domain names on the server side (dynamic DNS)<br>
5. Other optimizations<br>

### 2022-12-14 — Updated to v0.31.8:<br>
1. App server mode now supports custom proxy configuration and SSL encryption<br>
2. Custom proxy server supports SSL self-signed certificate distribution<br>
3. Other optimizations<br>

### 2022-11-04 — Updated to v0.31.7:<br>
1. Added one-click version upgrade — no manual update required<br>
* This feature sources versions from GitHub; if updates fail, check GitHub connectivity<br>
* Service typically restores within 10-20 seconds after updating<br>
* Server provides an auto-update option (checks once daily), disabled by default<br>
```
<auto-update value="true" />
```

### 2022-10-20 — Updated to v0.31.6:<br>
1. File management now supports file deletion<br>
2. File management now supports resumable transfer (breakpoint resume)<br>
3. File management now displays file timestamps<br>
4. File management now supports disk switching on Windows<br>
* This feature activates only when P2P or custom proxy connections are available<br>
* Upload and download via drag-and-drop<br>
* Double-click to open the file deletion confirmation dialog<br>

### 2022-10-14 — Updated to v0.31.5:<br>
1. Fixed a bug where custom proxy connections would fail after short-interval reconnection attempts<br>
2. Added basic file upload/download functionality for convenient cross-location document synchronization<br>
* This feature activates only when P2P or custom proxy connections are available<br>
* Upload and download via drag-and-drop<br>

3. Version updated to v0.31.5<br>

### 2022-09-05:<br>
1. Fixed a bug where custom proxy connections would disconnect abnormally<br>
2. Version unchanged<br>

### 2022-08-30 — Updated to v0.31.4:<br>
1. Reduced runtime virtual memory usage<br>
2. Routine optimizations<br>
3. Version updated to v0.31.4<br>

### 2022-08-14 — Updated to v0.31.3:<br>
1. Fixed a bug where MIPS architecture systems could not connect to custom proxies<br>
2. Fixed an issue with long HTTP protocol loading times<br>
3. Version updated to v0.31.3<br>

### 2022-08-06 — Updated to v0.31.2:<br>
1. Fixed an intermittent crash bug on Windows — enhanced stability<br>
2. Added keep-alive for P2P and custom proxy connections to minimize reconnection time windows and improve availability<br>
3. Other usability optimizations — reduced app power consumption<br>
4. Version updated to v0.31.2<br>

### 2022-07-28 — Updated to v0.31.1:<br>
1. Fixed a bug where server restarts under certain conditions caused mesh network configuration to become ineffective<br>
2. Fixed a P2P negotiation bug for NAT1 servers<br>
3. Version updated to v0.31.1<br>

### 2022-07-22 — Updated to v0.31:<br>
1. Added server-to-server port mapping — servers with public IPs can be directly accessed from the public internet (configuration via app only)
* Configuration: In the existing mapping "Remote IP" field, use the format ip@idx (where idx is the access point index)
* The "local port" configured this way is actually on the host of the current access point (note: NOT on the app phone)
* The mapping takes effect only if P2P (or custom proxy) between the servers succeeds
* Server-to-server proxy status is refreshed on the app only during P2P connections
* After configuration, wait about 10 seconds for the actual status to appear on the app

2. Version updated to v0.31<br>

### 2022-06-30:<br>
1. Fixed a bug where 32-bit big-endian machines could not proxy correctly when running the server<br>
2. Version unchanged<br>

### 2022-05-17:<br>
1. Server now supports auto-generation of self-signed certificates (default filename: server.xxx)<br>
  a. Configure the ssl-create-certfile option<br>
```
<app-parameter>
  <ssl-create-certfile value="true" />
...
</app-parameter>
```
  b. Ensure openssl is installed<br>
  c. Do not specify certificate files (do not configure ssl-cacert-file or ssl-privatekey-file)<br>

### 2022-05-04:<br>
1. Added RISC-V 32/64 architecture support — compiled with musl library (same as MIPS architecture)<br>
2. Optimized network transport layer<br>
3. Version unchanged<br>

### 2022-02-07 — Updated to v0.30.4:<br>
1. Added MIPS64el support<br>
2. Added system icon display on the app side<br>
3. Other optimizations<br>

### 2021-11-06 — Updated to v0.30.3:<br>
1. Fixed a bug where the app's memory usage display only showed JVM memory, excluding native memory<br>
2. Optimized the network engine — improved stability and fairness under high concurrency<br>

### 2021-10-17 — Updated to v0.30.2:<br>
1. Custom proxy now supports SSL verification<br>
2. P2P connections can now be configured as SSL tunnels ( **server must have certificates configured** )<br>
```
<app-parameter>
  <ssl-tunnel-required value="first" /><!-- 3 values: none, first, only -->
  ...
</app-parameter>
```
3. Other optimizations<br>

### 2021-09-24 — Updated to v0.30:<br>
1. Added Android server auto-start on boot support (server mode only, requires manual authorization)<br>
2. Android server in P2P mode now supports real-time audio (microphone permission requires manual authorization; the SG app must be open to record)<br>
3. Other optimizations<br>

### 2021-05-03 — Updated to v0.29.2:<br>
1. Fixed an issue where the app could not exit on newer Android versions<br>
2. Network optimization: fixed a bug that could cause network latency, further improved network transfer speed<br>
3. Added version number display for easier client and server version management<br>
4. Optimized app CPU usage — reduced power consumption<br>

### 2021-03-05 — Updated to v0.29:<br>
1. Fixed a server core dump issue when switching between IPv6 and IPv4 networks<br>
2. Client now includes an "IPv4-only" network mode option — for scenarios where IPv4 P2P connection is required in an IPv6 network environment (forces P2P via IPv4)<br>
3. Other bug fixes<br>
Note: Due to a critical core dump issue in certain scenarios, v0.29 requires simultaneous update of both client and server.

### 2020-12-13 — Updated to v0.28:<br>
1. Custom proxy now supports token-based access control to prevent unauthorized access. Also supports access restriction list configuration (access-token must be numeric; access-restricting accepts allowed SIDs, multiple SIDs separated by ":"; access-restricting is optional).<br>
 A. Proxy server configuration:
 ```
 <app-parameter>
  <proxy-service-port value="9001"/>
  <access-token value="nnnnn"/>
  <access-restricting value="xxxxx"/>
  ...
 </app-parameter>
 ```
 B. Server configuration (token must match the proxy server):
 ```
 <channel address="x.x.x.x:9001" ssl="true" token="nnnnn" />
```
2. Optimized tunnel timeout disconnect mechanism (P2P tunnels and user proxy tunnels only): When connections are active and in normal condition, the client sends heartbeats at random intervals to prevent timeout disconnection.<br>
 Scenario: During SSH sessions, the connection stays alive even with extended periods of inactivity — no more disconnection after 1-2 minutes of idling.

### 2020-05-23 — Updated to v0.27:<br>
1. Removed root permission acquisition — maintaining minimal permission requirements. Support for configuring ports below 1024 is currently not planned.<br>
2. Since my personal Raspberry Pi was broken by my child, I had to maximize the remaining value of old phones — Android app now supports "Server Mode", allowing old phones to serve as home servers.<br>

### 2020-04-30 — Updated to v0.26:<br>
1. Fixed an issue where configured HTTP services might become unavailable when the IP changed<br>
~~2. For rooted phones, attempted to acquire root privileges to support configuring reserved ports below 1024~~<br>
3. Fixed an issue where absolute path execution (common in startup scripts) without the -f parameter could not locate the default configuration file<br>
4. Server now includes an HTTP content replacement option (affects efficiency, ignores compressed data. For non-standard intranet web applications that embed IP:port in JS and return it to the browser). Default: no content filtering.<br>
```
    ...
    <moudle-parameter>
        <http-content-type-filter value="application/javascript" />
        ...
    <moudle-parameter/>
    ...
```
5. Server now includes a designated P2P negotiation port option — default is random port<br>
```
    ...
    <moudle-parameter>
        <negotiation-port value="xxxxx" />
        ...
    <moudle-parameter/>
    ...
```
6. Added an "Official Proxy" toggle — enabled by default. When disabled, data will never be forwarded through the official proxy.<br>

### 2020-03-13:<br>
1. Fixed a TCP-CORK bug where writable-event loss caused network latency under certain conditions<br>
2. Improved memory pool runtime performance<br>
3. Added -f command line parameter to specify the full path of the configuration file<br>
4. Other optimizations — version unchanged<br>

### 2020-01-18 — Updated to v0.25:<br>
1. Fixed an HTTP proxy failure bug<br>
2. App now displays IPv6 addresses<br>
3. Version updated to v0.25<br>

### 2019-11-30 — Updated to v0.24:<br>
1. PeanutShell now supports UDP? Alright then — UDP port forwarding is now supported. Game streaming users can give it a try.<br>
2. UDP over TCP mode supported<br>
3. Other minor optimizations<br>

### 2019-11-03:<br>
1. Fixed a memory leak bug<br>
2. Other minor optimizations — version unchanged<br>
3. Improved P2P reconnection reliability<br>

### 2019-09-30 — Updated to v0.23:<br>
1. Fixed a high CPU usage bug on the Windows server under weak network conditions<br>
2. Overall network transfer speed improvement<br>

### 2019-09-20 — Updated to v0.22:<br>
1. Improved P2P detection reliability<br>
2. Fixed a Windows bug where P2P connections could not be established under certain conditions<br>
3. Client now provides manual P2P reconnection (automatic reconnection may fail in weak network conditions; manual retry is available)

### 2019-09-15:<br>
1. Further reduced server CPU usage at low transfer rates<br>
2. Routine optimization — version unchanged<br>

### 2019-09-10 — Updated to v0.21:<br>
1. Network performance optimization<br>
2. Client now displays real-time network speed<br>

### 2019-09-05:<br>
1. Fixed a bug where auto-login would fail after changing the password on the client<br>
2. Added auto-login timeout control<br>

### 2019-09-01 — Updated to v0.20:<br>
1. Optimized connection check performance (parallel asynchronous detection)<br>
2. HTTPS-to-HTTP proxying support (client accesses via HTTP, server connects via HTTPS)<br>

### 2019-08-18 — Updated to v0.19:<br>
1. Performance optimization<br>
2. Fixed a bug where server connections could not be reliably disconnected under certain conditions (custom routes)<br>
3. Static compilation — no longer depends on Linux system GCC dynamic libraries; can run directly on Alpine (requires symlink creation)<br>
4. Added mini version build support — no longer statically compiles OpenSSL; dynamically compatible with OpenSSL library versions from 0.9.8 to 1.1.1. Binary package reduced to ~1MB (placed in the dynamic directory; requires SSL library configuration).<br>

### 2019-05-27 — Updated to v0.18:<br>
1. Performance optimization<br>
2. Added IPv6 P2P toggle mechanism: `<ipv4-tunnel-first value="false"/>` — set to "true" to disable IPv6 P2P. Default is "false"<br>
3. Added IPv6 indicator and connection status prompts on the client<br>

### 2019-05-21:<br>
1. Fixed a bug where IPv6 could not be detected on Raspbian Jessie<br>

### 2019-05-16 — Updated to v0.17:<br>
1. Performance optimization<br>
2. Added P2P disconnection and reconnection mechanism<br>

### 2019-05-04:<br>
1. Fixed an intermittent high CPU usage bug on the server when running with fewer than 4 threads and a private route was mounted — version unchanged<br>

### 2019-04-23 — Updated to v0.16:<br>
1. Fixed an intermittent core dump bug on the server when a private route was mounted<br>

### 2019-04-16 — Updated to v0.15:<br>
1. Fixed a bug where P2P would fail when switching between IPv4 and IPv6 networks<br>

### 2019-04-15 — Updated to v0.14:<br>
1. Fixed network switch reconnection failures<br>
2. Engine performance optimization<br>
3. Added IPv6 firewall traversal support (requires IPv6 support on the mobile device and the intranet server)<br>
**[Important Notice]** v0.14 is incompatible with previous versions. Please update all components!<br>

### .... Initial version v0.13<br>
</details>
