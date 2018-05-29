import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 移动者

export class Move extends Sprite {
    constructor() {

        const image = Sprite.getImage('mover');
        // this.image = image;
        //54=>39;
        const landimage = Sprite.getImage('land');
        super(image,
            0, 0,
            54, image.height,
            DataStore.getInstance().canvas.width / 2 - 17, DataStore.getInstance().canvas.height - landimage.height - 25,
            54, 39);

        //运动者的初始位置 
        // this.image = image;

        this.moverX = DataStore.getInstance().canvas.width / 2 - 17;
        this.moverY = DataStore.getInstance().canvas.height - landimage.height - 38;
        // this.moverX = 0;

        this.clipsX = [0, 54];
        this.clipsY = [0, 0];
        this.direction = 'left';
        // const moverX = 0;
        // const moverY = window.innerHeight - 50;
    };
    draw() {
        if (this.moverX <= -5) {
            this.moverX = -5
        } else if (this.moverX > DataStore.getInstance().canvas.width - 54) {
            this.moverX = DataStore.getInstance().canvas.width - 54;
        }
        if (this.dataStore.direction == 'left') {
            this.clipX = this.clipsX[0];
        } else if (this.dataStore.direction == 'right') {
            this.clipX = this.clipsX[1];
        }
        super.draw(this.img,
            this.clipX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.moverX,
            this.moverY,
            this.width,
            this.height
        );
    }
}