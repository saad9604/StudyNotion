import React, { useEffect, useState } from "react"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getFullDetailsOfCourse } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"

// Function to format a date as "dd/mm/yyyy"
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0") // Note: Month is zero-based
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const ViewSubmissions = () => {
  const { token } = useSelector((state) => state.auth)
  const { courseId } = useParams()
  const [assignments, setAssignments] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const downloadZipFile = async (zipUrl, assignment) => {
    setDownloading(true)

    console.log("zipUrl: ", zipUrl)
    try {
      const response = await fetch(zipUrl)
      const blob = await response.blob()

      // Create a new ZIP archive
      const zip = new JSZip()

      // Add the fetched content to the ZIP archive
      zip.file(
        `${
          assignment?.student[0]?.firstName +
          " " +
          assignment?.student[0]?.lastName
        }.zip`,
        blob
      )

      // Generate the ZIP content
      const zipContent = await zip.generateAsync({ type: "blob" })

      // Save the ZIP content as a file
      saveAs(
        zipContent,
        `${
          assignment?.student[0]?.firstName +
          " " +
          assignment?.student[0]?.lastName +
          "-" +
          assignment?.assignmentNumber
        }.zip`
      )
    } catch (error) {
      console.error("Error downloading or creating ZIP:", error)
    }

    setDownloading(false)
  }

  useEffect(() => {
    fetchAssignment()
  }, [])

  const fetchAssignment = async () => {
    try {
      const response = await getFullDetailsOfCourse(courseId, token)
      const courseDetails = response?.courseDetails
      console.log("courseDt: ", courseDetails)

      // Sort assignments by date in descending order
      const sortedAssignments = courseDetails?.assignmentsSubmitted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )

      setAssignments({
        ...courseDetails,
        assignmentsSubmitted: sortedAssignments,
      })
    } catch (error) {
      console.error("Error fetching assignments:", error)
    }
  }

  return (
    <div className="text-white">
      <div className="flex items-center gap-4">
        <img
          className="min-h-[170px] max-w-[250px] rounded-lg object-cover"
          src={assignments?.thumbnail}
          alt=""
        />
        <div>
          <h1 className="mb-5 text-3xl font-bold">
            {assignments && assignments?.courseName}
          </h1>
          <p className="text-yellow-50">Submitted Assignments</p>
        </div>
      </div>

      {assignments && assignments.assignmentsSubmitted && (
        <table className="border-gray-300 mt-20 w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border-gray-300 border px-4 py-2 text-left">
                Assignment No
              </th>
              <th className="border-gray-300 border px-4 py-2 text-left">
                Student Name
              </th>
              <th className="border-gray-300 border px-4 py-2 text-left">
                Date Submitted
              </th>
              <th className="border-gray-300 border px-4 py-2 text-left">
                File
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments.assignmentsSubmitted.map((assignment) => (
              <tr key={assignment._id}>
                <td className="border-gray-300 border px-4 py-2">
                  {assignment?.assignmentNumber}
                </td>
                <td className="border-gray-300 border px-4 py-2">
                  {assignment?.student[0]?.firstName +
                    " " +
                    assignment?.student[0]?.lastName}
                </td>
                <td className="border-gray-300 border px-4 py-2">
                  {formatDate(assignment?.createdAt)}
                </td>
                <td
                  className="border-gray-300 border px-4 py-2"
                  onClick={() => {
                    downloadZipFile(assignment?.assignmentFile, assignment)
                  }}
                >
                  <IconBtn text="Download" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ViewSubmissions
