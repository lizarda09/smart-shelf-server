/*const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

mongoClient.connect(function(err, client){

    const db = client.db("usersdb");
    const collection = db.collection("users");
    let user = {name: "Tom", age: 23, education: "student"};
    collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
});

 */

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true} ));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/links.routes'));
app.use('/api', require('./routes/users.routes'));

const PORT = config.get('port') || 4000;

async function start(){
    try {
    await mongoose.connect(config.get('mongoUrl'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        app.listen(PORT, () => console.log(`App started on port ${PORT}`));
    } catch (e){
        console.log('Server error', e.message);
        process.exit(1)
    }
}

start();


