import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import { log } from 'console';

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.end("Hi there");
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        console.log(data, {isBinary: true});
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, () => {
  console.log(`${new Date()} Server is listening on port 8080`);
});