import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router"

export default function HomePage() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        axios.get("/events").then((response) => {
            setEvents(response.data)
        })
    }, [])

    return (
        <div>
            <div>
                <h1 className="text-center mt-8 text-2xl">Browse Events</h1>
            </div>
            <div className="mt-8 gap-x-6 gap-y-8 text-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {events.length > 0 &&
                    events.map((event) => (
                        <Link
                            to={"/event/" + event._id}
                            className="bg-gray-200 rounded-2xl p-2"
                            key={event._id}
                        >
                            <div className="bg-gray-500 p-1 rounded-2xl flex">
                                {event.images?.[0] && (
                                    <img
                                        className="rounded-2xl object-cover aspect-square"
                                        src={
                                            "http://localhost:4000/api/uploads/" +
                                            event.images?.[0]
                                        }
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="p-2">
                                <h2 className="mt-2 truncate bg-tertiary rounded-2xl p-1 text-lg text-white font-bold">
                                    {event.title}
                                </h2>
                                <h3 className="text-sm mt-2 truncate">
                                    {event.description}
                                </h3>
                                <br />
                                <div className="bg-gray-200 rounded-2xl">
                                    <h3 className="text-md font-bold">
                                        {event.eventDate}
                                    </h3>
                                    <h3 className="text-md">{event.address}</h3>
                                    <h3 className="text-md mt-2 mb-2">
                                        {event.startTime} - {event.endTime}
                                    </h3>
                                    <span className="text-lg bg-tertiary text-white rounded-xl px-3 py-1 font-bold">
                                        £{event.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}
