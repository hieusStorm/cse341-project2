const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;
let database;

const initDb = (callBack) => {
    if(database) {
        console.log("Db is already initalized");
        return callBack(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callBack(null, database);
    }).catch((err) => {
        callBack(err);
    });
};

const getDB = () => {
    if(!database) {
        throw Error("Database not intialized.");
    }
    return database;
};

module.exports = {
    initDb,
    getDB
};