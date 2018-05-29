/**
 *  Created by Misso on 2018/5/18 14:55
 */
import { DataStore } from "./base/DataStore.js";
import { Fire } from "./runtime/Fire.js";
import { Coin } from "./runtime/Coin.js";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moverleft = 0;
        // this.isGameOver = false;
        this.INIT_COIN_NUM = 0;
        this.INIT_FIRE_NUM = 0;
    }

    createFire() {
        const X1 = Math.random() * (this.dataStore.canvas.width - 54);
        this.dataStore.get('fires').push(new Fire(X1));
    }
    createCoin() {
        const X1 = Math.random() * (this.dataStore.canvas.width - 54);
        this.dataStore.get('coins').push(new Coin(X1));
    }
    moverEvent(x, direction) {
        this.dataStore.get('move').moverX = x;
        this.moverleft = x;
        this.dataStore.direction = direction;
        // this.dataStore.get('left').moverY = y;
    };
    /**
     * 落物存在两种:
     * 1.如果是金币碰撞就加分。
     * 2.如果是火碰撞就游戏结束。
     * @param {*} fall 落物对象
     * @param {*} mover 移动对象
     * @param {*} type 落物类型
     */
    static isCollision(fall, mover) {
        let s = false;
        //落物碰撞检测
        if (fall.bottom > mover.top &&
            fall.top < mover.bottom &&
            fall.right > mover.left &&
            fall.left < mover.right) {
            s = true;
        }
        return s;
    }
    check() {
        const mover = this.dataStore.get('mover');
        const score = this.dataStore.get('score');
        const coins = this.dataStore.get('coins');
        const fires = this.dataStore.get('fires');
        const moverBorder = {
            top: this.dataStore.canvas.height - this.dataStore.get('land').height - 38,
            left: this.moverleft,
            right: this.moverleft + 54,
            bottom: this.dataStore.canvas.height - this.dataStore.get('land').height - 38 + 39
        }
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            const coinBorder = {
                top: coin.Y,
                bottom: coin.Y + coin.height,
                left: coin.X,
                right: coin.X + 53
            }

            if (Director.isCollision(coinBorder, moverBorder)) {
                console.log("吃到金币了哦！");
                score.isScore = true;
                coins.splice(i, 1);
                this.INIT_COIN_NUM--;
                return;
            }
        }

        for (let i = 0; i < fires.length; i++) {
            const fire = fires[i];
            const fireBorder = {
                top: fire.Y + 5,
                bottom: fire.Y + fire.height - 5,
                left: fire.X + 5,
                right: fire.X + 38 - 5
            }
            if (Director.isCollision(fireBorder, moverBorder)) {
                this.isGameOver = true;
                console.log("被火拷了哦！");
                return;
            }
        }
        if (score.isScore) {
            score.isScore = false;
            score.scoreNumber++;
        }
    }
    run() {
        this.check()
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();
            const coins = this.dataStore.get('coins');
            const fires = this.dataStore.get('fires');
            if (this.INIT_FIRE_NUM <= 4) {
                this.createFire();
                this.INIT_FIRE_NUM++;
            } else {
                for (let i = 0; i < this.INIT_FIRE_NUM; i++) {
                    if (fires[i].Y > this.dataStore.canvas.height) {
                        fires.splice(i, 1);
                        this.INIT_FIRE_NUM--;
                    }
                };
            }
            if (this.INIT_COIN_NUM <= 3) {
                this.createCoin();
                this.INIT_COIN_NUM++;
            } else {
                for (let i = 0; i < this.INIT_COIN_NUM; i++) {
                    if (coins[i].Y > this.dataStore.canvas.height) {
                        coins.splice(i, 1);
                        this.INIT_COIN_NUM--;
                    }
                }
            }
            this.dataStore.get('coins').forEach((value) => {
                value.draw();
            })
            this.dataStore.get('fires').forEach((value) => {
                value.draw();
            })

            this.dataStore.get('land').draw();
            this.dataStore.get('move').draw();
            this.dataStore.get('score').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.INIT_COIN_NUM = 0;
            this.INIT_FIRE_NUM = 0;
            this.dataStore.destroy();
            wx.triggerGC();
        }
    }
}