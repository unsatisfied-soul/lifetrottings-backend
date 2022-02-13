const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000
require('dotenv').config()
const fileUpload = require('express-fileupload')
app.use(cors())
app.use(express.json())
app.use(fileUpload())


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h6wi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect()
        const lifetrooting =  client.db('lifetrooting')
        const travelExperince = lifetrooting.collection('travelExperince')
        const usersData = lifetrooting.collection('users')

        app.post('/experience', async(req,res)=> {
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
        app.get('/experience', async(req,res)=> {
            const cursor = travelExperince.find({})
            const travelingplace = await cursor.toArray()
            res.send(travelingplace)
        })
        //get single experience
        app.get('/experience/:id', async(req,res)=> {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await travelExperince.findOne(query)
            res.send('gettingsoon')
        })

        //user post
        app.post('/users', async(req,res)=> {
            const user = req.body
            const result = await usersData.insertOne(user)
            res.json(result)
            console.log(req.body)
        })

        //get users
        app.get('/users', async(req,res)=> {
            const cursor = usersData.find({})
            const alluser = await cursor.toArray()
            res.send(alluser)
        })

        //put user Admin
        app.put('/users/admin', async(req,res)=> {
            const user = req.body;
            const filter = {email : user.email};
            const updateDoc = {$set:{role:'admin'}}
            const result = await usersData.updateOne(filter, updateDoc)
            res.json(result)
        })
        

    }
    catch(error){}
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