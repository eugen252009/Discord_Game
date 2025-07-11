import { Entity } from "../entities/entity";
import { SECONDS } from "../utils/utils";

const msgheight = 48;


export class Engine {
    msg = [];
    client;
    pressedKeys = [];
    entities = [];
    lastMouseclick = [];
    constructor(canvas, ctx, width, height) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.connectToServer();
    }
    createMsg(msg) {
        this.msg.push({
            timestamp: Date.now() + (SECONDS * 5),
            msg,
        })
    }
    connectToServer() {
        this.client = new WebSocket("ws://localhost:3001");
        this.client.addEventListener("open", (event) => { });
        this.client.addEventListener("close", () => {
            this.client = new WebSocket("ws://localhost:3001");
        });

        this.client.addEventListener("message", ({ data }) => {
            // this.drawText(data)

            //this tests the Messaging System
            this.createMsg(data)
            setTimeout(() => {

                this.createMsg(data)
                setTimeout(() =>
                    this.createMsg(data)
                    , 1000);
            }
                , 1000);

        })

    }
    keyPressed(keycode) {
        this.pressedKeys[keycode] = true;
    }
    keyReleased(keycode) {
        this.pressedKeys[keycode] = false;
    }

    draw() {
        this.ctx.reset()
        this.ctx.save()
        for (const entitiy of this.entities) {
            entitiy.draw(this.ctx);
        }
        this.ctx.restore()
        //Draw all Msg
        let id = 0;
        for (let index = 0; index < this.msg.length; index++) {
            const message = this.msg[index];
            //Draw Msg if its newer then 30 seconds
            if (message.timestamp > Date.now())
                this.drawText(message.msg, 30, 48 * ++id)
        }
        this.msg = this.msg.filter(x => x.timestamp > Date.now())
    }
    render() { }
    drawText(msg = "", x = 30, y = 30) {
        this.ctx.save()
        this.ctx.fillStyle = "white";
        this.ctx.font = `${msgheight}px serif`;
        this.ctx.fillText(msg, x, y)
        this.ctx.restore()
    }


    addEntity(e) { this.entities.push(e) }
}


