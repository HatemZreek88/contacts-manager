const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const file = new FileSync("./models/db.json");
const db = low(file);
// db.defaults({ contacts: [] }).write();
module.exports = db;
