require("dotenv").config();

const express = require("express");
const { sequelize, connectDatabase } = require("./config/database");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/students", studentRoutes);

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && error.body) {
        return res.status(400).json({ message: "Request body must be valid JSON" });
    }
    return next(error);
});

app.use((error, req, res, next) => {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
    await connectDatabase();
    await sequelize.sync();
    app.listen(port, () => {
        console.log(`Student Course Management API running on http://localhost:${port}`);
    });
}

if (require.main === module) {
    startServer().catch(() => {
        process.exitCode = 1;
    });
}

module.exports = { app, startServer };
