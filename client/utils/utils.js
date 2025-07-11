export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;

export function checkCollison(rec1, rec2) {
    let collision = false;

    if ((rec1.x < (rec2.x + rec2.width) && (rec1.x + rec1.width) > rec2.x) &&
        (rec1.y < (rec2.y + rec2.height) && (rec1.y + rec1.height) > rec2.y))
        collision = true;

    return collision;
}

export function randomNum(max = 800, min = 0) {
    return min + (Math.random() * max);
}

export function drawRectangle(ctx, rec, style = "blue") {
    ctx.fillStyle = style;
    ctx.fillRect(rec.x, rec.y, rec.width, rec.height);
}
export function resizeCanvasToWindow(canvas) {
    const dpr = window.devicePixelRatio || 1;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}