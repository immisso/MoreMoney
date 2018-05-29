import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";



export class BackGround extends Sprite {

    constructor() {
        const RandomNum = 1 + Math.floor(Math.random() * 4);
        const image = Sprite.getImage('background' + RandomNum);
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height
        );
        // this.index = RandomNum;
        // this.image = image;
    }
}