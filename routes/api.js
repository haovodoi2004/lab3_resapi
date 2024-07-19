const express = require('express');
const router = express.Router();

// add model
const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');
//Add Distributors
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;
        const newDistributors = new Distributors({
            name: data.name
        });
        const result = await newDistributors.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "Added successfully",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Failed to add distributor",
                "data": []
            })
        }
    } catch (e) {
        console.log("Failed to add distributor : " + e)
    }
})
//Add fruit
router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body;
        const newFruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor,
        })
        const result = await newFruit.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "Added successfully",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "Failed to add fruit",
                "data": []
            })
        }
    } catch (e) {
        console.log("Failed to add fruit" + e)
    }
})
//Get all fruits
router.get('/get-list-fruits', async (req, res) => {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "message": "List of fruits",
            "data": data
        })
    } catch (e) {
        console.log("Failed to get list of fruits list :" + e)
    }
})
//Get fruit by ID
router.get('/get-fruits/id', async (req, res) => {
    const id = req.params.id;
    const data = await Fruits.findById(id).populate('id_distributor');
    try {
        res.json({
            "status": 200,
            "messenger": "List fruits by ID",
            "data": data
        })
    } catch (e) {
        console.log("e")
    }

})
router.get('/get-fruits-by-price', async (req, res) => {
    try {
        const {priceStart, priceEnd} = req.query;
        const query = {price: {$gte: priceStart, $lte: priceEnd}};

        const data = await Fruits.find(query, 'name quantity price id_distributor')
            .populate('id_distributor')
            .sort({quantity: -1})
            .skip(0)
            .limit(2)
        res.json({
            "status": 200,
            "message": "List of fruits by price id distributor",
            "data": data
        })
    } catch (e) {
        console.log(e)
    }
})
//get by name A or X
router.get('/get-fruits-by-name-AorX/', async (req, res) => {
    try {
        const query = {$or: [{name: {$regex: "T"}}, {name: {$regex: "X"}}]}
        const data = await Fruits.find(query ,'name quantity price id_distributor').populate('id_distributor');
        res.json({
            "status": 200,
            "messenger" :"List of fruits by A or X",
            "data" : data
        })
    } catch (e) {
        console.log(e)
    }
})

//Update Fruits

router.put('/update-fruit/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body;
        const updateFruit = await Fruits.findById(id);
        let result = null;
        if (updateFruit) {
            updateFruit.name = data.name ?? updateFruit.name;
            updateFruit.quantity = data.quantity ?? updateFruit.quantity;
            updateFruit.price = data.price ?? updateFruit.price;
            updateFruit.status = data.status ?? updateFruit.status;
            updateFruit.image = data.image ?? updateFruit.image;
            updateFruit.description = data.description ?? updateFruit.description;
            updateFruit.id_distributor = data.id_distributor ?? data.id_distributor;

        }
        result = await updateFruit.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "Updated Fruit successfully",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "Updated Fruit false",
                "data": []
            })
        }

    } catch (e) {
        console.log("False to update fruit :" + e)
    }
})

module.exports = router;