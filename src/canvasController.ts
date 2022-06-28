import PanController from "./panController";
import SelectionController from "./selectionController";
import ZoomController from "./zoomController"
import * as PIXI from "pixi.js";

export default class {

    selectionController: SelectionController;
    panController: PanController;
    zoomController: ZoomController;

    constructor(
        stage: PIXI.Container,
        hall: PIXI.Container
    ) {
        this.selectionController = new SelectionController(stage);
        this.panController = new PanController(hall);
        this.zoomController = new ZoomController(hall);
    }

    addListeners(canvas: HTMLCanvasElement) {
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        canvas.addEventListener('mouseout', this.onMouseUp.bind(this));
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        canvas.addEventListener('mousewheel', this.onScroll.bind(this));
    }

    onMouseDown(e: MouseEvent) {
        if(e.shiftKey) {
            this.selectionController.start(e);
        } else {
            this.panController.start(e)
        }
    }

    onMouseUp(e: MouseEvent) {
        this.selectionController.end(e);
        this.panController.end();
    }

    onMouseMove(e: MouseEvent) {
        this.selectionController.move(e);
        this.panController.move(e);
    }

    onScroll(e: WheelEvent) {
        e.preventDefault();
        this.zoomController.zoom(e);
    }
}