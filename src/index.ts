import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
import CanvasController from "./canvasController";
import PanController from "./panController";
import SelectionController from "./selectionController";
import ZoomController from "./zoomController"
import PlacesController from "./placesController";

const canvasElement = <HTMLCanvasElement> document.getElementById('hall');

const canvasDOMRect = <DOMRect> canvasElement.getBoundingClientRect();

const app = new PIXI.Application({
    width: canvasDOMRect.width,
    height: canvasDOMRect.height,
    view: canvasElement,
    backgroundColor: 0xf1f3f4,
    resolution: 1,
});

const hallContainer = new PIXI.Container();

app.stage.addChild(hallContainer);

const placesController = new PlacesController(hallContainer,app.renderer,app);

const selectionController = new SelectionController(app.stage, hallContainer, placesController);
const panController = new PanController(hallContainer, placesController);
const zoomController = new ZoomController(hallContainer, placesController);



const canvasController = new CanvasController({
    selectionController,
    panController,
    zoomController
});
canvasController.addListeners(canvasElement);



const onBuildButtonClick = () => {
    const placeNumber = <HTMLInputElement> document.getElementById('places_number');
    placesController.drawPlaces(Number(placeNumber.value));
}

document
    .getElementById('build_button')
    .addEventListener('click', onBuildButtonClick)






