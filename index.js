const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h6wi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect()
        const lifetrooting =  client.db('lifetrooting')
        const travelExperince = lifetrooting.collection('travelExperince')

        app.post('/experience', async(req,res)=> {
            console.log(req.body)
            const title = req.body.title
            const desc = req.body.desc
            const date = req.body.date
            const writer = req.body.writer
            const travelImage = req.body.travelImage
            // const bufferImage = Buffer.from(encodepic,'base64')
            const travelExperincedata = {
                title,
                desc,
                date,
                writer,
                travelImage
            }
            const result = await travelExperince.insertOne(travelExperincedata)
            res.json(result)
        })
        app.get('/travleExperience', async(req,res)=> {
            const cursor = travelExperince.find({})
            const travelingplace = await cursor.toArray()
            res.send(travelingplace)
        })
        

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