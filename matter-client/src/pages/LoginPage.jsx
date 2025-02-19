import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router"
import { UserContext } from "../UserContext"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirectUser, setRedirectUser] = useState(false)
    const { setUser } = useContext(UserContext)

    async function handleLoginSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post("/login", { email, password })
            setUser(response.data)
            alert("Login successful!")
            setRedirectUser(true)
        } catch (error) {
            alert("Login failed")
        }
    }

    if (redirectUser) {
        return <Navigate to={"/home"} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-lg mx-auto" onSubmit={handleLoginSubmit}>
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
                        autoComplete="true"
                    />
                    <button className="primary text-xl">Login</button>
                    <div className="text-center py-2 text-gray-700">
                        Don't have an account?{" "}
                        <Link
                            className="font-bold underline"
                            to="/create-an-account"
                        >
                            Click here to create one
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
