export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
};

export function vectorToXY(angleDeg: number, magnitude: number): { x: number, y: number } {
    const angleRad = angleDeg * (Math.PI / 180); // convert degrees to radians
    const x = Math.cos(angleRad) * magnitude;
    const y = Math.sin(angleRad) * magnitude;

    return { x: roundZero(x), y: roundZero(y) };
}
function roundZero(n: number, eps = 1e-10) {
    return Math.abs(n) < eps ? 0 : n;
}

export function checkCollison(rec1: Rectangle, rec2: Rectangle): boolean {
    let collision = false;

    if ((rec1.x < (rec2.x + rec2.width) && (rec1.x + rec1.width) > rec2.x) &&
        (rec1.y < (rec2.y + rec2.height) && (rec1.y + rec1.height) > rec2.y))
        collision = true;

    return collision;
}
export function randomNum(max: number = 800, min: number = 0): number {
    return min + (Math.random() * max);
}
