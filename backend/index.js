const WebSocket = require('ws');
const GameManager  = require('./game_module/gameManager');

const wss = new WebSocket.Server({ port: 3001 });

const gameManager = new GameManager()

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  gameManager.addUsers(ws)
 

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:3001');
