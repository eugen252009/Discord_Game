import {
    Entity,
    PLAYERSIDE
} from "./Entity.mts";
import { randomNum, Rectangle } from "./utils.mts"


export class Mob extends Entity {
    SIDE: PLAYERSIDE;
    constructor(id: number, playerSide: PLAYERSIDE) {
        super(id, playerSide);
    }

    addVel(angle: number, magnitude: number): void {
        // console.log(angle, magnitude * 5);
        super.addVel(angle, magnitude * 10);
    }
}