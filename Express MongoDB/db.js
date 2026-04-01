const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect("mongodb+srv://anvesh:anvesh1234@abes-6th-sem.9plssib.mongodb.net/StudentDB")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB: ", err);
    });
}
module.exports = connectDB;