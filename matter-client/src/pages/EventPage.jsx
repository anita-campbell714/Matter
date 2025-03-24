import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import BookingWidget from "../BookingWidget"
import Loading from "../Loading"

export default function EventPage() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [showAllImages, setShowAllImages] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    function eighteenPlus() {
        let classes = "mb-2 bg-red mx-14"
        let age = event.age

        if (age === 0) {
            event.age = "All ages welcome!"
            return classes
        } else if (age >= 18) {
            return classes
        }
    }

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`/events/${id}`).then((response) => {
            setIsLoading(true)
            setEvent(response.data)
            setIsLoading(false)
        })
    }, [id])

    if (isLoading) {
        return <Loading />
    }

    if (!event) {
        return ""
    }

    function additionalInfoAvailable() {
        if (event.additionalInfo) {
            return true
        }
    }

    if (showAllImages) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <span className="flex justify-center">
                    <h2 className="text-3xl font-bold p-8 -mb-15 mt-10">
                        Gallery
                    </h2>
                    <button
                        onClick={() => setShowAllImages(false)}
                        className="flex fixed right-5 top-10 bg-tertiary text-white rounded-md shadow shadow-gray-500 border border-2 border-gray-300 gap-1 py-1 px-1 items-center mx-1 -my-7 hover:font-bold hover:text-tertiary hover:bg-white"
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
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        Close image viewer
                    </button>
                </span>
                <h2 className="text-3xl text-center p-8 mb-3">{event.title}</h2>

                <div className="bg-black -my-8 p-8 grid gap-4">
                    {event?.images.length > 0 &&
                        event.images.map((image) => (
                            <img
                                className="rounded-md"
                                key={event.images.indexOf(image)}
                                src={
                                    "https://matter-backend.onrender.com/api/uploads/" +
                                    image
                                }
                                alt=""
                            />
                        ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8">
            <h1 className="text-3xl text-center text-white font-bold px-3 py-1 mb-1 rounded-md bg-tertiary">
                {event.title}
            </h1>
            <br />
            <div className="relative">
                <div className="grid gap-1 grid-cols-[2fr_1fr] mb-4 bg-tertiary rounded-md overflow-hidden p-1">
                    <div>
                        {event.images?.[0] && (
                            <div>
                                <img
                                    onClick={() => setShowAllImages(true)}
                                    className="cursor-pointer aspect-square rounded-md object-cover"
                                    src={
                                        "https://matter-backend.onrender.com/api/uploads/" +
                                        event.images[0]
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {event.images?.[1] && (
                            <img
                                onClick={() => setShowAllImages(true)}
                                className="cursor-pointer aspect-square rounded-md object-cover"
                                src={
                                    "https://matter-backend.onrender.com/api/uploads/" +
                                    event.images[1]
                                }
                            />
                        )}
                        <div className="overflow-hidden">
                            {event.images?.[2] && (
                                <img
                                    onClick={() => setShowAllImages(true)}
                                    className="cursor-pointer aspect-square rounded-md object-cover relative top-2"
                                    src={
                                        "https://matter-backend.onrender.com/api/uploads/" +
                                        event.images[2]
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowAllImages(true)}
                    className="flex items-center gap-2 absolute bottom-3 right-2 py-1 px-2 bg-tertiary text-white rounded-md shadown shadow-md shadow-gray-500 border border-2 border-gray-300 hover:font-bold hover:text-tertiary hover:bg-white"
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
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        />
                    </svg>
                    More images
                </button>
            </div>
            <div className="text-center text-xl text-white bg-tertiary rounded-2xl font-bold py-1 mx-14">
                <h2 className="mb-2 mt-2 border-b mx-7 my-7 p-2">
                    Price: £{event.price.toFixed(2)}
                </h2>
                <h2 className="mt-2">Minimum age:</h2>
                <h2 className={eighteenPlus()}>{event.age}</h2>
            </div>
            <br />
            <h2 className="font-bold text-center text-lg text-black -mx-5 px-5 py-2 mb-1 rounded-md bg-primary">
                Date | Time | Location
            </h2>
            <div className="flex gap-10 justify-center mt-4 mb-4">
                <div>
                    <h2>DATE: {event.eventDate}</h2>
                </div>
                <div>
                    <h2>
                        TIME: {event.startTime} - {event.endTime}
                    </h2>
                </div>
            </div>
            <div className="flex justify-center">
                <a
                    target="_blank"
                    className="flex gap-1 block font-semibold underline"
                    href={"https:maps.google.com/?q=" + event.address}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                    </svg>
                    {event.address}
                </a>
            </div>
            <br />
            <h2 className="font-bold text-lg text-center text-black -mx-5 px-5 py-2 mb-5 rounded-md bg-primary">
                About this event
            </h2>
            <h2 className="text-center">{event.description}</h2>
            <br />
            <h2 className="font-bold text-lg text-center text-black -mx-5 px-5 py-2 mb-5 rounded-md bg-primary">
                Additional Information
            </h2>
            <h2 className="text-center">
                {additionalInfoAvailable() &&
                    event.additionalInfo.map((info) => {
                        return (
                            <div
                                key={event.additionalInfo.indexOf(info)}
                                className="flex justify-center gap-1 mb-3"
                            >
                                <div>{info}</div>

                                <div className="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )
                    })}
            </h2>
            <BookingWidget event={event} />
        </div>
    )
}
