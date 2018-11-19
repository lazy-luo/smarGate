# 移动网关

提供内网穿透能力，通过加密隧道，能安全的将内网服务暴露出来. <br>
支持p2p通讯（p2p通道可用时显示为绿色）<br>
免费，测试稳定后考虑开源. <br>
包含一个android客户端和需内网安装的服务端.<br>

使用指南:<br>
### 1、下载android客户端（app-release.apk）<br>
### 2、注册新用户（邀请码必填，为数字，可任意填）<br>
![login](https://github.com/lazy-luo/smarGate/blob/master/res/login.png)<br>
![register](https://github.com/lazy-luo/smarGate/blob/master/res/register.png)<br>
### 3、注册成功后请务必记住返回的服务ID(N)<br>
![register result](https://github.com/lazy-luo/smarGate/blob/master/res/registerok.png)<br>
### 4、下载内网服务器适合的服务端版本（目前支持linux-x86-32/64，及linux-arm【树莓派、群晖】）<br>
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
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper3.png)<br>
### 9、电脑或手机可以直接访问手机客户端设置的服务（如ssh、http等）<br>
## 补充说明:<br>
* Linux x86 或 x86_64 位版本已经打包了依赖，开箱即用.<br>
* Linux armv 版本依赖 OpenSSL, 必须确保先安装OpenSSL，且能找到libssl.so及libcrypto.so库(注意，OpenSSL库命名).<br>
* Android 客户端需要权限:<br>
>> 1、后台执行权限（如果不允许，则app进入后台会断开连接）<br>
>> 2、网络访问权限（基本权限）<br>
* 手机设置 (Android):<br>
>> 1、设置 -> 无线及网络 -> WLAN -> 系统休眠保持连接  "允许" （否则，系统休眠会被断连）<br>
>> 2、设置 -> 无线及网络 -> 移动网络 -> 高级 ->始终保持数据连接 "允许"<br>


