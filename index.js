const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h6wi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect()
        const  travelExperince= client.db('travelExperinece').collection('travelExperince')

        app.post('/travleExperience', async(req,res)=> {
            const title = req.body.title
            const desc = req.body.desc
            const writer = req.body.writer
            const date = req.body.date
            const image = req.body.image
            // const bufferImage = Buffer.from(encodepic,'base64')
            console.log(title,desc, writer,date,image)
            const travelExperincedata = {
                title,
                writer,
                desc,
                date,
                image
            }
            const result = await travelExperince.insertOne(travelExperincedata)
            res.json(result)
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