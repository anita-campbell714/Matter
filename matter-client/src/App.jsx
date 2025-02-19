import "./App.css"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import CreateAnAccountPage from "./pages/CreateAnAccountPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import AccountPage from "./pages/AccountPage"

axios.defaults.baseURL = "http://localhost:4000/api"
axios.defaults.withCredentials = true

export default function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="/home" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/create-an-account"
                        element={<CreateAnAccountPage />}
                    />
                    <Route
                        path="/account/:subpage?"
                        element={<AccountPage />}
                    />
                    <Route
                        path="/account/:subpage/:action"
                        element={<AccountPage />}
                    />
                </Route>
            </Routes>
        </UserContextProvider>
    )
}
