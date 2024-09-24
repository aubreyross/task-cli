//MAIN CLI LOGIC

const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const tasksFilePath = path.join(__dirname, 'tasks.json');

function loadTasks() {
    if (!fs.existsSync(tasksFilePath)) {
        return [];
    }
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
}

function showHelp() {
    console.log(`
Task CLI - Simple Task Management

Usage:
  node index.js add <task>          Add a  task
  node index.js update <id> <task>  Update an existing task
  node index.js delete <id>         Delete a task
  node index.js progress <id>       Mark task as 'In Progress'
  node index.js done <id>           Mark task as 'Done'
  node index.js list                List all tasks
  node index.js list-done           List all done tasks
  node index.js list-progress       List tasks in progress
  node index.js list-pending        List pending tasks
  node index.js help                Show this help message
`);
};

function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const task = args[1];
    const id = args[2];

    const tasks = loadTasks();

    switch (command) {
        case 'add':
            if (!task) {
                console.error('Error: Task description required. Use command: node index.js add "<task description>".');
                process.exit(1);
            }
            addTask(task);
            break;

        case 'update':
            if (!id || !task) {
                console.error('Error: Missing task ID or description. Use command: node index.js update <id> "<task description>".');
                process.exit(1);
            }
            updateTask(id, task);
            break;
        case 'delete':
            if (!id) {
                console.error('Error: Missing task ID. Use command: node index.js delete <id>.');
                process.exit(1);
            }
            deleteTask(id);
            break;
        case 'progress':
            if (!id) {
                console.error('Error: Missing task ID. Use command: node index.js progress <id>.');
                process.exit(1);
            }
            markTaskInProgress(id);
            break;
        case 'done':
            if (!id) {
                console.error('Error: Missing task ID. Use command: node index.js done <id>.');
                process.exit(1);
            }
            markTaskDone(id);
            break;
        case 'list':
            listTasks();
            break;
        case 'list-done':
            listDoneTasks();
            break;
        case 'list-progress':
            listInProgressTasks();
            break;
        case 'list-pending':
            listPendingTasks();
            break;
        case 'help':
            showHelp();
            break;
        default:
            console.error('Error: Invalid command. Use "node index.js help" to see the available commands.');
            process.exit(1);
    }
}