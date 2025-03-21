const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// functions
const getAll = async (req, res) => {
    const result = await mongodb.getDB().db().collection('monster').find();
    result.toArray().then((monster) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(monster);
    });
};

const getSingle = async (req, res) => {
    const monsterId = new ObjectId(req.params.id);
    console.log(monsterId)
    const result = await mongodb.getDB().db().collection("monster").find({_id: monsterId});
    result.toArray().then((monster) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(monster[0]);
    });
};

const createMonster = async (req, res) => {
    const monster = {
        name: req.body.name,
        element: req.body.element,
        weakSpot: req.body.weakSpot
    }
    const response = await mongodb.getDB().db().collection("monster").insertOne(monster);
    
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while adding a monster");
    }
}

const updateMonster = async (req, res) => {
    const monsterId = new ObjectId(req.params.id);

    const monster = {
        name: req.body.name,
        element: req.body.element,
        weakSpot: req.body.weakSpot
    };

    const response = await mongodb.getDB().db().collection("monster").replaceOne({_id: monsterId}, monster);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while updating the monster");
    }
};

const deleteMonster = async (req, res) => {
    const monsterId = new ObjectId(req.params.id);
    const response = await mongodb.getDB().db().collection("monster").deleteOne({_id: monsterId});
    
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occured while deleting the monster ${monsterId}`);
    }
};

module.exports = {
    getAll,
    getSingle,
    createMonster,
    updateMonster,
    deleteMonster
}