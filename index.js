const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

// MiddleWare
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wdoqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("AllSSD");
        const ssdCollection = database.collection("ssd");

        // GET ALL SSD
        app.get('/products', async (req, res) => {
            const cursor = ssdCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        // GET Single Product
        app.get('/products/:productId', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ssdCollection.findOne(query);
            res.json(result);
        });


    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hi I am database');
})

app.listen(port, () => {
    console.log('I am the port', port);
})