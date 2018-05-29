import { DataStore } from './js/base/DataStore.js';
import { Director } from './js/Director.js';
import { ResourceLoader } from './js/base/ResourceLoader.js';
import { BackGround } from './js/runtime/Background.js';
import { Land } from './js/runtime/Land.js';
import { Move } from './js/player/Move.js';
import { Sprite } from './js/base/Sprite.js';
import { Coin } from './js/runtime/Coin.js';
import { Fire } from './js/runtime/Fire.js';
import { StartButton } from './js/player/StartButton.js';
import { Score } from './js/player/Score.js';

export class Main {
    constructor() {
        // this.canvas = wx.createCanvas();
        this.canvas = document.getElementById('game_canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    //加载音乐
    createBackgroundMusic() {
        var bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = "./audio/bgm.mp3";
    }

    //资源缓冲到变量缓存器中;
    onResourceFirstLoaded(map) {
        console.log(map);
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();
        this.init();
    }


    init() {
        //游戏是否结束
        this.director.isGameOver = false;
        this.dataStore.put('background', BackGround)
            .put('coins', [])
            .put('fires', [])
            .put('land', Land)
            .put('move', Move)
            .put('score', Score)
            .put('startButton', StartButton)

        this.registerEvent();
        this.director.createFire();
        this.director.INIT_FIRE_NUM++;
        this.director.createCoin();
        this.director.INIT_COIN_NUM++;
        this.director.run();

    }

    registerEvent() {
        let startX;
        let startY;
        this.canvas.addEventListener('touchstart', e => {
                e.preventDefault();
                if (this.director.isGameOver) {
                    startX = 0;
                    startY = 0
                    this.init();
                } else {
                    this.canvas.addEventListener('touchmove', e => {
                        e.preventDefault();
                        let endX = e.touches[0].pageX;
                        let endY = e.touches[0].pageY;
                        let distanceX = endX - startX;
                        let distanceY = endY - startY;

                        if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
                            this.director.moverEvent(e.touches[0].pageX, 'right')
                        } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
                            this.director.moverEvent(e.touches[0].pageX, 'left')
                        }

                        startX = e.touches[0].pageX;
                        startY = e.touches[0].pageY;
                    })
                }
            })
            // console.log("ooooooooomygodddddddddddddddddddddd")
            // if (this.director.isGameOver) {
            //     this.canvas.addEventListener('touchstart', e => {
            //         this.init();
            //         // this.director.coinEvent();
            //         // this.director.fireEvent();
            //     });
            // } else {
            //     console.log("哈哈哈哈哈哈哈");
            //     // console.log('oooooooooooooooooooooooooooooooooooo');
            //     this.canvas.addEventListener('touchmove', e => {
            //         e.preventDefault();
            //         let endX = e.touches[0].pageX;
            //         let endY = e.touches[0].pageY;
            //         let distanceX = endX - startX;
            //         let distanceY = endY - startY;

        //         if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
        //             this.director.moverEvent(e.touches[0].pageX, 'right')
        //         } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
        //             this.director.moverEvent(e.touches[0].pageX, 'left')
        //         }

        //         startX = e.touches[0].pageX;
        //         startY = e.touches[0].pageY;
        //     })

        // }

    }
}