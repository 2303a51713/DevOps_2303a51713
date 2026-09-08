const mongoose = require("mongoose");

async function connectDatabase() {
    const databaseUrl = process.env.MONGODB_URI;

    if (!databaseUrl) {
        throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(databaseUrl);
    console.log("Connected to MongoDB student_db");
}

module.exports = connectDatabase;