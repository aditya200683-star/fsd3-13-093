# Online Food Order Management

Node.js lab project using the built-in HTTP and FS modules for Part A and Express.js REST APIs for Part B. No database is used; orders are stored in JavaScript arrays.

## Project structure

```text
OnlineFoodOrderManagement/
├── package.json
├── httpServer.js
├── expressApp.js
├── public/
│   └── index.html
└── screenshots/
    └── (save your exam output screenshots here)
```

## Setup

Open the project folder in VS Code. In the terminal, run:

```bash
npm install
```

## Run Part A: HTTP server

```bash
node httpServer.js
```

Server URL: `http://localhost:3000`

Test these routes in a browser:
- `http://localhost:3000/` — welcome HTML
- `http://localhost:3000/menu` — food menu JSON
- `http://localhost:3000/about` — application information
- `http://localhost:3000/home` — serves `public/index.html` using the FS module

POST `/place-order` can be tested with EchoAPI:
- URL: `http://localhost:3000/place-order`
- Method: `POST`
- Body type: raw JSON

```json
{
  "orderId": 101,
  "customerName": "Neha Verma",
  "itemName": "Paneer Pizza",
  "quantity": 1
}
```

## Run Part B: Express REST API

Open a **second terminal** in the project folder:

```bash
node expressApp.js
```

Server URL: `http://localhost:4000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/orders` | Get all orders |
| GET | `/orders/1` | Get order with ID 1 |
| POST | `/orders` | Add an order |
| PUT | `/orders/1` | Update order with ID 1 |
| DELETE | `/orders/1` | Delete order with ID 1 |

### Sample POST body

```json
{
  "orderId": 4,
  "customerName": "Neha Verma",
  "itemName": "Paneer Pizza",
  "quantity": 1,
  "status": "Pending",
  "totalAmount": 350
}
```

### Sample PUT body

```json
{
  "customerName": "Aarav Sharma",
  "itemName": "Veg Burger",
  "quantity": 3,
  "status": "Preparing",
  "totalAmount": 360
}
```

## Open the frontend

Keep `expressApp.js` running, then open:

`http://localhost:3000/home`

The frontend reads and manages orders through the Express API on port 4000. Both servers must be running for the frontend's order-management features to work.

## GitHub

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
git push -u origin main
```

After completing each module, commit and push your changes:

```bash
git add .
git commit -m "Complete HTTP server and routing"
git push
```

Take your own screenshots of both servers, the `/home` page, EchoAPI GET/POST/PUT/DELETE tests, and GitHub commit history. Save them in the `screenshots` folder before submission.
