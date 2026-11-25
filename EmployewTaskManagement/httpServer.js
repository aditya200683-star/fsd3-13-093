import http from 'http';
import fs from 'fs';
import path from 'path';

let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending"
    },
    {
        id: 2,
        taskName: "Create Dashboard",
        assignedTo: "Amit Kumar",
        status: "Completed"
    },
    {
        id: 3,
        taskName: "Test Website",
        assignedTo: "Priya Singh",
        status: "In Progress"
    }
];

const server = http.createServer((req, res) => {

    // Home route
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome to Employee Task Management</h1>");
    }

    // Get all tasks
    else if (req.url === "/tasks" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tasks));
    }

    // About route
    else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>Employee Task Management Application</h2><p>Manage employee tasks easily.</p>");
    }

    // Serve HTML using FS module
    else if (req.url === "/home" && req.method === "GET") {

        fs.readFile(
            path.join(process.cwd(), "public", "index.html"),
            (err, data) => {

                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Unable to read HTML file");
                    return;
                }

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        );
    }

    // Add new task
    else if (req.url === "/add-task" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {
                const task = JSON.parse(body);

                if (
                    !task.id ||
                    !task.taskName ||
                    !task.assignedTo ||
                    !task.status
                ) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        message: "All required fields are necessary"
                    }));
                    return;
                }

                if (tasks.some(t => t.id === task.id)) {
                    res.writeHead(409, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        message: "Task ID already exists"
                    }));
                    return;
                }

                tasks.push(task);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Task added successfully",
                    task: task
                }));

            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }

    // Invalid route
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});