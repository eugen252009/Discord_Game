import { GameEngine } from "./state/GameEngine.mts"
import { WebSocketServer, WebSocket as WsWebSocket } from 'ws';

export type Match = { id: number, player: Array<WsWebSocket> };

const playergroups: Array<WsWebSocket> = [];
const match: Array<Match> = [];

const server = new WebSocketServer({ port: 3001 });
let matches = 0;
server.on("connection", (socket) => {
  console.log("Client connected");
  playergroups.push(socket)
  socket.send("Waiting for another Player!");

  socket.on("message", (msg) => {
    const data = msg.toString()
    // console.log("data", data)
    const { x, y, width, height } = JSON.parse(data)
    socket.send(JSON.stringify({ x: x + 1, y, width, height }));
  })


  socket.on('close', () => {
    console.log('Client disconnected');
  });
})

setInterval(() => {
  if (playergroups.length >= 2) {
    if (playergroups.length < 2) return;
    let player1 = playergroups.pop()!;
    let player2 = playergroups.pop()!;
    match.push({ id: ++matches, player: [player1, player2] });
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
