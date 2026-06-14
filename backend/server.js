const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});