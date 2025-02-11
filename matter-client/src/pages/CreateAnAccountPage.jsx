import { Link } from "react-router"
import { useState } from "react"
import axios from "axios"

export default function CreateAnAccountPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")

    function createUser(event) {
        event.preventDefault()
        axios.post("/create-an-account", {
            firstName,
            lastName,
            email,
            password,
            location,
        })
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Create an account</h1>
                <form className="max-w-lg mx-auto" onSubmit={createUser}>
                    <input
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <input
                        type="email"
                        placeholder={"you@email.com"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                    <button className="primary text-xl">Register</button>
                    <div className="text-center py-2 text-gray-700">
                        Already have an account?{" "}
                        <Link className="font-bold underline" to="/login">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
