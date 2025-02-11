import "./App.css"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import CreateAnAccountPage from "./pages/CreateAnAccountPage"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:4000/api"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/create-an-account"
                    element={<CreateAnAccountPage />}
                />
            </Route>
        </Routes>
    )
}
