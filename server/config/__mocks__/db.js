const { JsonDB, Config } = require("node-json-db");

class MockDB {
    constructor() {
        this.db = new JsonDB(new Config('todo_test_db', true, false, '/'));
    }

    push(path, data, override=true) {
        this.db.push(path, data, override);
    }

    getData(path) {
        try {
            return this.db.getData(path);
        } catch (error) {
            return []; // Return an empty array if the path doesn't exist
        }
    }

    delete(path) {
        this.db.delete(path);
    }
}

module.exports = new MockDB();