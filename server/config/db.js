const { JsonDB, Config } = require('node-json-db');
const db = new JsonDB(new Config("todo_db", true, false, '/'));

db.push("/users", [], false);
db.push("/todos", {}, false);

module.exports = db;
