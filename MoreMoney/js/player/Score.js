//计分器
import { DataStore } from "../base/DataStore.js";
export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = false;
    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width / 18,
            DataStore.getInstance().canvas.height / 18,
            1000
        )
    }
}