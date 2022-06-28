import * as PIXI from "pixi.js";

export default class {

    dragging: boolean;
    dragStartPoint: PIXI.IPointData;
    hall: PIXI.Container;

    constructor(hall: PIXI.Container) {
        this.dragging = false;
        this.dragStartPoint = null;
        this.hall = hall;
    }


    start(e: MouseEvent) {
        this.dragStartPoint = new PIXI.Point(e.offsetX,e.offsetY);
        this.dragging = true;
    }

    end() {
        this.dragging = false;
    }

    move(e: MouseEvent) {
        if(!this.dragging) {
            return
        }

        const dragEndPoint: PIXI.Point = new PIXI.Point(e.offsetX,e.offsetY);
        const moveVector: PIXI.Point = dragEndPoint.subtract(this.dragStartPoint);
        this.hall.position.copyFrom(this.hall.position.add(moveVector));
        this.dragStartPoint = dragEndPoint.clone();
    }

}