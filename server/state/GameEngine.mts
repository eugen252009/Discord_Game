import { Entity, PLAYERSIDE, PLAYERSIDES } from "./Entity.mts";
import { Mob } from "./Mob.mts"
import { randomNum, Rectangle } from "./utils.mts";
import type { Match } from "../server.mts"
import { WebSocket as WsWebSocket } from "ws";



export class GameEngine {
    entities: Array<Entity> = [];
    entityID = -1;
    map: Rectangle;
    match: Match;
    turn: PLAYERSIDE;
    socket: Array<WsWebSocket> = [];

    constructor({ player1, player2 }: { player1: WsWebSocket, player2: WsWebSocket }) {
        this.socket.push(player1)
        this.socket.push(player2)
        this.turn = PLAYERSIDES.SIDE1;
        this.map = { x: 0, y: 0, width: 1000, height: 1000 };


        for (const _ of new Array(2)) {
            this.entities.push(new Mob(this.getNextEntityId(), PLAYERSIDES.SIDE1))
            this.entities.push(new Mob(this.getNextEntityId(), PLAYERSIDES.SIDE2))
        }
        for (const connection of this.socket)
            connection.on("message", (msg) => { console.log("msg from Client", msg) });

        this.start();
    }
    getNextEntityId() {
        return ++this.entityID;
    }

    parse(msg: { toString: () => string }) {
        const data = msg.toString();
        const json = JSON.parse(data);
        console.log(json)
        // console.log(json);
        // if (json.playerSide == PLAYERSIDES.SIDE1) {
        //     this.render(json)
        //     return true;
        // } else {
        //     return false;
        // }
    }

    render() {
        for (const entity of this.entities) {
            entity.addVel(randomNum(360), randomNum(20));
        }

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
        this.sendAll();
    }

    serialize() {
        return JSON.stringify({
            entities: this.entities,
            map: this.map,
        })
    }

    sendAll() {
        for (const player of this.socket) {
            if (player.OPEN !== 1) continue;
            player.send(`[${this.entities.join(",")}]`)
        }
        // socket.send(JSON.stringify({ msg: "Waiting for another Player!" }));

        // socket.on("message", (msg) => {
        //   const data = msg.toString()
        //   const { x, y, width, height } = JSON.parse(data)
        //   // console.log(socket, { x, y, width, height })
        //   // socket.send(JSON.stringify({ x: x + 1, y, width, height }));
        // })


        // socket.on('close', () => {
        //   console.log('Client disconnected');
        // });
    }
    start() {
        setInterval(() => {
            this.render();
        }, 1000);
    }
}