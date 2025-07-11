import { Entity } from "./entity";

class Collider extends Entity {
    constructor() {
        super();
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
    };

    render(btns) {
        if (btns["w"])
            this.position.y -= 1;
        if (btns["s"])
            this.position.y += 1;
        if (btns["a"])
            this.position.x -= 1;
        if (btns["d"])
            this.position.x += 1;
    };
}


const Player = new Collider();
export default Player;