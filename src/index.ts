import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
import { createPlace } from './helpers'

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

canvasElement.addEventListener('mousedown',onMouseDown);
canvasElement.addEventListener('mouseup',onMouseUp);
canvasElement.addEventListener('mouseout',onMouseUp);
canvasElement.addEventListener('mousemove',onMouseMove);
canvasElement.addEventListener('mousewheel',onScroll,false);

let selecting: boolean = false;
let selectionStartPoint: PIXI.IPointData = null;
let selectionRect: PIXI.Graphics = new PIXI.Graphics();
app.stage.addChild(selectionRect);


let dragging: boolean = false;
let dragStartPoint: PIXI.IPointData = null;


function onMouseDown(e) {
    if(e.shiftKey) {
        onSelectionStart(e);
    } else {
        onDragStart(e)
    }
}

function onMouseUp(e) {
    onSelectionEnd(e);
    onDragEnd(e);
}

function onMouseMove(e) {
    if(selecting) {
        onSelectionMove(e);
    }
    if(dragging) {
        onDragMove(e);
    }
}

function onSelectionStart(e) {
    selectionStartPoint = new PIXI.Point(e.offsetX,e.offsetY);
    selecting = true;
}

function onSelectionEnd(e) {
    selecting = false;
    selectionRect.clear();
}

function onSelectionMove(e) {
    const rectX1 = Math.min(selectionStartPoint.x,e.offsetX);
    const rectY1 = Math.min(selectionStartPoint.y,e.offsetY);
    const rectX2 = Math.max(selectionStartPoint.x,e.offsetX);
    const rectY2 = Math.max(selectionStartPoint.y,e.offsetY);

    selectionRect
        .clear()
        .lineStyle(1, 0x83c7e3, 1)
        .beginFill(0x83c7e3, 0.25)
        .drawRect(rectX1, rectY1, rectX2 - rectX1, rectY2 - rectY1)
        .endFill();
}

function onDragStart(e) {
    dragStartPoint = new PIXI.Point(e.offsetX,e.offsetY);
    dragging = true;
}

function onDragEnd(e) {
    dragging = false;
}

function onDragMove(e) {
    const dragEndPoint: PIXI.Point = new PIXI.Point(e.offsetX,e.offsetY);
    const moveVector: PIXI.Point = dragEndPoint.subtract(dragStartPoint);
    hallContainer.position.copyFrom(hallContainer.position.add(moveVector));
    dragStartPoint = dragEndPoint.clone();
}

function onScroll(e) {
    e.preventDefault();
    zoom(e.deltaY, e.offsetX, e.offsetY);
}

function zoom(s,x,y) {
    const newScaleRatio = 1 - Math.sign(s)*Math.pow(Math.abs(s),1/3)/75;
    const oldScale: PIXI.Point = hallContainer.scale;
    const newScale: PIXI.Point = oldScale.multiplyScalar(newScaleRatio)

    const globalCursorPoint: PIXI.Point = new PIXI.Point(x, y);
    const oldLocalCursorPoint: PIXI.Point = globalCursorPoint.subtract(hallContainer.position);
    const newLocalCursorPoint: PIXI.Point = oldLocalCursorPoint.multiplyScalar(newScaleRatio);
    const newHallPosition: PIXI.Point = globalCursorPoint.subtract(newLocalCursorPoint);

    hallContainer.position.copyFrom(newHallPosition);
    hallContainer.scale.copyFrom(newScale);
}
