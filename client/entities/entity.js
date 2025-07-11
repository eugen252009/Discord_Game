import { drawRectangle } from "../utils/utils"


export class Entity {
    position;
    sprite;
    constructor(x = 50, y = 50, width = 100, height = 100, sprite) {
        this.position = { x, y, width, height };
        this.sprite = sprite;
    };

    draw(ctx) {
        drawRectangle(ctx, this.position, "red");
    };
    render() {

    };
}