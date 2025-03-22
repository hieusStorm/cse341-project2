const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// functions
const getAll = async (req, res) => {
    //#swagger.tags['Users']
    const result = await mongodb.getDB().db().collection('user').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => res.status(400).json({message: err}));
};

const getSingle = async (req, res) => {
    //#swagger.tags['Users']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user ID to find.");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db().collection("user").find({_id: userId});
    result.toArray().then((user) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user[0]);
    }).catch((err) => res.status(400).json({message: err}));;
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

const updateUser = async (req, res) => {
    //#swagger.tags['Users']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user ID to update.");
    }
    const userId = new ObjectId(req.params.id);

    const user = {
        username: req.body.username,
        password: req.body.password
    };

    const response = await mongodb.getDB().db().collection("user").replaceOne({_id: userId}, user);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while updating the user");
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags['Users']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user ID to delete.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDB().db().collection("user").deleteOne({_id: userId});
    
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleting the user ${userId}`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}