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

app.post("/sign-up", async (req, res) => {
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
        res.status(200).json("Account created");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/log-in", async (req, res) => {
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

app.post("/equipments", async (req, res) => {
    const { image, name, contact, owner } = req.body;

    try {
        const newEquipment = new Equipment({
            image,
            name,
            contact,
            owner,
        });

        await newEquipment.save();

        res.status(200).json("Equipment Added");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
