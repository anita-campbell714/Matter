import "./App.css"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import CreateAnAccountPage from "./pages/CreateAnAccountPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import ProfilePage from "./pages/ProfilePage"
import EventsPage from "./pages/EventsPage"
import EventsFormPage from "./pages/EventsFormPage"
import EventPage from "./pages/EventPage"

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
                    <Route path="/account" element={<ProfilePage />} />
                    <Route path="/account/events" element={<EventsPage />} />
                    <Route
                        path="/account/events/new"
                        element={<EventsFormPage />}
                    />
                    <Route
                        path="/account/events/:id"
                        element={<EventsFormPage />}
                    />
                    <Route path="/event/:id" element={<EventPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    )
}
