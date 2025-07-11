import { EventData } from "./Events.mts";
import { GameEngine } from "./state/GameEngine.mts"
import { WebSocketServer, WebSocket as WsWebSocket } from 'ws';

export type Match = { id: number, engine: GameEngine };
const playergroups: Array<WsWebSocket> = [];
const match: Array<Match> = [];


const server = new WebSocketServer({ port: 3001 });
let matches = 0;
server.on("connection", (socket, req) => {
  const ip = req.socket.remoteAddress;
  // console.log(ip)
  playergroups.push(socket)

})

setInterval(() => {
  if (playergroups.length >= 2) {
    if (playergroups.length < 2) return;
    let player1 = playergroups.pop()!;
    let player2 = playergroups.pop()!;
    match.push({ id: ++matches, engine: new GameEngine({ player1, player2 }) });
  }
}, 1000);




// console.log('WebSocket server listening on ws://localhost:3001');


// const inputs = [
//   { id: 0, x: 270, y: 20 },
//   { id: 1, x: 90, y: 20 },
//   { id: 0, x: 270, y: 20 },
//   { id: 1, x: 90, y: 20 },
//   { id: 0, x: 270, y: 20 },
//   { id: 1, x: 90, y: 20 },
//   { id: 0, x: 270, y: 20 },
//   { id: 1, x: 90, y: 20 },
// ];



// const game = new GameEngine();
// for (const { id, x, y } of inputs) {
//   game.render(id, x, y);
// }


// console.log(game.entities.at(0)?.position);
// console.log(game.entities.at(1)?.position);

// console.log(game.serialize());
