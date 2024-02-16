// database/mongoose.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config/config");
const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

const dbName = envConfig.dbName;
const dbConnectionString = envConfig.dbConnectionString;



// Create a function to connect with the database
exports.connectDB = async () => {
    try {
        const dbURI = `${dbConnectionString}/${dbName}`;
        await mongoose.connect(dbURI);
        console.log("connected to mongoDB");
    } catch (error) {
        console.error(`connection error: ${error}`);
        process.exit(1);
    }
};




