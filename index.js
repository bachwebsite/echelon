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

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/go=:query", async (req, res) => {
  const { query } = req.params;
  try {
    const reply = await fetch(`http://api.duckduckgo.com/ac/?q=${query}&format=json`);
    const data = await reply.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).send({ error: "Failed to fetch suggestions" });
  }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/g", (req, res) => res.sendFile(path.join(__dirname, "/public/g.html")));
app.get("/s", (req, res) => res.sendFile(path.join(__dirname, "/public/s.html")));
app.get("/a", (req, res) => res.sendFile(path.join(__dirname, "/public/a.html")));
app.get("/null", (req, res) => res.sendFile(path.join(__dirname, "/public/start.html")));
app.get("/portfolio", (req, res) => res.sendFile(path.join(__dirname, "/public/yesbro.html")));

app.use((req, res) => res.status(404).send("404"));

const server = http.createServer();
server.on("request", (req, res) => (bare.shouldRoute(req) ? bare.routeRequest(req, res) : app(req, res)));
server.on("upgrade", (req, socket, head) => (bare.shouldRoute(req) ? bare.routeUpgrade(req, socket, head) : socket.end()));
server.on("listening", () => console.log(`Server running on port ${port}`));

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
function shutdown() {
  console.log("Closing server...");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({ port });
