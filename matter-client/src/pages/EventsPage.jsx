import { Link } from "react-router"
import AccountNav from "../AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"

export default function EventsPage() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        axios.get("/user-events").then(({ data }) => {
            setEvents(data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link
                    className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full hover:bg-tertiary"
                    to="/account/events/new"
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Create an event
                </Link>
                <div className="mt-4">
                    {events.length > 0 &&
                        events.map((event) => (
                            <Link
                                to={"/account/events/" + event._id}
                                key={event._id}
                                className="flex justify-between cursor-pointer gap-4 bg-gray-300 p-4 rounded-2xl mb-4 hover:bg-tertiary hover:text-white"
                            >
                                <div className="flex justify-center rounded-2xl bg-gray-200 w-40 h-40 grow shrink-0">
                                    {event.images.length > 0 && (
                                        <img
                                            className="object-cover"
                                            src={
                                                "http://localhost:4000/api/uploads/" +
                                                event.images[0]
                                            }
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div className="grow-0 shrink">
                                    <h2 className="text-xl">{event.title}</h2>
                                    <p className="text-sm mt-2 line-clamp-5 ">
                                        {event.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}
