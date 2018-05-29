import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Coin extends Sprite {
    constructor(X) {
        const image = Sprite.getImage('coin');
        //53=>424;53
        super(image,
            0, 0,
            33, image.height,
            0, -DataStore.getInstance().canvas.height,
            33, image.height
        );
        //金币的7种状态
        this.clipsX = [0, 33, 66, 99, 132, 165, 198, 231];

        // this.coinStatus = [0, 1, 2, 3, 4, 5, 6];
        this.index = 0;
        this.count = 0;
        this.time = 0;
        this.Y = 0;
        this.X = X;
        this.g = 10 + 20 * Math.random()
    }

    draw() {
        //金币旋转的速度;
        const rotateSpeed = 0.4;
        this.count = this.count + rotateSpeed;
        if (this.index > 6) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);
        // this.img = Sprite.getImage('coin' + this.index);
        this.clipX = this.clipsX[this.index];
        //模拟重力加速度
        const g = 0.98 / this.g;
        //金币下落
        const offsetY = 0.1 + (g * this.time * this.time) / 2;
        this.Y = offsetY;
        this.time++;
        super.draw(this.img,
            this.clipX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.X,
            this.Y,
            this.width,
            this.height
        )
    }
}