import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import http from "http";
import { hostname } from "node:os";
import compression from 'compression';
import 'dotenv/config';
import path from "node:path";

let port = parseInt(process.env.PORT || "");
if (isNaN(port)) port = 2100;

const bare = createBareServer("/bare/");
const app = express();

const __dirname = process.cwd();

app.get("/go=:query", async (req, res) => {
  const { query } = req.params;
  try {
    const reply = await fetch(`http://api.duckduckgo.com/ac/?q=${query}&format=json`);
    const data = await reply.json();
    res.send(data);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).send({ error: 'Failed to fetch suggestions' });
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/index.html'));
});
app.get('/g', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/g.html'));
});
app.get('/a', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/a.html'));
});
app.get('/null', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/start.html'));
});
app.get('/games', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/public/nobodywillseethisunlessskidding.html'));
});


app.use(compression());
app.use(express.static(process.cwd() + "/public/"));
app.use("/public/uv/", express.static(process.cwd() + "/uv/"));

app.use((req, res) => {
  res.status(404);
  res.send(
    `404`
  );
});

const server = http.createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log("Breakium listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});