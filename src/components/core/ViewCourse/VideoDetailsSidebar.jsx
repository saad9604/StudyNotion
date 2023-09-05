import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../Common/IconBtn"
import AssignmentModal from "./AssignmentModal"

export default function VideoDetailsSidebar({
  setReviewModal,
  setAssignmentModal,
}) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const [videoSidebarActive, setVideoSidebarActive] = useState(false)
  function activateVideoSidebar() {
    setVideoSidebarActive(!videoSidebarActive)
  }

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div
        className={`flex h-[calc(100vh-3.5rem)] ${
          videoSidebarActive ? "w-full" : "w-[50px]"
        } w-[50px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 lg:w-[320px] lg:max-w-[350px]`}
      >
        {videoSidebarActive ? (
          <TbLayoutSidebarRightExpand
            onClick={activateVideoSidebar}
            className={`static mb-5 text-4xl text-richblack-100 md:hidden ${
              videoSidebarActive ? "translate-x-4" : "translate-x-2"
            } translate-x-2 translate-y-6`}
          />
        ) : (
          <TbLayoutSidebarLeftExpand
            onClick={activateVideoSidebar}
            className={`static mb-5 text-4xl text-richblack-100 md:hidden ${
              videoSidebarActive ? "translate-x-4" : "translate-x-2"
            } translate-x-2 translate-y-6`}
          />
        )}

        <div
          className={`mx-5 ${
            videoSidebarActive ? "flex" : "hidden"
          } flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25 transition-all duration-1000 ease-in-out lg:flex`}
        >
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 text-richblack-700 hover:scale-90 lg:p-1"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div
          className={`${
            videoSidebarActive ? "flex" : "hidden"
          } h-[calc(100vh - 5rem)] flex-col overflow-y-auto transition-all duration-1000 ease-in-out lg:flex`}
        >
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    {course?.subSection.length}{" "}
                    {course?.subSection.length > 1 ? "videos" : "video"}
                  </span>
                  <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <IconBtn
          text="Submit Assignment"
          customClasses="w-[200px] flex justify-center mx-auto fixed bottom-10 left-14 "
          onclick={() => setAssignmentModal(true)}
        />
      </div>
    </>
  )
}
