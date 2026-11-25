import express from 'express';

const app = express();

app.use(express.json());

// Sample employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Create Dashboard",
        assignedTo: "Amit Kumar",
        status: "Completed",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Test Website",
        assignedTo: "Priya Singh",
        status: "In Progress",
        priority: "Low"
    }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// POST add new task
app.post('/tasks', (req, res) => {

    const { id, taskName, assignedTo, status, priority } = req.body;

    if (
        !Number.isInteger(id) ||
        id <= 0 ||
        typeof taskName !== "string" ||
        !taskName.trim() ||
        typeof assignedTo !== "string" ||
        !assignedTo.trim() ||
        typeof status !== "string" ||
        !status.trim() ||
        typeof priority !== "string" ||
        !priority.trim()
    ) {
        return res.status(400).json({
            message: "Please provide all valid task details"
        });
    }

    const exists = tasks.find(t => t.id === id);

    if (exists) {
        return res.status(409).json({
            message: "Task ID already exists"
        });
    }

    const newTask = {
        id,
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    if (
        (taskName !== undefined &&
            (typeof taskName !== "string" || !taskName.trim())) ||
        (assignedTo !== undefined &&
            (typeof assignedTo !== "string" || !assignedTo.trim())) ||
        (status !== undefined &&
            (typeof status !== "string" || !status.trim())) ||
        (priority !== undefined &&
            (typeof priority !== "string" || !priority.trim()))
    ) {
        return res.status(400).json({
            message: "Invalid task details"
        });
    }

    tasks[index] = {
        ...tasks[index],
        ...req.body,
        id: tasks[index].id
    };

    res.status(200).json({
        message: "Task updated successfully",
        task: tasks[index]
    });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Invalid route
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// Start server
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});
 