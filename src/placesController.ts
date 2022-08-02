import * as PIXI from 'pixi.js';
import Place from './place';

export default class {
    container: PIXI.Container;
    placesArray: Place[] = [];
    texture: PIXI.Texture;
    renderer: PIXI.AbstractRenderer;
    app: PIXI.Application

    graphics: PIXI.Graphics = new PIXI.Graphics();
    selectedGraphics: PIXI.Graphics = new PIXI.Graphics();

    constructor(container: PIXI.Container,renderer: PIXI.AbstractRenderer, app: PIXI.Application) {
        this.container = container;
        this.renderer = renderer;
        this.app = app;
    }

    drawPlaces(count: number) {
        console.time("drawPlaces");
        this.destroyExistedPlaces();
        this.texture = Place.createTexture(0xb7d7a8, this.renderer);


        const squareSide = Math.ceil(Math.pow(count,1/2));
        const horizontalGap = 20;
        const verticalGap = 20;
        let horizontalCursor = 0;
        let verticalCursor = 0;
        let placeCount = 1;
        for(let row = 1; row <= squareSide && count > 0; row++) {
            for(let column = 1; column <= squareSide && count > 0; column++, count--) {
                const placeText = String(placeCount % 10)
                const place = new Place({x: horizontalCursor,y: verticalCursor},placeText);
                place.addGraphics(this.graphics,0xb7d7a8);
                this.placesArray.push(place);

                placeCount++;
                horizontalCursor += horizontalGap;
            }
            verticalCursor += verticalGap;
            horizontalCursor = 0;
        }

        this.container.addChild(this.graphics);


        // this.optimize();
        console.timeEnd("drawPlaces");
    }

    destroyExistedPlaces() {
        this.graphics.clear();
        this.selectedGraphics.clear();
        this.placesArray = [];

    }

    optimize() {

        let {width, height} = Place;
        const scaleRatio = this.container.scale.x;
        width *= scaleRatio;
        height *=  scaleRatio;
        const screenMinX = this.app.screen.x - width/2;
        const screenMinY = this.app.screen.y - height/2;
        const screenMaxX = this.app.screen.width + width/2;
        const screenMaxY =this.app.screen.height + height/2;
        for(let i = 0; i < this.placesArray.length; i++) {
            const globalPosition = this.placesArray[i].position.multiplyScalar(scaleRatio).add(this.container.position);
            if(
                globalPosition.x < screenMinX ||
                globalPosition.x > screenMaxX ||
                globalPosition.y < screenMinY ||
                globalPosition.y > screenMaxY
            ) {
                this.placesArray[i].setVisibility(false);
            } else {
                this.placesArray[i].setVisibility(true);
                this.placesArray[i].setTextVisibility(height > 10);
            }



        }


    }

    selectPlaces(selectionRect: PIXI.Rectangle) {
        this.selectedGraphics.clear();
        const placesArray = this.placesArray;
        const arLength = this.placesArray.length;

        const totalSelectinRect = new PIXI.Rectangle(
            selectionRect.x + Place.width/2,
            selectionRect.y + Place.height/2,
            selectionRect.width - Place.width,
            selectionRect.height  - Place.height
        )

        let selectedPlaces = [];
        let alreadySelected = 0;

        for(let i = 0; i < arLength; i++) {
            const place = this.placesArray[i];

            const placeIsInside = totalSelectinRect.contains(
                place.position.x,
                place.position.y
            );
            if(placeIsInside) {
                selectedPlaces.push(place);
                if(place.selected) {
                    alreadySelected++;
                }
            }

        }
        let selectedMark = true;
        if(selectedPlaces.length === alreadySelected) {
            selectedMark = false;
        }

        for(let i = 0; i < selectedPlaces.length ; i++){
            selectedPlaces[i].selected = selectedMark;
        }

        for(let i = 0; i < arLength ; i++){

            if(this.placesArray[i].selected){
                this.placesArray[i].addGraphics(this.selectedGraphics,0xEF9A9A);
            }
        }

        this.container.addChild(this.selectedGraphics);
    }

    selectPlace(position: PIXI.IPointData) {

    }

}