const express = require("express");
const next = require("next");
const { createCanvas } = require("canvas");
const truisms = require("./truisms.json");
const render = require("./lib/render");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/:id.png", (req, res) => {
    const id = req.params.id;
    const truism = truisms[id];
    const c = createCanvas(600, 300);
    render(c, truism, ["#000", "#fff"], {
      innerWidth: 600,
      innerHeight: 300
    });
    res.end(c.toBuffer());
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
