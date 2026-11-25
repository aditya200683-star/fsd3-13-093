import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

const menu = [
  { id: 1, itemName: "Veg Burger", price: 120 },
  { id: 2, itemName: "Paneer Pizza", price: 350 },
  { id: 3, itemName: "Masala Dosa", price: 150 },
  { id: 4, itemName: "French Fries", price: 90 },
  { id: 5, itemName: "Cold Coffee", price: 110 }
];

const placedOrders = [];

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data, null, 2));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON. Send a valid JSON request body."));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const route = url.pathname;

  if (req.method === "GET" && route === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(`<!DOCTYPE html>
      <html><head><title>Food Order Server</title></head>
      <body style="font-family:Arial;padding:30px">
        <h1>Welcome to Online Food Order Management</h1>
        <p>Node.js HTTP server is running successfully.</p>
        <p>Visit <a href="/menu">/menu</a>, <a href="/about">/about</a> or <a href="/home">/home</a>.</p>
      </body></html>`);
  }

  if (req.method === "GET" && route === "/menu") {
    return sendJSON(res, 200, menu);
  }

  if (req.method === "GET" && route === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end("<h1>About</h1><p>This application helps customers place and manage online food orders.</p>");
  }

  if (req.method === "GET" && route === "/home") {
    const filePath = path.join(__dirname, "public", "index.html");
    return fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        return sendJSON(res, 500, { message: "Unable to read the home page." });
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
  }

  if (req.method === "POST" && route === "/place-order") {
    try {
      const order = await readRequestBody(req);
      const { orderId, customerName, itemName, quantity } = order;

      if (orderId === undefined || !customerName?.trim() ||
          !itemName?.trim() || !Number.isInteger(quantity) || quantity <= 0) {
        return sendJSON(res, 400, {
          message: "Required fields: orderId, customerName, itemName and a positive quantity."
        });
      }

      const newOrder = { orderId, customerName, itemName, quantity };
      placedOrders.push(newOrder);
      return sendJSON(res, 201, { message: "Order placed successfully.", order: newOrder });
    } catch (error) {
      return sendJSON(res, 400, { message: error.message });
    }
  }

  return sendJSON(res, 404, { message: "Route not found." });
});

server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
