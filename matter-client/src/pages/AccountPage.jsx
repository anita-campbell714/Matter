import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router"
import axios from "axios"
import EventsPage from "./EventsPage"

export default function AccountPage() {
    const [redirectUser, setRedirectUser] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
    let { subpage } = useParams()

    if (subpage === undefined) {
        subpage = "profile"
    }

    async function logout() {
        await axios.post("/logout")
        setRedirectUser("/home")
        setUser(null)
    }

    if (!ready) {
        return "Loading..."
    }

    if (ready && !user && !redirectUser) {
        return <Navigate to={"/login"} />
    }

    function linkClasses(type = null) {
        let classes = "inline-flex gap-1 px-6 rounded-full"

        if (type === subpage) {
            classes += " bg-primary text-white"
        } else {
            classes += " bg-gray-200"
        }
        return classes
    }

    if (redirectUser) {
        return <Navigate to={redirectUser} />
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses("profile")} to={"/account"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    My Profile
                </Link>
                <Link
                    className={linkClasses("my-bookings")}
                    to={"/account/my-bookings"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                        />
                    </svg>
                    My Bookings
                </Link>
                <Link className={linkClasses("events")} to={"/account/events"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                    </svg>
                    My Events
                </Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.firstName} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">
                        Logout
                    </button>
                </div>
            )}
            {subpage === "events" && <EventsPage />}
        </div>
    )
}
