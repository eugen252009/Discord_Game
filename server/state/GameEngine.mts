import { Entity, PLAYERSIDE, PLAYERSIDES } from "./Entity.mts";
import { Mob } from "./Mob.mts"
import { Rectangle } from "./utils.mts";
import type { Match } from "../server.mts"

export class GameEngine {
    entities: Array<Entity> = [];
    map: Rectangle;
    match: Match;
    turn: PLAYERSIDE;

    constructor(match: Match) {
        this.turn = PLAYERSIDES.SIDE1;
        this.match = match;
        this.entities.push(new Mob(PLAYERSIDES.SIDE1))
        this.entities.push(new Mob(PLAYERSIDES.SIDE2))
        this.map = { x: 0, y: 0, width: 1000, height: 1000 };

        for (const player of match.player) {
            player.addEventListener("message", this.parse);
        }
    }

    parse(msg: { toString: () => string }) {
        const data = msg.toString();
        const json = JSON.parse(data);
        console.log(json);
        // if (json.playerSide == PLAYERSIDES.SIDE1) {
        //     this.render(json)
        //     return true;
        // } else {
        //     return false;
        // }
    }

    render() {

        // socket.on("message", (msg) => {
        //     const data = msg.toString()
        //     console.log("data", data)
        //     const { x, y, width, height } = JSON.parse(data)
        //     socket.send(JSON.stringify({ x: x + 1, y, width, height }));
        // })

        // id: number, angle: number, mag: number
        // const choosenOne = this.entities.at(id)
        // if (!choosenOne) return;
        // choosenOne.addVel(angle ?? 0, mag ?? 0);
        // for (const entity of this.entities) {
        //     if (id == entity.id) continue;
        //     // checkCollison(entity.position.getObj(),)
        // }
    }

    serialize() {
        return JSON.stringify({
            entities: this.entities,
            map: this.map,
        })
    }

}