# MoreMoney
这是一个我自己开发的微信小游戏,游戏逻辑都是本人自己编写,MoreMoney是微信小游戏，MoreMoneyWeb是对应的H5版本。
现在开源以供大家参考学习（本人能力有限，不足之处请及时指出），背景素材全部来源于网络，效果图如下。

![enter image description here](https://imgs.immisso.com/wechatgame/%E6%88%AA%E5%9B%BE1.png)

![enter image description here](https://imgs.immisso.com/wechatgame/%E6%88%AA%E5%9B%BE2.png)

游戏源码放在[github](https://github.com/immisso/MoreMoney)上，以及自己的[个人博客](https://www.immisso.com)


小游戏的结构目录，参考了微信官网的示例游戏——打飞机，其目录结构如下
```
./js
├── game.js                            //游戏入口函数
├── game.json                          //配置文件
├── Main.js                            //游戏入口主函数
├─audio
│   └──bgm.mp3                         //音乐文件
│      
├─js
│  ├── Director.js                     //导演类
│  │  
│  ├─ base
│  │   ├── DataStore.js                //数据存储类
│  │   ├── ResourceLoader.js           //资源加载类
│  │   ├── Resources.js                //资源类
│  │   └── Sprite.js                   //游戏基本元素精灵类
│  │      
│  ├─ player
│  │    ├── Move.js                    //移动者类
│  │    ├── Score.js                   //分数统计类
│  │    └── StartButton.js             //开始按钮类
│  │      
│  └─runtime
│       ├── Background.js              //背景图片类
│       ├── Coin.js                    //金币类
│       ├── Fire.js                    //火类
│       └── Land.js                    //陆地类
│          
└─res                                  //资源文件夹
```
此目录结构仅供参考，根据自己的实际情况进行修改






