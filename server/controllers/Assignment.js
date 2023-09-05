const Assignment = require("../models/Assignment")
const Course = require("../models/Course")

const { uploadImageToCloudinary } = require("../utils/imageUploader")

// create assignment
exports.assignment = async (req, res) => {
  try {
    //destructure
    const userId = req.user.id
    const { assignmentNumber, courseId, studentName } = req.body
    const assignmentFile = req.files.assignmentFile
    console.log("Req body: ", req.body)

    //validation
    if (!assignmentNumber || !assignmentFile) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      })
    }

    //upload to cloduinary
    const uploadDetails = await uploadImageToCloudinary(
      assignmentFile,
      process.env.FOLDER_NAME
    )

    console.log(uploadDetails)

    //db call
    const result = await Assignment.create({
      assignmentNumber,
      assignmentFile: uploadDetails.secure_url,
      student: userId,
      course: courseId,
      studentName: studentName,
    })

    console.log("printing result: ", result)

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { assignmentsSubmitted: result._id } },
      { new: true }
    ).populate("assignmentsSubmitted")

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Assignment submitted successfully",
        data: result,
      })
    }
  } catch (error) {
    console.error("Failed to upload Assignment: ", error)
    res.status(500).json({
      success: false,
      message: "Failed to upload Assignment",
      error: error.message,
    })
  }
}

// get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    //destructuring
    const courseId  = req.body

    //validation
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "CourseId not found",
      })
    }

    // fetch assignments from db
    const response = await Assignment.find({}).populate("course").exec()
    console.log("assignment response: ", response)

    return res.status(200).json({
      success: true,
      message: "All Assignment fetched successfully",
      data: response
    })
  } catch (error) {
    console.error("Failed to fetch All Assignment: ", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch All Assignment",
      error: error.message,
    })
  }
}
