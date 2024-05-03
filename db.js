const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/Hotels'
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDb Server');
})  

db.on('disconnected', ()=>{
    console.log('Disconnected to MongoDb Server');
})
db.on('error', (err)=>{
    console.log('Not connected to MongoDb Server having error:', err);
})
module.exports = db;
