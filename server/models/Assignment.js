const mongoose = require("mongoose");

// Define the Section schema
const assignmentSchema = new mongoose.Schema({
	studentName: {
        type: String,
    },
    assignmentNumber: {
		type: Number,
	},
	assignmentFile: {
        type: String,
    },
	student:
    [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            
            ref: "user",
        },   
    ],
    course: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    createdAt: {
		type: Date,
		default: Date.now, 
	},
});

// Export the Section model
module.exports = mongoose.model("Assignment", assignmentSchema);
