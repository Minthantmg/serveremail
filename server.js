const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

const port = process.env.PORT || 8000;

// Body parser configuration for JSON and URL-encoded payloads:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS for wider accessibility (adjust allowed origins if needed):
app.use(cors());

// Improved email sending function with security, error handling, and retries:
async function server(email, subject, body) {
    console.log(email,subject,body)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your email provider's SMTP host
        port: 587,
        secure: false, // Use `true` for TLS, `false` for STARTTLS
        auth: {
            user: 'minthant180@gmail.com',
            pass: 'taea ndwl anfv uddj',
        },
    });

    const mailOptions = {
        from: 'minthant180@gmail.com', // Replace with your authenticated email address
        to: 'minthant12310@gmail.com',
        subject,
        text: email + body,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', 'minthant12310@gmail.com');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

app.post('/send-email', async (req, res) => {
    const { email, subject, body } = req.body;
    try {
        await server(email, subject, body);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email: ' + error.message });
    }
});

// Server startup with graceful shutdown:
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
async function gracefulShutdown() {
    console.log('Received termination signal. Shutting down...');
    console.log('Exiting...');
    process.exit(0);
}
