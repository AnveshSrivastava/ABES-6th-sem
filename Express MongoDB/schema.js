const mongoose = require("mongoose");

const studentschema = new mongoose.Schema({
    rollNo : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    }
});
const Student = mongoose.model("Student", studentschema);
module.exports = Student;