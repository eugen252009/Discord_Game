import { Rectangle } from "./utils.mjs";
import { vectorToXY } from "./utils.mts"

export const PLAYERSIDES = {
    SIDE1: 1,
    SIDE2: 2,
    SIDE3: 3,
} as const;

export type PLAYERSIDE = (typeof PLAYERSIDES)[keyof typeof PLAYERSIDES];

export class Entity {
    position: Rectangle;
    id: number;
    constructor() {
        this.position = { x: 0, y: 0, width: 0, height: 0 };
    }
    addVel(angle: number, magnitude: number) {
        if (magnitude < 0) magnitude * -1;
        const { x, y } = vectorToXY(angle, magnitude > 1 ? 1 : magnitude);

        this.position.x += x;
        this.position.y += y;
    };
}