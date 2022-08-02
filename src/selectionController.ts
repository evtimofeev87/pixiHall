import * as PIXI from "pixi.js";
import PlacesController from "./placesController";

export default class {

    hall: PIXI.Container;
    selecting: boolean;
    selectionStartPoint: PIXI.IPointData;
    selectionRectGraphics: PIXI.Graphics;
    selectionRect: PIXI.Rectangle = new PIXI.Rectangle(0,0,0,0);
    placesController: PlacesController;

    constructor(stage: PIXI.Container, hall: PIXI.Container, placesController: PlacesController) {
        this.hall = hall;
        this.selecting = false;
        this.selectionStartPoint = null;
        this.selectionRectGraphics = new PIXI.Graphics();
        stage.addChild(this.selectionRectGraphics);
        this.placesController = placesController;
    }

    start(e: MouseEvent) {
        this.selectionStartPoint = new PIXI.Point(e.offsetX,e.offsetY);
        this.selecting = true;
    }

    end(e: MouseEvent) {
        this.selecting = false;
        this.selectionRectGraphics.clear();

        const localSelectionRect = new PIXI.Rectangle(
            (this.selectionRect.x - this.hall.x) / this.hall.scale.x,
            (this.selectionRect.y - this.hall.y) / this.hall.scale.y,
            this.selectionRect.width / this.hall.scale.x,
            this.selectionRect.height / this.hall.scale.y
        )

        this.placesController.selectPlaces(localSelectionRect);

        this.selectionRect.copyFrom(PIXI.Rectangle.EMPTY);


    }

    move(e: MouseEvent) {
        if(!this.selecting) {
            return
        }

        const rectX1 = Math.min(this.selectionStartPoint.x,e.offsetX);
        const rectY1 = Math.min(this.selectionStartPoint.y,e.offsetY);
        const rectX2 = Math.max(this.selectionStartPoint.x,e.offsetX);
        const rectY2 = Math.max(this.selectionStartPoint.y,e.offsetY);



        this.selectionRect.x = rectX1;
        this.selectionRect.y = rectY1;
        this.selectionRect.width = rectX2 - rectX1;
        this.selectionRect.height = rectY2 - rectY1;

        this.selectionRectGraphics
            .clear()
            .lineStyle(1, 0x83c7e3, 1)
            .beginFill(0x83c7e3, 0.25)
            .drawRect(
                this.selectionRect.x,
                this.selectionRect.y,
                this.selectionRect.width,
                this.selectionRect.height
            )
            .endFill();
    }

    selectObject(e: MouseEvent) {
        const localPosition = new PIXI.Rectangle(
            (e.offsetX - this.hall.x) / this.hall.scale.x,
            (e.offsetY - this.hall.y) / this.hall.scale.y,
        )

        this.placesController.selectPlace(localPosition);
    }
}