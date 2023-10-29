const mongoose = require("mongoose");

// Define the Profile schema
const studentDetailsSchema = new mongoose.Schema({
    age: {type: Number},
    experience: { type: String },
    learn: { type: String },
    interest: { type: String },
    spendTime: { type: String },
    year: { type: String },
    department: { type: String }
});

// Export the Profile model
module.exports = mongoose.model("StudentDetails", studentDetailsSchema);