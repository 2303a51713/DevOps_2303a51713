const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "student_id is required" }
            }
        },
        student_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "student_name is required" }
            }
        },
        roll_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: "roll_number is required" }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: "email is required" },
                isEmail: { msg: "email must be valid" }
            }
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "department is required" }
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "year must be an integer" }
            }
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "course is required" }
            }
        }
    },
    {
        tableName: "students",
        timestamps: true
    }
);

module.exports = Student;
