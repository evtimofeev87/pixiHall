import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
import { createPlace } from './helpers'
import CanvasController from "./canvasController";

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

hallContainer.addChild( createPlace(50,50,80,80,6,'43'));
hallContainer.addChild( createPlace(200,50,80,80,6,'44'));
hallContainer.addChild( createPlace(50,200,80,80,6,'45'));
hallContainer.addChild( createPlace(200,200,80,80,6,'46'));

const canvasController = new CanvasController(app.stage, hallContainer);
canvasController.addListeners(canvasElement);




