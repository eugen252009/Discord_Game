import { Entity } from "../entities/entity";
import { resizeCanvasToWindow, SECONDS } from "../utils/utils";


const msgheight = 48;

/**
 * @class Engine
 * @function createMsg Creates a Message for the User.
 * @function getMouseClick Get The last Mouseclick.
 * @function getMouseDiff Gets the distance between the click and the release of the Mouse .
 * @function draw The Draw Function of the Engine. Only Replace it if you know what you do!
 * @function render Replace this Function if you want some extra rendering of some Obj before drawing.
 * @function addEntity Adds a Entity to the Game which follows the normal Control-Flow.
 * @function start starts the Engine.
 * @param {} keyboard this is an Object which represents all keys which are pressed
 * @param {} mouse this is an Object which represents all mouse clicks
 */

export class Engine {
    msg = [];
    client;
    keyboard = {};
    entities = [];
    mouse = {
        first: { x: 0, y: 0 },
        last: { x: 0, y: 0 },
        diff: { x: 0, y: 0 },
    };

    constructor(canvas, ctx, width, height) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.addEventListeners();
        this.connectToServer();
    }
    addEventListeners() {
        window.addEventListener("keydown", (event) => { window.engine.keyPressed(event.key) })
        window.addEventListener("keyup", (event) => { window.engine.keyReleased(event.key) })
        window.addEventListener('resize', () => resizeCanvasToWindow(window.engine.canvas));
        window.addEventListener("mousedown", ({ x, y }) => this.mouseclick({ x, y, click: true }))
        window.addEventListener("mouseup", ({ x, y }) => this.mouseclick({ x, y, click: false }))
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
            //this tests the Messaging System
            this.createMsg(data);
        })
    }

    mouseclick({ x, y, click }) {
        if (click) {
            this.mouse.first = { x, y };
            this.isExausted = false;
        }
        else {
            this.mouse.first = { x, y };
            this.isExausted = false;
        }
        this.mouse.diff = this.getMouseDiff()
    }

    getMouseDiff() {
        this.mouse.isExausted = true;
        return {
            dx: Math.abs(this.mouse.first.x - this.mouse.last.x),
            dy: Math.abs(this.mouse.first.y - this.mouse.last.y),
            x: this.mouse.last.x,
            y: this.mouse.last.y,
        }
    }
    getMouseClick() {
        return this.mouse;
    }
    keyPressed(keycode) {
        this.keyboard[keycode] = true;
    }
    keyReleased(keycode) {
        this.keyboard[keycode] = false;
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
    render() {
        for (const e of this.entities) {
            e.render({ engine: this });
        }
        // this.client.send(JSON.stringify(this.entities))
    }
    drawText(msg = "", x = 30, y = 30) {
        this.ctx.save()
        this.ctx.fillStyle = "white";
        this.ctx.font = `${msgheight}px serif`;
        this.ctx.fillText(msg, x, y)
        this.ctx.restore()
    }


    addEntity(e) {
        if (!(e instanceof Entity)) {
            const err = new Error().stack;
            console.error("This Obj is not an Entity!\n", err)
            return
        }
        // if (e instanceof == Entity)
        this.entities.push(e)
    }
    start() {
        this.gameLoop();
    }
    gameLoop() {
        window.requestAnimationFrame(window.engine.gameLoop);
        window.engine.render();
        window.engine.draw();
    }
}


