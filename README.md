# Task CLI

## Overview

Task CLI is a simple command-line interface (CLI) task manager that allows users to manage their tasks efficiently. With features to add, update, delete, and list tasks, it provides a straightforward way to keep track of your to-do items.

## Features

- **Add a Task**: Add a new task with a description.
- **Update a Task**: Modify the details of an existing task.
- **Delete a Task**: Remove a task from your list.
- **List Tasks**: View all tasks, or filter by status: done, in progress, pending.
- **Mark Tasks**: Change the status of tasks to 'In Progress' or 'Done'.
- **Help Command**: Access usage instructions for all commands.

## Installation

To get started with Task CLI, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aubreyross/task-cli
   cd task-cli
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To use the Task CLI, run the following command in your terminal:

### Commands

- **Add a Task**:
  ```bash
  node index.js add "<task description>"
  ```

- **Update a Task**:
  ```bash
  node index.js update <id> "<task description>"
  ```

- **Delete a Task**:
  ```bash
  node index.js delete <id>
  ```

- **Mark Task as In Progress**:
  ```bash
  node index.js progress <id>
  ```

- **Mark Task as Done**:
  ```bash
  node index.js done <id>
  ```

- **List All Tasks**:
  ```bash
  node index.js list
  ```

- **List Done Tasks**:
  ```bash
  node index.js list-done
  ```

- **List Tasks in Progress**:
  ```bash
  node index.js list-progress
  ```

- **List Pending Tasks**:
  ```bash
  node index.js list-pending
  ```

- **Show Help**:
  ```bash
  node index.js help
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Aubrey Ross