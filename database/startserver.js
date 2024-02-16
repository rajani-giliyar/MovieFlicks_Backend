const dotenv = require("dotenv")

const dboMongoose = require("./mongoose");
const config = require("../../config/config");
const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

const port = envConfig.PORT || 5000

dotenv.config();

exports.startServer = async(app) => {
     try {
        await dboMongoose.connectDB();

        app.listen(port,() => {
           console.log(`server is running on http://localhost : ${port}`)
        })
     } catch (error) {
        console.log(`Server is running at http://localhost:${port}`)
     }
}

