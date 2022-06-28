import * as PIXI from "pixi.js";

export default class {

    hall: PIXI.Container;

    constructor(hall) {
        this.hall = hall;
    }

    zoom(e: WheelEvent) {
        const { deltaY: s, offsetX: x, offsetY: y } = e;

        const newScaleRatio = 1 - Math.sign(s)*Math.pow(Math.abs(s),1/3)/75;
        const oldScale: PIXI.Point = this.hall.scale;
        const newScale: PIXI.Point = oldScale.multiplyScalar(newScaleRatio)

        const globalCursorPoint: PIXI.Point = new PIXI.Point(x, y);
        const oldLocalCursorPoint: PIXI.Point = globalCursorPoint.subtract(this.hall.position);
        const newLocalCursorPoint: PIXI.Point = oldLocalCursorPoint.multiplyScalar(newScaleRatio);
        const newHallPosition: PIXI.Point = globalCursorPoint.subtract(newLocalCursorPoint);

        this.hall.position.copyFrom(newHallPosition);
        this.hall.scale.copyFrom(newScale);
    }
}