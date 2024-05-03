const express = require('express')
const Person = require('../Models/Person');
const router = express.Router();

router.post('/addPerson', async (req, res) => {


    try {
        const data = req.body;
        const newPerson = new Person(data)
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)


    } catch (error) {
        console.log('I am from catch of /addPerson')
        res.status(500).json(error);
    }

});

router.get('/fetchPerson', async (req, res) => {

    try {
        const response = await Person.find();
        console.log("Data Fetched")
        res.status(200).json(response)


    } catch (error) {
        console.log('I am from catch of /fetchPerson')
        res.status(500).json(error);
    }
});
router.get('/fetchPerson/:byId', async (req, res) => {

    try {
        byId = req.params.byId;
        const response = await Person.find({ work: byId });
        console.log(`Data of ${byId} Fetched`);
        res.status(200).json(response)


    } catch (error) {
        console.log('I am from catch of /fetchPerson/:byId')
        res.status(500).json(error);
    }
});

router.put('/updatePerson/:byId', async (req, res) => {

    try {
        const byId = req.params.byId;
        const updateData = req.body;

        const response = await Person.findByIdAndUpdate({ _id: byId }, updateData, { new: true, runValidators: true });

        if (!response) {
            console.log('Please Check the data Entered')
            res.status(500).json(response);
        } else {
            console.log(`Data of ${byId} Updated According to Id`);
            res.status(200).json(response)
        }




    } catch (error) {
        console.log('I am from catch of /updatePerson/:byId')
        res.status(500).json(error);
    }
});

router.put('/updatePersonByAny/:byName', async (req, res) => {

    try {
        const byName = req.params.byName;
        const updateData = req.body;

        const response = await Person.findOneAndUpdate({ name: byName }, updateData, { new: true, runValidators: true });

        if (!response) {
            console.log('Please Check the data Entered')
            res.status(500).json(response);
        } else {
            console.log(`Data of ${byName} Updated by Name`);
            res.status(200).json(response)
        }



    } catch (error) {
        console.log('I am from catch of /updatePersonByAny/:byName')
        res.status(500).json(error);
    }
});


router.delete('/deletePersonBy/:byName', async (req, res) => {

    try {
       const byName = req.params.byName;
        //const updateData = req.body;
        console.log("dekf", byName)
        const response = await Person.deleteOne({ name: byName });

        if (!response) {
            console.log('Please Check the data Entered')
            res.status(500).json(response);
        }
        else {
            console.log(`Data of ${byName} Deleted by byname`);
            res.status(200).json(response)
        }

    } catch (error) {
        console.log('I am from catch of /deletePersonBy/:byname with error', error)
        res.status(500).json(error);
    }
});

module.exports = router;