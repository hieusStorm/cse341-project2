const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// functions
const getAll = async (req, res) => {
    const result = await mongodb.getDB().db().collection('user').find();
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db().collection("user").find({_id: userId});
    result.toArray().then((user) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user[0]);
    });
};

const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    const response = await mongodb.getDB().db().collection("user").insertOne(user);
    
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while adding a user");
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser
}