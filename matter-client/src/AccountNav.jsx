import { Link, useLocation } from "react-router"
import { UserContext } from "./UserContext"
import { useContext } from "react"

export default function AccountNav() {
    const { pathname } = useLocation()
    const { user } = useContext(UserContext)

    const isStaff = user._id === "67b578e3b89376786fad7461"

    let subpage = pathname.split("/")?.[2]
    if (subpage === undefined) {
        subpage = "profile"
    }

    function linkClasses(type = null) {
        let classes =
            "inline-flex gap-1 px-6 rounded-full hover:bg-tertiary hover:text-white"

        if (type === subpage) {
            classes += " bg-primary text-white"
        } else {
            classes += " bg-gray-200"
        }
        return classes
    }
    function disabledLinkClasses(type = null) {
        let classes =
            "inline-flex gap-1 px-6 rounded-full hover:bg-tertiary hover:text-white border-4 border-double border-gray-500 hover:border-white"
        let buttonDisabled = "pointer-events-none opacity-50"

        if (isStaff === false) {
            return buttonDisabled
        } else if (type === subpage) {
            classes += " bg-primary text-white border-white"
        } else {
            classes += " bg-gray-200"
        }
        return classes
    }

    function disabledLinkClassesStaff(type = null) {
        let classes =
            "inline-flex gap-1 px-6 rounded-full hover:bg-tertiary hover:text-white"
        let buttonDisabled = "pointer-events-none opacity-50"

        if (isStaff === true) {
            return buttonDisabled
        } else if (type === subpage) {
            classes += " bg-primary text-white border-white"
        } else {
            classes += " bg-gray-200"
        }
        return classes
    }

    return (
        <nav className="w-full flex justify-center text-nowrap text-center mt-8 gap-2 mb-8 items-center">
            <Link className={linkClasses("profile")} to={"/account"}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
                My Profile
            </Link>
            <Link
                className={disabledLinkClassesStaff("bookings")}
                to={"/account/bookings"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                    />
                </svg>
                My Booked Events
            </Link>
            <Link
                className={disabledLinkClasses("events")}
                to={"/account/events"}
            >
                Manage My Events
            </Link>
        </nav>
    )
}
