# smarGate
A mobile gateway that exposes the intranet service points. <br>
Free, after testing will be open source. <br>
It contains a Android client app and server program.<br>
Usage:<br>
1、download android client app<br>
2、register user<br>
3、remember register key-number(N)<br>
4、download server program matched you serverOS<br>
5、modify config file(conf-proxy.xml):<br>
  <?xml version="1.0" encoding="GBK"?>
    <app-config code="PROXY" name="proxy-server">
       <moudle-parameter>
        <log-level value="LOG_ERROR"/>
        <log-write-mode value="CONSOLE_ONLY"/>
        <app-name value="xxxxx [name of service points]." /><!-- need modify -->
        <app-description value="yyyyy [description of service points]" /><!-- need modify -->
        <server-address value="visery.net:39001"/>
        <user-audit value="N:index"/><!-- need modify (N is step 3 return,index is you service point order. EXP:[12345:1])-->
    </moudle-parameter>
  </app-config>
6、excute shell "nohup ./proxy_server -i1000 -o1000 -w8 >/dev/null &"(parameter i:input connections,o:output connections,w:max threads)<br>
7、login from android client app<br>
8、create service local proxy in android app<br>
9、enjoy it！<br>
ps:<br>
The Linux 64 bit version does dependless any third party package.<br>
NAS arm version relies on OpenSSL, which requires OpenSSL to be installed before.<br>
