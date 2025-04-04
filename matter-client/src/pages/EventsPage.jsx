import { Link } from "react-router"
import AccountNav from "../AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../Loading"

export default function EventsPage() {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get("/user-events").then(({ data }) => {
            setEvents(data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <div className="grid grid-rows-2 items-center flex justify-center">
                    <div>
                        <h2 className="text-3xl mt-5 mb-3">My Events</h2>
                    </div>
                    <Link
                        className="inline-flex gap-1 bg-white border border-primary border-2 text-tertiary hover:text-white py-2 items-center px-4 font-bold text-lg rounded-full hover:bg-tertiary mb-4"
                        to="/account/events/new"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        Create a new event
                    </Link>
                </div>
                <div>
                    <h2 className="text-3xl mt-10 mb-5 p-3 border-t border-gray-300">
                        Edit existing events
                    </h2>
                </div>
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
                                                "https://matter-backend.onrender.com/api/uploads/" +
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
