import './style.css'
import { Engine } from "./engine/engine.js"
import { defaultMovementType, Entity } from './entities/entity.js';
import { resizeCanvasToWindow } from './utils/utils.js';

function customize(engine) {
  const player1 = new Entity(100, 100, 100, 100);
  player1.render = defaultMovementType.keyboardMovement(1);
  player1.serialize()
  engine.addEntity(player1);
}
try {
  document.querySelector('#app').innerHTML = `<canvas id="gamecanvas" width="100%" height="100%"></canvas>`;


  const canvas = document.getElementById("gamecanvas");
  if (!canvas) throw new Error("Konnte Canavas nicht finden!");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Konnte Context nicht abrufen. Ist das Canvas initzialisiert?");
  resizeCanvasToWindow(canvas);

  let engine = new Engine(canvas, ctx, canvas.clientWidth, canvas.clientHeight);
  window.engine = engine;
  customize(engine);



  engine.start()
} catch (error) {
  console.error(error);
}





