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
                console.error('Error: Please provide a task description. Use: node index.js add "<task description>".');
                process.exit(1);
            }
            addTask(task);
            break;

        case 'update':
            if (!id || !task) {
                console.error('Error: Both task ID and description are required. Use: node index.js update <id> "<task description>".');
                process.exit(1);
            }
            updateTask(id, task);
            break;
        case 'delete':
            if (!id) {
                console.error('Error: Please specify the task ID to delete. Use: node index.js delete <id>.');
                process.exit(1);
            }
            deleteTask(id);
            break;
        case 'progress':
            if (!id) {
                console.error('Error: Please specify the task ID to mark as in progress. Use: node index.js progress <id>.');
                process.exit(1);
            }
            markTaskInProgress(id);
            break;
        case 'done':
            if (!id) {
                console.error('Error: Please specify the task ID to mark as done. Use: node index.js done <id>.');
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
            console.error('Error: Unrecognized command. Use "node index.js help" to see the list of available commands.');
            process.exit(1);
    }
}
//  function to add a task
function addTask(task) {
    const Task = {
        id: uuidv4(), // generates a unique ID for new tasks
        task,
        status: 'pending',
        // ISO Date format to minimize cross-browser inconsistencies
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const tasks = loadTasks();
    tasks.push(Task);
    saveTasks(tasks);
    console.log(`Task added: ${Task.id}`);
}

//  function to update a task
function updateTask(id, task) {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        console.error('Error: Task with the specified ID not found. Please check the ID and try again.');
        process.exit(1);
    }
    tasks[index].task = task;
    saveTasks(tasks);
    console.log(`Task updated: ${id}`);
}

//  function to delete a task
function deleteTask(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === id);    
    if (index === -1) {
        console.error('Error: Task with the specified ID not found. Please check the ID and try again.');
        process.exit(1);
    }
    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task deleted: ${id}`);
}   

//  function to mark a task as 'In Progress'
function markTaskInProgress(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        console.error('Error: Task with the specified ID not found. Please check the ID and try again.');
        process.exit(1);
    }
    tasks[index].status = 'in progress';
    saveTasks(tasks);
    console.log(`Task marked as in progress: ${id}`);
}

//  function to mark a task as 'Done'
function markTaskDone(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        console.error('Error: Task with the specified ID not found. Please check the ID and try again.');
        process.exit(1);
    }
    tasks[index].status = 'done';
    saveTasks(tasks);
    console.log(`Task marked as done: ${id}`);
}

//  function to list all tasks
function listTasks() {
    const tasks = loadTasks();
    console.log(tasks);
}

//  function to list all done tasks
function listDoneTasks() {
    const tasks = loadTasks();
    const doneTasks = tasks.filter(t => t.status === 'done');
    console.log(doneTasks);
}

//  function to list all tasks in progress
function listInProgressTasks() {
    const tasks = loadTasks();  
    const inProgressTasks = tasks.filter(t => t.status === 'in progress');
    console.log(inProgressTasks);
}

//  function to list all pending tasks
function listPendingTasks() {
    const tasks = loadTasks();
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    console.log(pendingTasks);
}

main();