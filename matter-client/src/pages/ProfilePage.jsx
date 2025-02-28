import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router"
import axios from "axios"
import EventsPage from "./EventsPage"
import AccountNav from "../AccountNav"

export default function ProfilePage() {
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

    if (redirectUser) {
        return <Navigate to={redirectUser} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.firstName} ({user.email}) <br />
                    <button
                        onClick={logout}
                        className="primary max-w-sm mt-2 hover:bg-tertiary"
                    >
                        Logout
                    </button>
                </div>
            )}
            {subpage === "events" && <EventsPage />}
        </div>
    )
}
