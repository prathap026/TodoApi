const express = require('express');
const mongoose = require('mongoose'); // Use 'mongoose' instead of 'db'
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config();

require('./deploy-cron');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
    `${process.env.MONGODB_URI}`,
    { family: 4 }
);

mongoose.connection.on('error', console.error.bind(console, "Error connecting to DB"));

mongoose.connection.once('open', () => {
    console.log('DB connected');
});

// Define Mongoose Schema and Model
const ListSchema = new mongoose.Schema({
    description: String,
    date: String
});

const List = mongoose.model('list', ListSchema);

// CRUD Operations
app.post('/post', async (req, res) => {
    const lists = await new List(req.body).save();
    res.send(lists);
});

app.get('/getAll', async (req, res) => {
    const lis = await List.find();
    res.send(lis);
});

app.get('/getById/:id', async (req, res) => {
    const id = req.params.id;
    const li = await List.findOne({ _id: id });
    res.send(li);
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const l = await List.deleteOne({ _id: id });
    res.send(l);
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const l = await List.updateOne({ _id: id }, { $set: { title, description } });
    res.send(l);
});

// Start the Server
app.listen(10000, () => {
    console.log("Server is running on port 10000");
});
