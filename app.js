const express = require('express')
const app = express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./Routes/personRoutes')



function logRequest(req, res, next) {
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`)
    next();
}
app.use(logRequest);
app.use('/person', personRoutes)
app.get('/' , async (req, res)=>{
res.send('Welcome to Hotels ')
});
// app.post('/addPerson', async (req, res) => {


//     try {
//         const data = req.body;
//         const newPerson = new Person(data)
//         const response = await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response)


//     } catch (error) {
//         console.log('I am from catch of /addPerson')
//         res.status(500).json(error);
//     }

// });

// app.get('/fetchPerson', async(req, res) => {

// try {
//     const response = await Person.find();
//     console.log("Data Fetched")
//     res.status(200).json(response)


// } catch (error) {
//     console.log('I am from catch of /fetchPerson')
//     res.status(500).json(error);
// }
// });
// app.get('/fetchPerson/:byId', async(req, res) => {

//     try {
//         byId = req.params.byId;
//         const response = await Person.find({work:byId});
//         console.log(`Data of ${byId} Fetched`);
//         res.status(200).json(response)


//     } catch (error) {
//         console.log('I am from catch of /fetchPerson/:byId')
//         res.status(500).json(error);
//     }
//     });





app.listen(4000, () => {
    console.log('Application Hosted at Port No. 4000')
})
//dskjjhbf