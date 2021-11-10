const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wdoqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    res.send('Hi I am database');
})

app.listen(port, () => {
    console.log('I am the port', port);
})