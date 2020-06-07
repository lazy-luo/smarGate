
A mobile gateway that exposes the intranet service points. <br>
Free, after testing will be open source. <br>
It contains a Android client app and server program.<br>
Usage:<br>
### 1、download android client app<br>
### 2、register user（the invitation code must be numeric and can be filled with any value）<br>
![login](https://github.com/lazy-luo/smarGate/blob/master/res/login.png)<br>
![register](https://github.com/lazy-luo/smarGate/blob/master/res/register.png)<br>
### 3、remember register key-number(N)<br>
![register result](https://github.com/lazy-luo/smarGate/blob/master/res/registerok.png)<br>
### 4、download server program matched you serverOS<br>
### 5、modify config file(conf-proxy.xml):<br>
```
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
       <moudle-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
        <app-name value="xxxxx [name of service points]." /><!-- need modify -->
        <app-description value="yyyyy [description of service points]" /><!-- need modify -->
        <user-audit value="N:index"/><!-- need modify (N is step 3 return,index is you service point order. e.g:[12345:1])-->
    </moudle-parameter>
  </app-config>
```
### 6、excute shell "nohup ./proxy_server -i1000 -o1000 -w8 >/dev/null &"(parameter i:input connections,o:output connections,w:max threads)<br>
### 7、login from android client app<br>
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper1.png)<br>
### 8、create service local proxy in android app<br>
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper2.png)<br>
![operator](https://github.com/lazy-luo/smarGate/blob/master/res/oper3.png)<br>
### 9、enjoy it！<br>
## ps:<br>
* The server does dependless any third party package.<br>
* Android Client app requires permission:<br>
>> 1、background running privileges<br>
>> 2、network access<br>
* Cell phone settings (Android):<br>
>> 1、setting -> wireless and network -> WLAN -> maintain WLAN connections in dormant state  "ALLOW"<br>
>> 2、setting -> wireless and network -> mobile network -> advanced ->always connected network data service "ALLOW"<br>


