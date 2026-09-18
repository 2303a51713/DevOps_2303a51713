const mongoose = require("mongoose");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const studentSchema = new mongoose.Schema(
    {
        // unique creates a MongoDB index; duplicate values are handled in server.js.
        studentId: {
            type: String,
            required: [true, "studentId is required"],
            unique: true,
            trim: true
        },
        studentName: {
            type: String,
            required: [true, "studentName is required"],
            trim: true
        },
        department: {
            type: String,
            required: [true, "department is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
            lowercase: true,
            // This validator rejects values that do not have a basic email format.
            match: [emailPattern, "Please provide a valid email address"]
        },
        cgpa: {
            type: Number,
            required: [true, "cgpa is required"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);