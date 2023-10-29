const StudentDetails = require("../models/StudentDetails")

exports.addStudentDetails = async (request, response) => {
    try {
        const { studentDetailsId = '', age = '', experience = '', interest = '', learn = '', spendTime = '', year = '', department = '' } = request.body
        if (!studentDetailsId || !age || !experience || !interest || !learn || !spendTime || !year || !department) {
            return response.status(500).json({
                success: false,
                message: "All fields are required"
            })
        }
        const student = await StudentDetails.findByIdAndUpdate(studentDetailsId)
        student.age = age
        student.experience = experience
        student.interest = interest
        student.learn = learn
        student.spendTime = spendTime
        student.year = year
        student.department = department



        await student.save()
        if (student) {
            return response.status(200).json({
                success: true,
                message: "Student Details added successfully"
            })
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: "Something went wrong while submitting student details form"
        })
    }
}

exports.getStudentDetails = async (request, response) => {
    try {
        const { studentDetailsId } = request.body
        if (!studentDetailsId) {
            return response.status(500).json({
                success: false,
                message: "Student ID is required"
            })
        }

        const res = await StudentDetails.findById(studentDetailsId)

        if (res) {
            return response.status(200).json({
                success: true,
                res,
                message: "Student Details fetched successfully"
            })
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong while fetching Student Detais"
        })
    }
}