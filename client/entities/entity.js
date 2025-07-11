import { checkCollison, drawRectangle } from "../utils/utils"



/**
 * 
 * @param {Number} magnitude how Strong the movement is. 
 * 
 */

function mouseMovement(magnitude = 1) {
    return function ({ engine: { mouse: { diff: { x, y, dx, dy } } } }) {
        console.log(
            this.position,
            { x, y, width: 1, height: 1 },
            checkCollison(this.position, { x: x - dx, y: y - dy, width: 1, height: 1 }))
        // window.engine.client.send(this);
        // console.log(x, y, dx, dy)
        // if (checkCollison(this.position, { x, y, width: 1, width: 1 }))
        //     console.log("COLLISION", { x, y, dx, dy })
        // // console.log("MouseMovement", { dx, dy }, keyboard)
    }
}

function keyboardMovement(magnitude = 1) {
    return function ({ engine: { keyboard } }) {
        if (keyboard["e"])
            console.log("switch User")
        if (keyboard["w"])
            this.position.y -= magnitude;
        if (keyboard["s"])
            this.position.y += magnitude;
        if (keyboard["a"])
            this.position.x -= magnitude;
        if (keyboard["d"])
            this.position.x += magnitude;

        engine.sendToServer(this);
    }
}

export class Entity {
    position;
    sprite;
    side;
    id;

    constructor(id, position = { x: 50, y: 50, width: 100, height: 100 }, side) {
        this.id = id;
        this.position = position;
        // this.sprite = sprite;
        this.side = side;
    };

    draw(ctx) {
        if (this.side === 1)
            drawRectangle(ctx, this.position, "blue");
        if (this.side === 2)
            drawRectangle(ctx, this.position, "red");
        if (this.side === 3)
            drawRectangle(ctx, this.position, "green");


    };
    render() { };
    serialize() { };
    setPosition({ x, y, width, height }) {
        this.position.x = x;
        this.position.y = y;
        this.position.width = width;
        this.position.height = height;
        return this;
    }
    setID(id) { this.id = id; return this; };
    build() {
        if (!id) return
    };

    [toString] = function (x) {
        console.log(this, x)
    }
}


export const defaultMovementType = {
    keyboardMovement,
    mouseMovement
}