require("dotenv").config();

const express = require("express");
const connectDatabase = require("./db");
const Student = require("./models/Student");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

function validateStudentInput(body, partial = false) {
    if (!body || Array.isArray(body) || typeof body !== "object") {
        return "Request body must be a JSON object";
    }

    const fields = ["studentId", "studentName", "department", "email", "cgpa"];
    const missingFields = partial
        ? []
        : fields.filter((field) => body[field] === undefined || body[field] === null || body[field] === "");

    if (missingFields.length > 0) {
        return `${missingFields.join(", ")} ${missingFields.length === 1 ? "is" : "are"} required`;
    }

    if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
        return "Please provide a valid email address";
    }

    if (body.cgpa !== undefined && (typeof body.cgpa !== "number" || Number.isNaN(body.cgpa))) {
        return "cgpa must be a number";
    }

    return null;
}

function handleDatabaseError(error, res) {
    if (error.code === 11000) {
        return res.status(400).json({ message: "studentId must be unique" });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}

app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: 1 });
        return res.status(200).json(students);
    } catch (error) {
        return handleDatabaseError(error, res);
    }
});

app.post("/api/students", async (req, res) => {
    try {
        const validationMessage = validateStudentInput(req.body);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const student = await Student.create(req.body);
        return res.status(201).json(student);
    } catch (error) {
        return handleDatabaseError(error, res);
    }
});

app.get("/api/students/search/:department", async (req, res) => {
    try {
        const department = req.params.department.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const students = await Student.find({
            department: { $regex: `^${department}$`, $options: "i" }
        });
        return res.status(200).json(students);
    } catch (error) {
        return handleDatabaseError(error, res);
    }
});

app.get("/api/students/sort/cgpa", async (req, res) => {
    try {
        const students = await Student.find().sort({ cgpa: -1 });
        return res.status(200).json(students);
    } catch (error) {
        return handleDatabaseError(error, res);
    }
});

app.get("/api/students/count/total", async (req, res) => {
    try {
        const total = await Student.countDocuments();
        return res.status(200).json({ total });
    } catch (error) {
        return handleDatabaseError(error, res);
    }
});

async function updateStudent(req, res) {
    try {
        const validationMessage = validateStudentInput(req.body, true);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json(student);
    } catch (error) {
        return handleDatabaseError(error, res);
    }
}

app.put("/api/students/:id", updateStudent);
app.patch("/api/students/:id", updateStudent);

app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student deleted successfully", student });
    } catch (error) {
        return handleDatabaseError(error, res);
    }
});

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && error.body) {
        return res.status(400).json({ message: "Request body must be valid JSON" });
    }

    return res.status(500).json({ message: "Internal server error" });
});

if (require.main === module) {
    connectDatabase()
        .then(() => {
            app.listen(port, () => {
                console.log(`Student Information API running on http://localhost:${port}`);
            });
        })
        .catch((error) => {
            console.error("Unable to connect to MongoDB:", error.message);
            process.exitCode = 1;
        });
}

module.exports = app;