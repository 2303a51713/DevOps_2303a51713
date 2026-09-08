const express = require("express");
const { Op } = require("sequelize");
const Student = require("../models/Student");

const router = express.Router();
const sortableFields = new Set(["student_name"]);

function parseId(id) {
    return /^[1-9]\d*$/.test(id) ? Number(id) : null;
}

function formatValidationError(error) {
    if (error.name === "SequelizeUniqueConstraintError") {
        return "roll_number or email already exists";
    }

    if (error.name === "SequelizeValidationError") {
        return error.errors.map((item) => item.message).join(", ");
    }

    return null;
}

function handleRouteError(error, res) {
    const validationMessage = formatValidationError(error);
    if (validationMessage) {
        return res.status(400).json({ message: validationMessage });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}

router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(201).json(student);
    } catch (error) {
        return handleRouteError(error, res);
    }
});

router.get("/", async (req, res) => {
    try {
        const { department, year, course, sort } = req.query;
        const where = {};

        if (department) {
            where.department = { [Op.iLike]: department };
        }
        if (course) {
            where.course = { [Op.iLike]: course };
        }
        if (year !== undefined) {
            if (!/^\d+$/.test(year)) {
                return res.status(400).json({ message: "year must be an integer" });
            }
            where.year = Number(year);
        }

        let order = [["id", "ASC"]];
        if (sort !== undefined) {
            const [field = "student_name", direction = "asc"] = sort.split(":");
            if (!sortableFields.has(field) || !["asc", "desc", "ascending", "descending"].includes(direction.toLowerCase())) {
                return res.status(400).json({ message: "sort must be student_name:asc or student_name:desc" });
            }
            const normalizedDirection = direction.toLowerCase().startsWith("desc") ? "DESC" : "ASC";
            order = [[field, normalizedDirection]];
        }

        const students = await Student.findAll({ where, order });
        return res.status(200).json(students);
    } catch (error) {
        return handleRouteError(error, res);
    }
});

router.get("/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ message: "Student ID must be a positive integer" });
    }

    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json(student);
    } catch (error) {
        return handleRouteError(error, res);
    }
});

router.put("/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ message: "Student ID must be a positive integer" });
    }

    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        await student.update(req.body);
        return res.status(200).json(student);
    } catch (error) {
        return handleRouteError(error, res);
    }
});

router.delete("/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ message: "Student ID must be a positive integer" });
    }

    try {
        const deletedCount = await Student.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        return handleRouteError(error, res);
    }
});

module.exports = router;
