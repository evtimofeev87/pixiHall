import * as PIXI from 'pixi.js';

export default class Place {
    position: PIXI.Point
    text: string;

    placeGraphics: PIXI.Graphics;
    placeText: PIXI.Text;
    placeSprite: PIXI.Sprite;

    static width: number = 16;
    static height: number = 16;
    static radius: number = 6;

    constructor(position: PIXI.IPointData, text: string) {
        this.position = new PIXI.Point(position.x,position.y);
        this.text = text;
    }

    destroy() {
        this.placeSprite && this.placeSprite.destroy();
        // this.placeGraphics.destroy();
        this.placeText && this.placeText.destroy();
    }

    draw(globalContainer: PIXI.Container, texture: PIXI.Texture) {

        this.placeSprite = this.createSprite(texture);
        globalContainer.addChild(this.placeSprite);

        // this.placeContainer.addChild(this.placeSprite);

        // this.placeGraphics = this.createGraphics()
        // this.placeContainer.addChild(this.placeGraphics);

        this.placeText = this.createText();
        globalContainer.addChild(this.placeText);

        // this.placeContainer.interactive = true;
        // this.placeContainer.on('pointerdown', () => console.log(this.text));



    }

    createGraphics() {
        const graphics = new PIXI.Graphics();
        graphics
            .lineStyle(2, 0xb7d7a8, 1)
            .beginFill(0xb7d7a8, 1)
            // .drawRoundedRect(
            //     -this.width/2,
            //     -this.height/2,
            //     this.width,
            //     this.height,
            //     this.radius)
            .drawRect(
                -Place.width/2,
                -Place.height/2,
                Place.width,
                Place.height)
            .endFill();

        return graphics;
    }

    createSprite(texture: PIXI.Texture) {
        const sprite = new PIXI.Sprite(texture)
        sprite.position.copyFrom(this.position);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.width = Place.width;
        sprite.height = Place.height;
        return sprite;
    }

    createText() {
        const style = new PIXI.TextStyle({
            fontSize: 10
        });
        const basicText = new PIXI.Text(this.text,style);
        basicText.x = this.position.x;
        basicText.y = this.position.y;
        // basicText.width = 8;
        // basicText.height = 10;
        basicText.anchor.x = 0.5;
        basicText.anchor.y = 0.5;

        return basicText;
    }

    static createTexture(color: number, renderer: PIXI.AbstractRenderer) {

        const graphics = new PIXI.Graphics();

        graphics
            .lineStyle(2, 0xb7d7a8)
            .beginFill(0xb7d7a8)
            .drawRoundedRect(
                0,
                0,
                Place.width*4,
                Place.height*4,
                Place.radius*4)
            .endFill();

        // graphics
        //     .beginFill(0xb7d7a8)
        //     .drawRect(
        //         -1,
        //         -1,
        //         1,
        //         1)
        //     .endFill();

        return renderer.generateTexture(graphics);
    }

    setVisibility(visibility: boolean) {
        if(this.placeSprite) {
            this.placeSprite.visible = visibility;
        }

        if(this.placeText) {
            this.placeText.visible = visibility;
        }
    }

    setTextVisibility(visibility: boolean) {
        if(this.placeText) {
            this.placeText.visible = visibility;
        }
    }
}