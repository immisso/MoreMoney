import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Fire extends Sprite {
    constructor(X) {
        console.log("这里是火，调用了几次")
        const image = Sprite.getImage('fire');
        super(
            image,
            0, 0,
            38, image.height,
            100, -DataStore.getInstance().canvas.height,
            38, image.height
        );

        //火的10种状态
        this.clipsX = [0, 38, 76, 114, 152, 190, 228, 266, 304, 342];
        this.index = 0;
        this.count = 0;
        this.time = 0;
        this.Y = 0;
        this.X = X;
        this.g = 10 + 20 * Math.random()
    };
    draw() {
        //fire的切换速度
        const fireSpeed = 0.2;
        this.count = this.count + fireSpeed;
        if (this.index > 8) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);
        this.clipX = this.clipsX[this.index];
        const g = 0.98 / this.g;
        const offsetY = 0.1 + (g * this.time * this.time) / 2;
        this.Y = offsetY;
        this.time++;
        super.draw(this.img,
            this.clipX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.X,
            offsetY,
            this.width,
            this.height
        )

    }
}