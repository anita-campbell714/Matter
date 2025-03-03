import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router"
import { UserContext } from "./UserContext"

export default function BookingWidget({ event }) {
    const [quantity, setQuantity] = useState(0)
    const ticketPrice = event.price.toFixed(2)
    const total = (quantity * ticketPrice).toFixed(2)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState("")
    const [place, setPlace] = useState(event._id)
    const [totalCost, setTotalCost] = useState(total)
    const [dateOfEvent, setDateOfEvent] = useState(event.eventDate)
    const [title, setTitle] = useState(event.title)

    const [redirectUser, setRedirectUser] = useState("")
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setName(user.firstName)
            setEmail(user.email)
        }
    }, [user])

    async function bookThisEvent() {
        const response = await axios.post("/bookings", {
            name,
            phone,
            email,
            place: event._id,
            title: event.title,
            tickets: quantity,
            price: total,
            eventDate: event.eventDate,
            startTime: event.startTime,
            endTime: event.endTime,
            address: event.address,
        })
        const bookingId = response.data._id
        setRedirectUser(`/account/bookings/${bookingId}`)
    }

    if (redirectUser) {
        return <Navigate to={redirectUser} />
    }

    return (
        <div className="flex text-center justify-center mt-10">
            <div className="bg-gray-300 px-10 py-4 rounded-2xl">
                <h2 className="font-bold text-2xl rounded-2xl mb-2 p-1">
                    Price: £{event.price.toFixed(2)}
                </h2>
                <div className="flex justify-center items-center gap-3 text-md">
                    <div>
                        <label className="text-md">Quantity:</label>
                    </div>
                    <div>
                        <input
                            className="border border-gray-400 hover:bg-tertiary hover:text-white focus:bg-tertiary focus:text-white"
                            type="number"
                            value={quantity}
                            onChange={(event) =>
                                setQuantity(event.target.value)
                            }
                            placeholder="1"
                        />
                    </div>
                </div>
                <div className="bg-tertiary rounded-xl p-3 mt-4 mb-4">
                    <div className="text-xl font-bold text-white mb-4">
                        Ticket Summary:
                    </div>
                    <div className=" flex rounded-md justify-evenly">
                        <div className="text-xl font-bold text-white">
                            {quantity} x tickets
                        </div>
                        <div className="font-bold text-xl text-white mb-1">
                            Total: £{total}
                        </div>
                    </div>
                    <div className="mt-5">
                        <span className="text-white">
                            Booking this event only reserves your spot. For any
                            events that are not free, payment will be taken at
                            the venue when you arrive.
                        </span>
                        <div className="text-white mt-10 font-bold">
                            Please take a moment to fill in your details below
                            before booking.
                        </div>
                    </div>
                    <div className="text-center">
                        {quantity > 0 && (
                            <form
                                // ref={form}
                                onSubmit={sendEmail}
                                className="text-white mt-10 mb-1"
                            >
                                <div className="mb-14 border-b">
                                    <label>Your full name:</label>
                                    <div className="mb-5">
                                        <input
                                            name="user_name"
                                            className="text-tertiary text-center"
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                        />
                                    </div>
                                    <label>Contact number:</label>
                                    <div className="mb-5">
                                        <input
                                            name="user_number"
                                            className="text-tertiary text-center"
                                            type="tel"
                                            placeholder="070 000 0000"
                                            value={phone}
                                            onChange={(event) =>
                                                setPhone(event.target.value)
                                            }
                                        />
                                    </div>
                                    <label>Email address:</label>
                                    <div className="mb-5">
                                        <input
                                            name="user_email"
                                            className="text-tertiary text-center"
                                            type="text"
                                            placeholder="your-email@gmail.com"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="-mt-10 opacity-60 border grid p-2 grid-cols-2 gap-4 items-center">
                                    <div className="">
                                        <label className="justify-center">
                                            Event:
                                        </label>
                                        <div className="mb-5">
                                            <input
                                                name="event_title"
                                                readOnly
                                                className="text-tertiary text-center"
                                                type="text"
                                                value={title}
                                                onChange={(event) =>
                                                    setTitle(event.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label>Event Date:</label>
                                        <div className="mb-5">
                                            <input
                                                name="event_date"
                                                readOnly
                                                className="text-tertiary text-center"
                                                type="text"
                                                value={dateOfEvent}
                                                onChange={(event) =>
                                                    setDateOfEvent(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label>Event Ref:</label>
                                        <div className="mb-5">
                                            <input
                                                name="event_ref"
                                                readOnly
                                                className="text-tertiary text-center"
                                                type="text"
                                                value={place}
                                                onChange={(event) =>
                                                    setPlace(event.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label>Tickets:</label>
                                        <div className="mb-5">
                                            <input
                                                name="event_tickets"
                                                readOnly
                                                className="text-tertiary text-center"
                                                type="text"
                                                value={quantity}
                                                onChange={(event) =>
                                                    setQuantity(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-60 mt-5">
                                    <label>Order Total: (£)</label>
                                    <div className="mb-5">
                                        <input
                                            name="order_total"
                                            readOnly
                                            className="text-tertiary text-center"
                                            type="text"
                                            value={totalCost}
                                            onChange={(event) =>
                                                setTotalCost(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                <div className="mt-5">
                    <button
                        onClick={bookThisEvent}
                        className="justify-center items-center primary mb-1 flex gap-1 mt-1 hover:bg-tertiary text-lg text-white text-nowrap font-bold"
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
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                        </svg>
                        Book this event
                    </button>
                </div>
            </div>
        </div>
    )
}
