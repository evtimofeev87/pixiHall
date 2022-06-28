import * as PIXI from "pixi.js";

export default class {

    selecting: boolean;
    selectionStartPoint: PIXI.IPointData;
    selectionRect: PIXI.Graphics;

    constructor(stage: PIXI.Container) {
        this.selecting = false;
        this.selectionStartPoint = null;
        this.selectionRect = new PIXI.Graphics();
        stage.addChild(this.selectionRect);
    }

    start(e: MouseEvent) {
        this.selectionStartPoint = new PIXI.Point(e.offsetX,e.offsetY);
        this.selecting = true;
    }

    end(e: MouseEvent) {
        this.selecting = false;
        this.selectionRect.clear();
    }

    move(e: MouseEvent) {
        if(!this.selecting) {
            return
        }

        const rectX1 = Math.min(this.selectionStartPoint.x,e.offsetX);
        const rectY1 = Math.min(this.selectionStartPoint.y,e.offsetY);
        const rectX2 = Math.max(this.selectionStartPoint.x,e.offsetX);
        const rectY2 = Math.max(this.selectionStartPoint.y,e.offsetY);

        this.selectionRect
            .clear()
            .lineStyle(1, 0x83c7e3, 1)
            .beginFill(0x83c7e3, 0.25)
            .drawRect(rectX1, rectY1, rectX2 - rectX1, rectY2 - rectY1)
            .endFill();
    }
}