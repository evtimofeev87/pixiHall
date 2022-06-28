import * as PIXI from 'pixi.js';

export const createPlace = (
    x:number,
    y:number,
    width:number,
    height:number,
    radius:number,
    text:string
) : PIXI.Container => {

    const placeContainer = new PIXI.Container();
    placeContainer.x = x;
    placeContainer.y = y;

    const graphics = new PIXI.Graphics();
    graphics
        .lineStyle(2, 0xFF00FF, 1)
        .beginFill(0x650A5A, 0.25)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill();

    placeContainer.addChild(graphics);

    const basicText = new PIXI.Text(text);
    basicText.x = width/2;
    basicText.y = height/2;
    basicText.anchor.x = 0.5;
    basicText.anchor.y = 0.5;

    placeContainer.addChild(basicText);

    placeContainer.interactive = true;
    placeContainer.on('pointerdown', () => console.log(text));

    return placeContainer;
}