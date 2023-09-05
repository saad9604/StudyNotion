import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const AssignmentForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const { courseId } = useParams()
  
  const { user } = useSelector((state) => state.profile)
    
  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("assignmentNumber", data.assignmentNumber);
    formData.append("assignmentFile", data.assignmentFile[0]); // Assuming it's a single file
    formData.append("courseId", courseId)
    formData.append("studentName", user?.firstName + " " + user?.lastName)
    // Now you can submit the formData to your server
    onSubmit(formData);
  };

  return (
    <form
      className="mx-auto mt-4 max-w-sm rounded-lg bg-richblack-700 p-4 text-richblack-50 shadow-md"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-200">
          Assignment Number:
        </label>
        <input
          className="bg-richblack-700 text-gray-200 focus:outline-none focus:shadow-outline border rounded w-full px-3 py-2"
          type="text"
          {...register("assignmentNumber")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-gray-200">
          Upload PDF File:
        </label>
        <input
          className="bg-richblack-700 text-gray-200 focus:outline-none focus:shadow-outline border rounded w-full px-3 py-2"
          type="file"
          {...register("assignmentFile")}
          accept=".pdf, .zip"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="rounded bg-yellow-500 px-4 py-2 font-bold text-black focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
