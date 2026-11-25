import express from "express";

const app = express();
const PORT = 4000;
// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(express.json());


let orders = [
  {
    orderId: 1,
    customerName: "Aarav Sharma",
    itemName: "Veg Burger",
    quantity: 2,
    status: "Pending",
    totalAmount: 240
  },
  {
    orderId: 2,
    customerName: "Priya Singh",
    itemName: "Masala Dosa",
    quantity: 1,
    status: "Preparing",
    totalAmount: 150
  },
  {
    orderId: 3,
    customerName: "Rahul Verma",
    itemName: "Paneer Pizza",
    quantity: 1,
    status: "Delivered",
    totalAmount: 350
  }
];

function validOrder(body, requireId = false) {
  return (!requireId || body.orderId !== undefined) &&
    typeof body.customerName === "string" && body.customerName.trim() !== "" &&
    typeof body.itemName === "string" && body.itemName.trim() !== "" &&
    Number.isInteger(body.quantity) && body.quantity > 0 &&
    (body.totalAmount === undefined ||
      (typeof body.totalAmount === "number" && body.totalAmount >= 0));
}

// Retrieve all food orders
app.get("/orders", (req, res) => {
  res.status(200).json(orders);
});

// Retrieve one order by ID
app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(item => item.orderId === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }
  res.status(200).json(order);
});

// Add a new food order
app.post("/orders", (req, res) => {
  const body = req.body;

  if (!validOrder(body, true) || !Number.isInteger(Number(body.orderId))) {
    return res.status(400).json({
      message: "Provide orderId, customerName, itemName and a positive quantity."
    });
  }

  const id = Number(body.orderId);
  if (orders.some(item => item.orderId === id)) {
    return res.status(409).json({ message: "An order with this orderId already exists." });
  }

  const newOrder = {
    orderId: id,
    customerName: body.customerName.trim(),
    itemName: body.itemName.trim(),
    quantity: body.quantity,
    status: body.status || "Pending",
    totalAmount: body.totalAmount ?? 0
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Order placed successfully", order: newOrder });
});

// Update an existing food order
app.put("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(item => item.orderId === id);

  if (index === -1) {
    return res.status(404).json({ message: "Order not found." });
  }

  const body = req.body;
  if (!validOrder(body)) {
    return res.status(400).json({
      message: "Provide valid customerName, itemName and a positive quantity."
    });
  }

  orders[index] = {
    ...orders[index],
    customerName: body.customerName.trim(),
    itemName: body.itemName.trim(),
    quantity: body.quantity,
    status: body.status ?? orders[index].status,
    totalAmount: body.totalAmount ?? orders[index].totalAmount
  };

  res.status(200).json({ message: "Order updated successfully", order: orders[index] });
});

// Delete an existing food order
app.delete("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(item => item.orderId === id);

  if (index === -1) {
    return res.status(404).json({ message: "Order not found." });
  }

  const deletedOrder = orders.splice(index, 1)[0];
  res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
});

// Invalid route
app.use((req, res) => {
  res.status(404).json({ message: "API route not found." });
});

// Invalid JSON or other request errors
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON request body." });
  }
  res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
