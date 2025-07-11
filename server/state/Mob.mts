import { Rectangle } from "../../client/utils/utils";
import { Entity, PLAYERSIDE } from "./Entity.mts";



export class Mob extends Entity {
    SIDE: PLAYERSIDE;
    constructor(playerSide: PLAYERSIDE) {
        super();
        this.SIDE = playerSide;
        this.position = new Rectangle(Math.random() * 200, Math.random() * 200, 50, 50);
    }


}