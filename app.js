require('dotenv').config();
const express = require('express');
const webPush = require('web-push');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
const public_vapid_key = process.env.PUBLIC_KEY;
const private_vapid_key = process.env.PRIVATE_KEY;

app.use(bodyParser.json());

// Middleware to use client folder
app.use(express.static(path.join(__dirname,"client")));


webPush.setVapidDetails('mailto:test@test.com',public_vapid_key,private_vapid_key);

// Subscribe route
app.post('/subscribe',(req,res)=>{
    // create subscription and payload
    const subscription = req.body;
    res.status(201).json({});

    const payload = JSON.stringify({title:'New message from Paxcom India'});

    webPush.sendNotification(subscription,payload).catch(err=>console.error(err));
});

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})