import PanController from "./panController";
import SelectionController from "./selectionController";
import ZoomController from "./zoomController"
import { throttleAnimation } from "./helpers";
import placesController from "./placesController";

export default class {

    selectionController: SelectionController;
    panController: PanController;
    zoomController: ZoomController;
    isClick: boolean = false;

    constructor({
        selectionController,
        panController,
        zoomController
    }: {
        selectionController: SelectionController,
        panController: PanController,
        zoomController: ZoomController
    }) {
        this.selectionController = selectionController;
        this.panController = panController;
        this.zoomController = zoomController;
    }

    addListeners(canvas: HTMLCanvasElement) {
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        canvas.addEventListener('mouseout', this.onMouseUp.bind(this));
        canvas.addEventListener('mousemove', throttleAnimation(this.onMouseMove.bind(this),30));
        canvas.addEventListener('mousewheel', throttleAnimation(this.onScroll.bind(this),30));
    }

    onMouseDown(e: MouseEvent) {
        console.log('down');
        this.isClick = true;
        if(e.shiftKey) {
            this.selectionController.start(e);
        } else {
            this.panController.start(e)
        }
    }

    onMouseUp(e: MouseEvent) {
        if(this.isClick){
            this.selectionController.selectObject(e);
        }
        this.selectionController.end(e);
        this.panController.end();
    }

    onMouseMove(e: MouseEvent) {
        this.isClick = false;
        console.log('move');
        this.selectionController.move(e);
        this.panController.move(e);
    }

    onScroll(e: WheelEvent) {
        e.preventDefault();
        this.zoomController.zoom(e);
    }

}