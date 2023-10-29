import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { apiConnector } from "../services/apiConnector"
import { studentFormEndpoint } from "../services/apis"

const StudentsDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const StudentDetailsId = user?.studentDetails

    data.studentDetailsId = StudentDetailsId
    console.log(data)
    const toastId = toast.loading("Loading...")
    try {
      const res = await apiConnector(
        "POST",
        studentFormEndpoint.ADDSTUDENTFORM_API,
        data
      )
      console.log(res)

      if (!res.data.success) {
        throw new Error(res.data.message)
      }
      toast.success("Profile Updated Successfully")
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("ERROR MESSAGE - ", error)
    }
    toast.dismiss(toastId)
  }

  return (
    <div className="text-richblack-5">
      <div className="mx-auto max-w-[500px] space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 lg:w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-sm text-pink-200">
            NOTE: After submitting the form please login again.
          </p>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="age">
              Your Age <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { required: true })}
              className="form-style w-full"
              placeholder="Please Enter Your Age"
            />
            {errors.age && (
              <span className="text-xs text-pink-200">Age is required</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="experience">
              Your Experience <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="experience"
              {...register("experience", { required: true })}
              className="form-style w-full"
            >
              <option value="">Select Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Experienced">Experienced</option>
            </select>
            {errors.experience && (
              <span className="text-xs text-pink-200">
                Experience is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="learn">
              What do you want to study <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="learn"
              {...register("learn", { required: true })}
              className="form-style w-full"
            >
              <option value="">Select Syllabus</option>
              <option value="SPPU Syllabus">SPPU Syllabus</option>
              <option value="Technologies">Technologies</option>
              <option value="Other">Other....</option>
            </select>

            {errors.learn && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                learn is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="interest">
              What are you interested in? <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="interest"
              {...register("interest", { required: true })}
              className="form-style w-full"
              placeholder="Tell us about your interest"
            />
            {errors.interest && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                interest is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="spendTime">
              {" "}
              How much time can you spend on learning?{" "}
              <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="spendTime"
              {...register("spendTime", { required: true })}
              className="form-style w-full"
            >
              <option value="">Select Time</option>
              <option value="30 minutes">30 minutes</option>
              <option value="60 minutes">60 minutes</option>
              <option value="90 minutes">90 minutes</option>
              <option value="120 minutes">120 minutes</option>
              <option value="other">other...</option>
            </select>

            {errors.spendTime && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Spend Time is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="year">
              Your Current Year of Education{" "}
              <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="year"
              {...register("year", { required: true })}
              className="form-style w-full"
            >
              <option value="">Select Year</option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
              <option value="other">other...</option>
            </select>

            {errors.year && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                year is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="department">
              Education Department <sup className="text-pink-200">*</sup>
            </label>
            <select
              id="department"
              {...register("department", { required: true })}
              className="form-style w-full"
            >
              <option value="">Select department</option>
              <option value="Computer">Computer</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="others">others</option>
            </select>

            {errors.department && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                department is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="rounded-md bg-yellow-50 p-2 px-4 text-black hover:bg-yellow-25"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentsDetailsForm