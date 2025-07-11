import { vectorToXY, Rectangle, randomNum } from "./utils.mts"

export const PLAYERSIDES = {
    SIDE1: 1,
    SIDE2: 2,
    SIDE3: 3,
} as const;

export type PLAYERSIDE = (typeof PLAYERSIDES)[keyof typeof PLAYERSIDES];

export class Entity {
    position: Rectangle;
    id: number;
    side: PLAYERSIDE;

    constructor(id: number, playerSide: PLAYERSIDE) {
        this.id = id;
        this.side = playerSide;
        this.position = { x: randomNum(1000), y: randomNum(800), width: 50, height: 50 };
    }
    addVel(angle: number = randomNum(100), magnitude: number = randomNum(20)) {
        if (magnitude < 0) magnitude * -1;
        const { x, y } = vectorToXY(angle, magnitude > 1 ? 1 : magnitude);

        this.position.x += x;
        this.position.y += y;
    };
    toString() {
        return JSON.stringify({ id: this.id, position: this.position, side: this.side });
    }
}