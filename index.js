const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h6wi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect()

        const lifetrottingDb = client.db("lifetrotting").collection("travelPlaces");
        const  travelExperince= client.db('travelExperinece').collection('travelOrder')

        

    }
    finally{

    }
}
run().catch(console.dir())


app.get('/',(req,res)=> {
    res.send(`it's a life trotting website`)
})

app.listen(port, ()=> {
    console.log('listening to port ', port)
})