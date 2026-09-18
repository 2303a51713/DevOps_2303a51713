const express = require("express");

const app = express();
const PORT = 3000;

// Allows Express to read JSON request bodies
app.use(express.json());

// Temporary patient data
let patients = [
    {
        id: 1,
        name: "Aarav Sharma",
        age: 45,
        disease: "Diabetes"
    },
    {
        id: 2,
        name: "Meera Rao",
        age: 32,
        disease: "Migraine"
    }
];

let nextId = 3;


// ----------------------------------------------------
// GET /patients
// Get all patients
// ----------------------------------------------------
app.get("/patients", (req, res) => {
    res.status(200).json(patients);
});


// ----------------------------------------------------
// GET /patients/:id
// Get one patient
// ----------------------------------------------------
app.get("/patients/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }

    res.status(200).json(patient);
});


// ----------------------------------------------------
// POST /patients
// Create new patient
// ----------------------------------------------------
app.post("/patients", (req, res) => {

    const { name, age, disease } = req.body;

    if (!name || age === undefined || !disease) {
        return res.status(400).json({
            message: "name, age and disease are required"
        });
    }

    const newPatient = {
        id: nextId++,
        name,
        age,
        disease
    };

    patients.push(newPatient);

    res.status(201).json(newPatient);
});


// ----------------------------------------------------
// PUT /patients/:id
// Update patient
// ----------------------------------------------------
app.put("/patients/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }

    const { name, age, disease } = req.body;

    if (!name || age === undefined || !disease) {
        return res.status(400).json({
            message: "name, age and disease are required"
        });
    }

    patient.name = name;
    patient.age = age;
    patient.disease = disease;

    res.status(200).json(patient);
});


// ----------------------------------------------------
// DELETE /patients/:id
// Delete patient
// ----------------------------------------------------
app.delete("/patients/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const patientIndex = patients.findIndex(p => p.id === id);

    if (patientIndex === -1) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }

    const deletedPatient = patients.splice(patientIndex, 1);

    res.status(200).json({
        message: "Patient deleted successfully",
        patient: deletedPatient[0]
    });
});


// ----------------------------------------------------
// Start Server
// ----------------------------------------------------
app.listen(PORT, () => {
    console.log(`Hospital Management API running on http://localhost:${PORT}`);
});