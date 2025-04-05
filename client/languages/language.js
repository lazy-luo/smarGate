var g_languages = [
    ["中文"//0
    ,"确 定"//1
    ,"取 消"//2
    ,"刷 新"//3
    ,"清缓存"//4
    ,"改密码"//5
    ,"保 存"//6
    ,"模式切换"//7
    ,"删 除"//8
    ,"登 录"//9
    ,"注 册"//10
    ,"返回登录"//11
    ,"移动网关"//12
    ,"用户登录"//13
    ,"用户名"//14
    ,"密码"//15
    ,"自动登录"//16
    ,"用户注册"//17
    ,"邀请码"//18
    ,"确认密码"//19
    ,"姓名"//20
    ,"联系电话"//21
    ,"邮箱"//22
    ,"用户协议"//23
    ,"必须填写邀请码"//24
    ,"描述"//25
    ,"基础信息"//26
    ,"发送 ↑ "//27
    ,"接收 ↓ "//28
    ,"总内存"//29
    ,"已用内存"//30
    ,"内存峰值"//31
    ,"状态"//32
    ,"在线"//33
    ,"离线"//34
    ,"系统状态"//35
    ,"工作线程"//36
    ,"空闲线程"//37
    ,"最大连接"//38
    ,"当前连接"//39
    ,"等待事件"//40
    ,"检测线程"//41
    ,"服务集合"//42
    ,"本地端口"//43
    ,"路由指向"//44
    ,"协议"//45
    ,"远程IP"//46
    ,"远程端口"//47
    ,"服务端"//48
    ,"修改配置"//49
    ,"官方代理"//50
    ,"访问点配置"//51
    ,"访问点序号"//52
    ,"访问点名称"//53
    ,"访问点描述"//54
    ,"协商端口号"//55
    ,"输入小于64的数字..."//56
    ,"输入节点名..."//57
    ,"输入简短描述..."//58
    ,"协商端口号默认不指定..."//59
    ,"必须输入访问点序号，且为<64的整数"//60
    ,"更改密码"//61
    ,"旧密码"//62
    ,"新密码"//63
    ,"恭喜您：注册请求成功，请务必妥善保管你的服务ID"//64
    ,"登录失败，请验证输入的用户名密码！"//65
    ,"登录中..."//66
    ,"注册失败，请确认信息填写无误！"//67
    ,"密码修改失败！！"//68
    ,"请等待..."//69
    ,"注册中..."//70
    ,"必须输入原密码"//71
    ,"密码不能为空"//72
    ,"新密码不能和原密码相同"//73
    ,"确认密码不一致"//74
    ,"访问点名称不能为空，且长度<64"//75
    ,"访问点简要描述不能为空，且长度<64"//76
    ,"必须填写邀请码"//77
    ,"必须填写用户名"//78
    ,"必须设置密码"//79
    ,"必须设置确认密码，且确保与密码一致"//80
    ,"必须填写昵称"//81
    ,"你真的要删除当前配置的代理点吗？"//82
    ,"正在自动登录，请稍后..."//83
    ,"网络不可用，请确认网络设置"//84
    ,"端口"//85
    ,"服务端模式"//86
    ,"访问点"//87
    ,"待检测"//88
    ,"连接检测中..."//89
    ,"旧版本"//90
    ,"登录失败！用户不存在或密码错误"//91
    ,"密码修改成功！请妥善保管您的密"//92
    ,"密码修改成功！下次登录需重新输入新密码"//93
    ,"注册失败！邀请码有误"//94
    ,"密码修改失败，请稍后再试"//95
    ,"转发配置错误[本地端口需大于1024]"//96
    ,"转发端口配置错误[需小于65536]"//97
    ,"远程端口配置错误，范围[1-65535]"//98
    ,"转发配置错误[端口冲突]"//99
    ,"转发配置错误[未知错误]"//100
    ,"配置修改成功！将在下次重启时生效"//101
    ,"移动网关将保持提供服务"//102
    ,"服务启动时间"//103
    ,"暴露服务集"//104
    ,"服务端代理"//105
    ,"请选择文件操作："//106
    ,"上传"//107
    ,"下载"//108
    ,"文件管理"//109
    ,"文件名"//110
    ,"大小"//111
    ,"当前版本过低,不支持自动升级,请手动更新！"//112
    ,"自定义代理"//113
    ,"自定义代理 IP:port..."//114
    ,"访问Token"//115
    ,"代理服务器Token..."//116
    ,"P2P加密选项" //117
    ,"none"//118
    ,"first"//119
    ,"only"//120
    ,"序列号注册成功！"//121
    ,"序列号注册失败！"//122
    ,"序列号注册" //123
    ,"序列号" //124
    ,"必须输入序列号" //125
    ,"VIP 到期剩余时间（天）:" //126
    ,"播放" //127
    ,"已发送定位请求..." //128
    ,"定位请求失败" //129
    ,"已成功获取定位信息" //130
    ,"请输入账号"//131
    ,"请输入密码"//132
    ,"账号最短为 5 个字符"//133
    ,"密码长度至少为 6 个字符"//134
    ,"邀请码必须输入数字，且不为0"//135
    ,"邮箱地址格式错误"//136
    ,"请输入邀请码"//137
    ,"请确认密码"//138
    ,"请输入电话号码"//139
    ,"请输入邮箱"//140
    ,"注册成功后，请于2小时内完成首次登录，用户名、密码请妥善保管，用户相关数据仅存储于本地。"//141
    ,"密码两次输入不一致"//142
    ,"设置"//143
    ,"左滑可以打开设置"//144
    ,"设置完成后，即时生效，你可以右滑返回"//145
    ,"语言选择"//146
    ,"常用设置"//147
    ,"高级设置"//148
    ,"操作确认"//149
    ,"确认删除该条收藏记录？"//150
    ,"系统免费用户"//151
    ,"确认删除该条代理记录？"//152
    ,"添加映射配置"//153
    ,"注意：请仔细核对，如输入序列号错误，须等待半小时才能继续注册"//154
    ,"下拉可以刷新"//155
    ,"释放立即刷新"//156
    ,"正在刷新..."//157
    ,"提示信息"//158
    ,"错误信息"//159
    ,"常用收藏"//160
    ,"为常用连接提供收藏"//161
    ,"请输入收藏标题"//162
    ,"加入收藏"//163
    ,"文件传输功能只能在P2P或自定义代理生效时使用"//164
    ,"您暂时没有此功能权限"//165
    ,"目标文件夹"//166
    ,"当前文件夹"//167
    ,"任务区"//168
    ,"可点击切换文件主机"//169
    ,"刷新操作需要30秒间隔"//170
    ,"操作失败，条目可能已添加" //171
    ,"是否切换为服务端模式？"//172
    ,"切换服务端/客户端模式后，需要重启APP才能生效！" //173
    ,"请输入姓名"//174
    ,"请间隔30秒后再试！"//175
    ,"新用户注册失败！"//176
    ,"网络太慢，数据加载超时！"//177
    ,"确认删除当前选中文件？"//178
    ,"确认传输当前选中文件？"//179
    ,"玩命加载中..."//180
    ,"请自行申请百度地图浏览器版AK。如首次使用地图，请在配置中设置AK"//181
    ,"AK码设置"//182
    ,"请输入百度地图浏览器版AK码"//183
    ,"地图"//184
    ,"描述"//185
    ,"备注设置"//186
    ,"请输入服务简短备注"//187
    ,"设置[电池优化]"//188
    ,"设置后台[无限制]"//189
    ,"关闭应用速冻"//190
    ,"允许后台高耗电"//191
    ,"前往[电池优化]-[应用名称]，设置[不允许]"//192
    ,"设置MIUI系统后台配置为[无限制]"//193
    ,"前往[电池]-[应用名称]，关闭[后台冻结]和[检测到异常时自动优化]"//194
    ,"前往[电池]-[后台耗电管理]-[应用名称]，设置[允许后台高耗电]"//195
    ,"跳转设置失败"//196
    ,"未知机型，请自行设置后台运行权限"//197
    ],
    ["English"
    , "OK" //1
    , "Cancel" //2
    , "Refresh" //3
    , "Clear" //4
    , "Chpass" //5
    , "Save" //6
    , "Chmode" //7
    , "Delete" //8
    , "Login" //9
    , "Register" //10
    , "Back to login" //11
    , "SmarGate" //12
    , "User login" //13
    , "User name" //14
    , "Password" //15
    , "Auto login" //16
    , "User registration" //17
    , "Invitation NO" //18
    , "Confirm" //19
    , "Name" //20
    , "Phone NO" //21
    , "Mailbox" //22
    , "User Agreement" //23
    , "Invitation code must be filled in" //24
    , "Desc" //25
    , "Info" //26
    , "SND ↑ " //27
    , "RX ↓ " //28
    , "Tot-mem" //29
    , "Usage" //30
    , "Max-usage" //31
    , "Status" //32
    , "Online" //33
    , "Offline" //34
    , "Summery" //35
    , "Workers" //36
    , "Idles" //37
    , "Max-sockets" //38
    , "Connections" //39
    , "Pending" //40
    , "Products" //41
    , "Services" //42
    , "Local port" //43
    , "Routing to" //44
    , "Protocol" //45
    , "Peer IP" //46
    , "Peer port" //47
    , "Server" //48
    , "Configure" //49
    , "Agent" //50
    , "Endpoint configuration" // 51
    , "Endpoint IDX"//52
    , "Endpoint name" // 53
    , "Endpoint Desc" // 54
    , "Negotiation port" //55
    , "Enter a number less than 64..." //56
    , "Enter node name..." //57
    , "Enter a short description..." //58
    , "No need specified by default..." //59
    , "The access point number must be entered and is an integer of <64" //60
    , "Change password" //61
    , "Older" //62
    , "Newer" //63
    , "Congratulations: registration request is successful. Please keep your service ID properly" //64
    , "Login failed. Please verify the user name password you entered!"// 65
    , "Logging in..." //66
    , "Registration failed. Please confirm that the information is filled in correctly!"// 67
    , "Password modification failed!!"// 68
    , "Please wait..." //69
    , "Registered..." //70
    , "Must enter original password" //71
    , "Password cannot be empty" //72
    , "New password cannot be the same as the original password" //73
    , "Confirm password is inconsistent" //74
    , "Endpoint name cannot be empty and length is <64" //75
    , "Endpoint brief description cannot be empty and length is <64" //76
    , "Invitation code must be filled in" //77
    , "User name must be filled in" //78
    , "Password must be set" //79
    , "Confirm password must be set and be sure to be consistent with password" //80
    , "Must fill in nickname" //81
    , "Do you really want to delete the currently configured proxy point?"// 82
    , "Logging in automatically, please wait..." //83
    , "Network not available, please confirm network settings "//84
    , "Port" //85
    , "Server mode" //86
    , "EP" // 87 Endpoint
    , "Waiting for detection" //88
    , "Connection detection..." //89
    , "Old version" //90
    , "Login failed! User does not exist or password error "//91
    , "Password modified successfully! Please keep your secret in good condition "//92
    , "Password modified successfully! The next login requires a new password to be re entered "//93
    , "Registration failed! Invitation code error "//94
    , "Password modification failed. Please try again later "//95
    , "Forwarding configuration error [local port needs to be greater than 1024]" //96
    , "Forward port configuration error [less than 65536]" //97
    , "Remote port configuration error, range [1-65535]" //98
    , "Forward configuration error [port conflict]" //99
    , "Forward configuration error [unknown error]" //100
    , "Configuration modification succeeded! Will take effect on the next reboot "//101
    , "The SmarGate will remain in service" // 102
    , "Service start time" // 103
    , "Exposed services"//104
    , "Server Proxy"//105
    , "Please select a file operation:"//106
    , "upload"//107
    , "download"//108
    , "File Manager" //109
    , "file name" //110
    , "size" //111
    , "The current version is too low to support automatic upgrade, please update manually!" //112
    , "User proxy"//113
    , "User proxy IP:port..."//114
    , "Access token"//115
    , "Token of proxy server..."//116
    , "SSL for P2P" //117
    , "none"//118
    , "first"//119
    , "only"//120
    , "Successful license register！"//121
    , "Fault to license register！"//122
    , "License register" //123
    , "License key" //124
    , "license key must be filled" //125
    , "VIP exp-after-days:" //126
    , "Play" //127
    , "Location request has been sent..." //128
    , "Location request failed" //129
    , "Successfully obtained location information" //130
    , "Please enter your account"//131
    , "Please enter password"//132
    , "The minimum account length is 5 characters"//133
    , "The password length should be at least 6 characters"//134
    , "The invitation code must be entered as a number and not 0"//135
    , "Email address format error"//136
    , "Please enter the invitation code"//137
    , "Please confirm password"//138
    , "Please enter a phone number"//139
    , "Please enter your email address"//140
    , "After successful registration, please complete the first login within 2 hours. Please keep your username and password properly, and user related data is only stored locally."//141
    , "The password entered twice is inconsistent"//142
    , "Setting"//143
    , "Left swipe to open settings"//144
    , "After setting up, you can slide right to return"//145
    , "Language "//146
    , "Common Settings"//147
    , "Advanced Setting"//148
    , "Operate Confirm"//149
    , "Are you sure to delete this favorite record?"//150
    , "You are free users"//151
    , "Confirm deleting the proxy record?"//152
    , "Add mapping configuration" //153
    , "Attention: Please check carefully. If you enter the wrong serial number, you will need to wait for half an hour before continuing to register"//154
    , "Dropdown can refresh"//155
    , "Release and refresh immediately"//156
    , "Refreshing..."//157
    , "Information"//158
    , "Error"//159
    , "Favorites"//160
    , "Provide favorites for commonly used connections"//161
    , "Please enter the bookmark title"//162
    , "Add to favorites"//163
    , "The file transfer function can only be used when P2P or custom proxies are in effect"//164
    , "You currently do not have permission for this feature"//165
    , "Destination Folder"//166
    , "Current Folder"//167
    , "Mission Area"//168
    , "Click to switch file hosts"//169
    , "The refresh operation requires a 30 second interval"//170
    , "Operation failed, entry may have been added"//171
    , "Switch to server-side mode?"//172
    , "After switching between server/client mode, you need to restart the app to take effect!"//173
    , "Please enter your name"//174
    , "Please try again after a 30 second interval"//175
    , "New user registration failed！"//176
    , "The network is too slow, data loading timed out!"//177
    , "Confirm deleting the currently selected file？"//178
    , "Confirm the transfer of the currently selected file？"//179
    , "Loading..."//180
    , "Please apply for Baidu Map Browser version AK by yourself. If using the map for the first time, please set AK in the configuration"//181
    , "AK code setting"//182
    , "Enter AK code of the Baidu Map"//183
    , "Map"//184
    , "MEMO"//185
    , "Notes modify"//186
    , "Enter notes of the services"//187
    , "Settings [Battery Optimization]"//188
    , "Set up background [unlimited]"//189
    , "Close application quick freeze"//190
    , "Allow high power consumption in the background"//191
    , "Go to [Battery Optimization]-[App Name] and set [Not Allowed]"//192
    , "Set the MIUI system background configuration to [Unlimited]"//193
    , "Go to [Battery]-[App Name], turn off [Background Freeze] and [Automatic Optimization when Abnormality Detected]"//194
    , "Go to [Battery]-[Background Power Consumption Management]-[App Name] and set [Allow background high power consumption]"//195
    , "Load setting failed"//196
    , "Unknown model, please set background running permissions yourself"//197
    ]
  ];
