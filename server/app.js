// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const User = require("./models/user");
const Job = require("./models/job");
const Equipment = require("./models/equip");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require('http');    // to create a server for real-time connection
require('dotenv').config();      // importing the dot env file
const uuid = require("uuid");
const db = require("./config/db");
// const validator = require('validator');
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
    })
);

const PORT = process.env.PORT || 3000;

// Set up routes...

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
const User = require('./models/user'); // Import the User model

app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            throw new Error("Please provide all required information (name, email, password, role)");
        }

        const existingUser = await db.execute(
            "SELECT * FROM signup WHERE email = ?",
            [email]
        );
        if (existingUser[0].length > 0) {
            throw Error("Email already exists. Please choose a different email.");
        }

        const id = uuid.v4();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let sql = `INSERT INTO signup (name, email, password, role)
                     VALUES ('${name}', '${email}', '${hash}', '${role}')`;

        await db.execute(sql, [name, email, hash, role]);
        res.status(200).json({ message: "Congratulations, your account has been created", user: newUser });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(400).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log('Login request received');
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);

    try {
        if (!email) throw Error('Please insert your email');
        if (!password) throw Error('Please insert your password');

        // Check if the email and password match the user in the database
        const user = await db.execute('SELECT * FROM signup WHERE email = ?', [email]);

        if (user[0].length === 0) {
            throw Error('Invalid email or password');
        }

        const { id, name, password: storedPassword } = user[0][0];

        const isMatch = await bcrypt.compare(password, storedPassword);
        if (!isMatch) {
            throw Error('Invalid email or password!');
        }

        // Generate JWT token
        const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1hr' });

        res.status(200).json({ id, name, token, message: 'Login successful!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// JOB PAGE BACKEND

// app.js

app.post("/jobs", async (req, res) => {
    const { name, description, owner, contact, location } = req.body;

    try {
        // Call a function to save the job data to the database
        await saveJob({ name, description, owner, contact, location });

        res.status(200).json("Job Added");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Function to save job data to the database
// Function to save job data to the database
async function saveJob(jobData) {
    try {
        await db.execute('INSERT INTO jobs (name, description, owner, contact, location) VALUES (?, ?, ?, ?, ?)', [
            jobData.name,
            jobData.description,
            jobData.owner,
            jobData.contact,
            jobData.location
        ]);

        // If insertion is successful, return true or any desired value
        return true;
    } catch (error) {
        // Log detailed error message
        console.error("Error saving job data:", error.message);
        throw new Error("Error saving job data");
    }
}

const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define the filename for the uploaded file
    }
});

// Create an instance of Multer with the defined storage
const upload = multer({ storage: storage });

// Use Multer middleware to handle file uploads
app.post("/equipments", upload.single('image'), async (req, res) => {
    // req.file contains information about the uploaded file
    const imageFile = req.file;

    const { name, contact, owner } = req.body;

    try {
        if (!imageFile) {
            throw new Error('Image file is required');
        }

        const imageFileName = imageFile.filename;
        const imageFilePath = path.join(__dirname, 'uploads', imageFileName);

        // Save the file path and other equipment details to the database
        const newEquipment = await saveEquipmentToDatabase({
            image: imageFilePath,
            name,
            contact,
            owner,
        });

        res.status(200).json(newEquipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Function to save equipment data to the database
async function saveEquipmentToDatabase(equipmentData) {
    try {
        // Your logic for saving equipment data to the database goes here
        // For example, if you're using a SQL database, you would execute an INSERT query
        // For a NoSQL database like MongoDB, you would use the appropriate method to save data

        // Example for SQL database (assuming you're using MySQL)
        await db.execute('INSERT INTO equipments (image, name, contact, owner) VALUES (?, ?, ?, ?)', [
            equipmentData.image,
            equipmentData.name,
            equipmentData.contact,
            equipmentData.owner
        ]);

        // Return the saved equipment data
        return equipmentData;
    } catch (error) {
        throw new Error("Error saving equipment data to the database");
    }
}



app.patch('/changeinfo ', async (req, res) => {
    const { name, email, newPassword } = req.body;

    try {
        if (!name) throw Error('Please insert your ');
        if (!email) throw Error('Please insert your email');
        if (!newPassword) throw Error('Please insert your new password');

        // Check if the email exists in the database
        const user = await db.execute('SELECT * FROM signup WHERE email = ?', [email]);

        if (user[0].length === 0) {
            throw Error('Email not found. Please enter a valid email.');
        }

        // Update the user's password in the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const sql = 'UPDATE signup SET name = ? password = ? WHERE email = ?';
        await db.execute(sql, [name, hash, email]);

        res.status(200).json({ message: 'Info has been changed' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/user/:id', async (req, res) => {
    // const { user_id } = req.params;
    const user_id = req.params.user_id !== undefined ? req.params.user_id : null;


    try {
        // Fetch user information from the database based on the provided ID
        const user = await db.execute('SELECT * FROM signup WHERE user_id = ?', [user_id]);

        if (user[0].length === 0) {
            throw Error('User not found.');
        }

        const { name, email } = user[0][0];
        res.status(200).json({ user_id, name, email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
