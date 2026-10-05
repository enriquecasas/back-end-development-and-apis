import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile("./public/index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading page");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

    return;
  }

  if (req.url === "/script.js") {
    fs.readFile("./public/script.js", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading script");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  const username = new URL(
    req.url,
    "http://localhost",
  ).searchParams.get("username");

  const joinMessage = JSON.stringify({
    type: "system",
    text: `${username} joined`,
  });

  wss.clients.forEach((client) => {
    client.send(joinMessage);
  });

  socket.on("message", (data) => {
    const { username, text } = JSON.parse(data);

    const chatMessage = JSON.stringify({
      type: "chat",
      username,
      text,
    });

    wss.clients.forEach((client) => {
      client.send(chatMessage);
    });
  });

  socket.on("close", () => {
    const leaveMessage = JSON.stringify({
      type: "system",
      text: `${username} left`,
    });

    wss.clients.forEach((client) => {
      client.send(leaveMessage);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});