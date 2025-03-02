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
                    <Link
                        to={"/account/events/ticket-holders"}
                        className="inline-flex gap-1 bg-white border border-primary border-2 text-tertiary hover:text-white py-2 items-center px-4 font-bold text-lg rounded-full hover:bg-tertiary mb-10"
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
                                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                        Browse ticket holders
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
