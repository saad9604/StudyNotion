import { useEffect, useState } from "react"
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import {
  Link,
  Navigate,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { logout } from "../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"
import ConfirmationModal from "./ConfirmationModal"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [catalogOpen, setCatalogOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log("Printing Category: ", res)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  function handleNavBtn() {
    setIsMenuOpen(!isMenuOpen)
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks?.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        <button className="mr-4 md:hidden">
          <AiOutlineMenu onClick={handleNavBtn} fontSize={24} fill="#AFB2BF" />
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="fixed right-0 top-0 z-50 flex h-[100vh] w-[70%] flex-col items-start gap-10 bg-richblack-900 pl-10 text-richblack-100 transition-all  duration-300 ease-linear">
              <AiOutlineClose
                onClick={handleNavBtn}
                className="absolute right-8 top-4 h-6 w-6"
              />

              <div className="flex translate-y-40 justify-evenly gap-5">
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link
                    to="/dashboard/cart"
                    onClick={handleNavBtn}
                    className="relative"
                  >
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {totalItems > 0 && (
                      <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                {token === null && (
                  <Link to="/login" onClick={handleNavBtn}>
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup" onClick={handleNavBtn}>
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                )}
                {token !== null && (
                  <div onClick={handleNavBtn}>
                    <img
                      onClick={() => {
                        navigate("/dashboard/my-profile")
                      }}
                      src={user?.image}
                      alt={`profile-${user?.firstName}`}
                      className="aspect-square w-[30px] rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              <ul className="flex translate-y-40 flex-col gap-3 text-left text-lg text-richblack-100">
                {NavbarLinks.map((link, index) => {
                  return (
                    <div key={index}>
                      <li onClick={handleNavBtn}>
                        {link.title === "Catalog" ? (
                          <>
                            <div
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                              className="mb-1 flex flex-col gap-2"
                            >
                              <div
                                onClick={() => setCatalogOpen(!catalogOpen)}
                                className="flex items-center gap-2"
                              >
                                <p>{link.title}</p>
                                <BsChevronDown className="text-md rounded-full bg-richblack-100 p-1 text-richblack-900" />
                              </div>
                              {catalogOpen ? (
                                <div className="flex flex-col gap-2">
                                  {loading ? (
                                    <p className="text-center">Loading...</p>
                                  ) : subLinks?.length ? (
                                    <>
                                      {subLinks
                                        ?.filter(
                                          (subLink) =>
                                            subLink?.courses?.length > 0
                                        )
                                        ?.map((subLink, i) => (
                                          <Link
                                            to={`/catalog/${subLink.name
                                              .split(" ")
                                              .join("-")
                                              .toLowerCase()}`}
                                            className="border-b-[1px] text-yellow-100 border-richblack-100  bg-transparent  pb-1 "
                                            key={i}
                                            onClick={handleNavBtn}
                                          >
                                            <p>{subLink.name}</p>
                                          </Link>
                                        ))}
                                    </>
                                  ) : (
                                    <p className="text-center">
                                      No Courses Found
                                    </p>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <Link to={link.path}>
                              <p>{link.title}</p>
                            </Link>
                          </>
                        )}
                      </li>
                    </div>
                  )
                })}
              </ul>

              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="translate-y-40 text-sm font-medium text-richblack-300"
              >
                <div className="flex items-center gap-x-2">
                  <VscSignOut className="text-2xl" />
                  <span>Logout</span>
                </div>
              </button>
              {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar