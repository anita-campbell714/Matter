import { Link } from "react-router"
import { useState } from "react"
import axios from "axios"

export default function CreateAnAccountPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")

    async function createUser(event) {
        event.preventDefault()
        try {
            await axios.post("/create-an-account", {
                firstName,
                lastName,
                email,
                password,
                location,
            })
            alert("Your account has been created! Now you can log in.")
        } catch (error) {
            if (error.response.status === 422) {
                response.send({
                    message:
                        "An account has already been created with this email address. Please login instead, or try again.",
                })
                return alert(
                    "An account has already been created with this email address. Please login instead, or try again."
                )
            } else {
                response.send({
                    message: "Account creation failed. Please try again.",
                })
                alert("Account creation failed. Please try again.")
            }
        }
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
                        placeholder={"your@email.com"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="true"
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
