import * as PIXI from "pixi.js";
import PlacesController from "./placesController";

export default class {

    hall: PIXI.Container;
    placesController: PlacesController

    constructor(hall: PIXI.Container, placesController: PlacesController) {
        this.hall = hall;
        this.placesController = placesController;
    }

    zoom(e: WheelEvent) {
        const { deltaY: s, offsetX: x, offsetY: y } = e;

        // const newScaleRatio = 1 - Math.sign(s)*Math.pow(Math.abs(s),1/3)/75;
        const newScaleRatio = 1 - Math.sign(s)*Math.pow(Math.abs(s),1/2)/50;
        const oldScale: PIXI.Point = this.hall.scale;
        const newScale: PIXI.Point = oldScale.multiplyScalar(newScaleRatio)

        const globalCursorPoint: PIXI.Point = new PIXI.Point(x, y);
        const oldLocalCursorPoint: PIXI.Point = globalCursorPoint.subtract(this.hall.position);
        const newLocalCursorPoint: PIXI.Point = oldLocalCursorPoint.multiplyScalar(newScaleRatio);
        const newHallPosition: PIXI.Point = globalCursorPoint.subtract(newLocalCursorPoint);

        this.hall.position.copyFrom(newHallPosition);
        this.hall.scale.copyFrom(newScale);

        // this.placesController.optimize();
    }
}