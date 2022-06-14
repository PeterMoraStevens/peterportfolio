const path = require('path')
const dotenv = require('dotenv');
require('dotenv').config({path:'config/dev.env'})
dotenv.config();
console.log(process.env);

const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ADMIN_USERNAME,
            pass: process.env.ADMIN_PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: "peterwebsiteemail@gmail.com",
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})