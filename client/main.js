import './style.css'
import { Engine } from "./engine/engine.js"
import { Entity } from './entities/entity.js';
import { randomNum } from './utils/utils.js';


document.querySelector('#app').innerHTML = `<canvas id="gamecanvas" width="100%" height="100%"></canvas>`;
function init() {
  const canvas = document.getElementById("gamecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  resizeCanvasToWindow(canvas);
  window.engine = new Engine(canvas, ctx, canvas.clientWidth, canvas.clientHeight);
  window.addEventListener("keydown", (event) => { window.engine.keyPressed(event.key) })
  window.addEventListener("keyup", (event) => { window.engine.keyReleased(event.key) })
  window.addEventListener('resize', () => resizeCanvasToWindow(window.engine.canvas));
  window.addEventListener("mousedown", ({ x, y }) => { console.log({ x, y }) })
  window.addEventListener("mouseup", ({ x, y }) => { console.log({ x, y }) })
}
function main() {
  window.requestAnimationFrame(main);
  window.engine.render();
  window.engine.draw();
}

function resizeCanvasToWindow(canvas) {
  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}


init();
main();
let i = 0;
const intervalid = setInterval(() => {
  window.engine.addEntity(new Entity(randomNum(800), randomNum(600)))
  if (++i > 3) clearInterval(intervalid);
}, 1000);
