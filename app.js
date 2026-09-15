// Taskly — a tiny in-memory task manager.
//
// This is the REFERENCE IMPLEMENTATION of the current specs in
// openspec/specs/. It intentionally has no dependencies so it runs anywhere
// with `node app.js`. As you archive changes and the specs grow, this is the
// code you'd extend to match. At the pristine (baseline) state it implements:
//   users:         register, identify owner
//   tasks:         create, list, complete
//   notifications: send, list
//
// Run:  node app.js

let nextId = 1;
const users = new Map(); // id -> { id, username }
const tasks = new Map(); // id -> { id, title, ownerId, state }
const notifications = []; // { id, userId, message, sentAt }

const uid = () => nextId++;
const findUserByName = (name) => [...users.values()].find((u) => u.username === name);

// --- users ---
function registerUser(username) {
  if (!username) throw new Error("username required");
  if (findUserByName(username)) throw new Error(`username "${username}" taken`);
  const user = { id: uid(), username };
  users.set(user.id, user);
  return user;
}

function requireUser(userId) {
  const user = users.get(userId);
  if (!user) throw new Error("unauthorized: unregistered user");
  return user;
}

// --- tasks ---
function createTask(userId, title) {
  requireUser(userId);
  if (!title) throw new Error("title required");
  const task = { id: uid(), title, ownerId: userId, state: "open" };
  tasks.set(task.id, task);
  return task;
}

function listTasks(userId) {
  requireUser(userId);
  return [...tasks.values()]
    .filter((t) => t.ownerId === userId)
    .sort((a, b) => a.id - b.id);
}

function completeTask(userId, taskId) {
  requireUser(userId);
  const task = tasks.get(taskId);
  if (!task) throw new Error("not found");
  task.state = "done";
  return task;
}

// --- notifications ---
function sendNotification(userId, message) {
  requireUser(userId);
  if (!message) throw new Error("message required");
  const note = { id: uid(), userId, message, sentAt: new Date().toISOString() };
  notifications.push(note);
  return note;
}

function listNotifications(userId) {
  requireUser(userId);
  return notifications.filter((n) => n.userId === userId).reverse();
}

// --- demo ---
function main() {
  const alice = registerUser("alice");
  sendNotification(alice.id, "Welcome to Taskly");

  const t1 = createTask(alice.id, "Buy milk");
  createTask(alice.id, "Write OpenSpec demo");
  completeTask(alice.id, t1.id);

  console.log("Tasks for alice:");
  for (const t of listTasks(alice.id)) {
    console.log(`  [${t.state === "done" ? "x" : " "}] #${t.id} ${t.title}`);
  }
  console.log("Notifications for alice:");
  for (const n of listNotifications(alice.id)) {
    console.log(`  ${n.sentAt}  ${n.message}`);
  }
}

if (require.main === module) main();

module.exports = {
  registerUser, createTask, listTasks, completeTask, sendNotification, listNotifications,
};
