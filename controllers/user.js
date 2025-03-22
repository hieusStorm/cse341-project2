const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// functions
const getAll = async (req, res) => {
    //#swagger.tags['Monsters']
    const result = await mongodb.getDB().db().collection('monster').find();
    result.toArray((err, monsters) => {
        if(err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(monsters);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags['Monsters']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid monster ID to find.");
    }
    const monsterId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db().collection("monster").find({_id: monsterId});
    result.toArray((err, monster) => {
        if(err) {
            res.status(400).json({message: err});
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(monster[0]);
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