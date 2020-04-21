const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
       await mongoose.connect(db,  {
         useNewUrlParser: true,
         useUnifiedTopology: true
       });
       console.log("Database: MongoDB is now connected");
    } catch (err) {
        // Print the error on the console
        console.error(err.message);
        // Exit process with a failure
        process.exit(1);
    }

}


module.exports = connectDB;