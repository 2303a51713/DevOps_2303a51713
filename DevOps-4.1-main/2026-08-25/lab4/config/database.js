const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_URL || process.env.POSTGRES_URL || "postgres://postgres:postgres@localhost:5432/university_db",
    {
        dialect: "postgres",
        logging: false,
        define: {
            underscored: true
        }
    }
);

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL database university_db");
    } catch (error) {
        console.error("Unable to connect to PostgreSQL:", error.message);
        throw error;
    }
}

module.exports = { sequelize, connectDatabase };
