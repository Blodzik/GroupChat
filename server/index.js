require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://blodzik:nUWWqqaIJbWT6EQm@chat.etopo.mongodb.net/";

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server);

//import model from another file
const userMsg = require('./models/model');

console.log(port);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

app.get('/api', (req, res) =>  {
    getOldMessages()
    console.log("msg")
});

mongoose.connect(mongoUri)
    .then((result) => {
        server.listen(port);
        console.log('Connected to DB');
    })
    .catch((err) => console.log(err));

async function saveMsg(msg) {
    try {
        const newMsg = new userMsg({
            username: "testUsr",
            message: msg
        });
        const userInDB = await newMsg.save();
    } 
    catch(err) {
        console.error("error saving usr")
    }
}

async function getOldMessages() {
    try {
        const oldMessages = await userMsg.find()
        console.log("messages: ", oldMessages)

    } 
    catch(err) {
        console.error("error getting messages")
        throw error;
    }
}



io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {

        saveMsg(msg)

        console.log('Message received: ' + msg);

        io.emit('message', msg); // Broadcast the message to all clients
    });

});
