// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/user");
const Job = require("./models/job");
const Equipment = require("./models/equip");
const bcrypt = require("bcrypt");
const sql = require("sequelize");
const jwt = require("jsonwebtoken");
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
    console.log(`Server is running on port ${PORT}`);
});

app.post("/signup", async (req, res) => {
    const { fullName, email, contact, password, role } = req.body;

    try {
        if (!fullName) throw Error("Please provide your full name");
        if (!email) throw Error("Please provide your email");
        if (!contact) throw Error("Please provide your contact");
        if (!password) throw Error("Please provide your password");
        if (!role) throw Error("Please provide your role");

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw Error("Email already exists. Please choose a different email.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            contact,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(200).json("Congratulations your account has been created");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) throw Error("Please provide your email");
        if (!password) throw Error("Please provide your password");

        const user = await User.findOne({ email });
        if (!user) {
            throw Error("User not found. Please check your email or signup.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw Error("Incorrect password or Email. Please try again.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET, // Replace with your own secret key
            { expiresIn: "1h" } // Set token expiration time
        );

        // Send name and JWT token in response
        res.status(200).json({
            message: "Login successful",
            name: user.fullName,
            token: token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// JOB PAGE BACKEND

app.post("/jobs", async (req, res) => {
    const { name, description, owner, contact, location } = req.body;

    try {
        const newJob = new Job({
            name,
            description,
            owner,
            contact,
            location,
        });

        await newJob.save();

        res.status(200).json("Job Added");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// EQUIPMENT PAGE BACKEND

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

        // Create a new equipment instance and save it to the database
        const newEquipment = await Equipment.create({
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