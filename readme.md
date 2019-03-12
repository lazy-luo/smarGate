# 中文 | [English](https://github.com/lazy-luo/smarGate/blob/master/README_en.md)

# 移动网关

提供内网穿透能力，通过加密隧道，能安全的将内网服务暴露出来. <br>
支持p2p通讯（p2p通道可用时显示为绿色）<br>
支持自定义代理服务器 <br>
免费，测试稳定后考虑开源. <br>
包含一个android客户端和需内网安装的服务端.<br>
## samrGate是什么？<br>
>> 官方命名为“移动网关”，通过手机客户端将位于内网的服务端网络进行按需暴露，核心引擎采用c++实现。<br>
>> 具备如下特点：<br>
>> * 安全性 <br>
>>>> * 手机客户端作为唯一的访问入口，按需开放，及时关闭。<br>
>>>> * 电脑可以接入手机热点或wifi环境下通过访问手机开放的端口穿透到内网进行访问（客户端会显示手机ip）。<br>
>>>> * 手机网络一般为私有网段别人无法访问。<br>
>>>> * 用户间隔离。<br>
>> * 扩展性<br>
>>>> * 基于内网网段代理，可以配合众多工具实现各种网络服务能力（telnet、ssh、http服务、内网摄像头、远程桌面等）<br>
>>>> * 面向极客，可访问自定义的内网服务（rpc）<br>
>> * 便利性<br>
>>>> * 手机客户端一点配置<br>
>>>> * 服务能力动态增减<br>
>> #### “移动网关”是用户私有网关，所有共享访问入口都在客户端，不是类似其它穿透工具主推的面向域名的公共访问入口。打个比方：smarGate是将防盗门随身携带，其它穿透产品是将防盗门放到公共场所，额...虽然需要钥匙，但有种职业叫开锁匠<br>
## samrGate有什么技术特点？<br>
>> * 支持代理穿透<br>
>>>> * 官方提供免费的代理服务器（共享带宽，多人共用时比较慢，最佳实践为启用自有代理服务器）<br>
>>>> * <I>如果自己有云服务器（具备公网ip），用户可自定义自己的代理服务器，且在代理服务器上安装proxy_server。所有数据传输走用户配置的代理服务器（为了防止中间人攻击，代理服务器需要用户生成自签名证书）</I> 。“代理服务器”配置如下：<br>
```
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
        <app-parameter>
	        <proxy-service-port value="9001"/><!--自定义代理端口 -->
          <!-- 如果自己有证书及私钥，则配置如下项，启动安全的SSL通道，其中文件名需要配置正确；没有证书则不需要配置，启用普通tcp连接
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
>>>> 服务端中增加如下配置：
```
......
    <moudle-parameter>
      ......
      <!-- 配置上述代理服务器的ip或域名+端口，注意：ip必须为公网IP。ssl选项必须配置正确，如果代理服务器有证书且生效则配置为true否则为false -->
      <channel address="xxx.xxx.xxx.xxx:9001" ssl="false" />
    </moudle-parameter>
```
>> * 支持p2p通道<br>
>>>> * 使用TCP协议进行p2p穿透，提升安全性<br>
>>>> * 不是所有的网络都支持p2p，取决于两端NAT类型
## 已知问题<br>
>> * 客户端采用webview控件，在android下启动时内存占用较多，后续版本计划用native界面，预计内存占用可降低到50m左右

## 使用指南:<br>
### 1、下载android客户端（app-release.apk）支持armv7及arm64 cpu架构<br>
### 2、注册新用户（邀请码必填，为数字，可任意填。ps：如果必填信息未填完整,或包含中文字符，会注册失败）<br>
![login](https://github.com/lazy-luo/smarGate/blob/master/res/login.png)<br>
![register](https://github.com/lazy-luo/smarGate/blob/master/res/register.png)<br>
### 3、注册成功后请务必记住返回的服务ID(N)<br>
![register result](https://github.com/lazy-luo/smarGate/blob/master/res/registerok.png)<br>
### 4、下载内网服务器适合的服务端版本（目前支持linux-x86-32/64，windows，及linux-arm【树莓派、群晖】）<br>
### 5、解压服务端压缩包，修改配置文件(conf-proxy.xml):<br>
```
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
       <moudle-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
        <app-name value="xxxxx [name of service points]." /><!-- need modify -->
        <app-description value="yyyyy [description of service points]" /><!-- need modify -->
        <server-address value="visery.net:39001"/>
        <user-audit value="N:index"/><!-- need modify (N 为注册成功返回的服务ID，index为自定义的服务端实例序号，建议从1开始，不能重复. 例如:[12345:1])-->
    </moudle-parameter>
  </app-config>
```
### 6、执行命令： "nohup ./proxy_server -i1000 -o1000 -w8 >/dev/null &"(参数说明 i:最大接入连接数,o:最大接出连接数,w:最大线程数，执行命令前确保为 proxy_server 添加执行权限：chmod +x proxy_server )<br>
### 7、使用注册时的用户名/密码登陆手机客户端<br>
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper1.png)<br>
### 8、在客户端中可以看到上线的服务端，可以在客户端上定义端口反弹规则<br>
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper2.png)<br>
### 配置中的“远程ip”为“访问点”对应内网中的某台主机ip（localhost或127.0.0.1代表内网server端所在机器本身）
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper3.png)<br>
### 9、电脑或手机可以直接访问手机客户端设置的服务（如ssh、http等）<br>
## 补充说明:<br>
* 所有版本已经打包了依赖，开箱即用.<br>
* Android 客户端需要权限:<br>
>> 1、后台执行权限（如果不允许，则app进入后台会断开连接）<br>
>> 2、网络访问权限（基本权限）<br>
* 手机设置 (Android):<br>
>> 1、设置 -> 无线及网络 -> WLAN -> 系统休眠保持连接  "允许" （否则，系统休眠会被断连）<br>
>> 2、设置 -> 无线及网络 -> 移动网络 -> 高级 ->始终保持数据连接 "允许"<br>

Q：如何下载安装 android app？<br>
  1、用android手机浏览器打开 https://github.com/lazy-luo/smarGate/raw/master/app-release.apk <br>
  2、弹出框中下载安装 <br>
  网盘链接为最新版本，github上版本稍有滞后 <br>
  附网盘下载地址： https://pan.baidu.com/s/14Iq60kxHW711NVoCVKWySg <br>

  如有需要请添加微信：ws_lzy008 注明：smarGate ，视情况组建技术讨论群<br>
## 免责申明<br>  
* 请您仔细阅读以下申明，您在使用smarGate工具软件，表明您对以下内容的接受：<br> 
  1、严禁使用本软件从事计算机黑客行为以及其他任何危害计算机信息网络安全的;<br> 
  2、本软件属于正规网络接入软件，请合理，合法的使用；勿用于违反法律，道德及影响他人利益的活动；如果因用于非法用途，由此造成的不良后果，由用户自行负责，本软件开发者不承担任何责任及损失。<br>
