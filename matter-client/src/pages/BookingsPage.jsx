import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios"
import { Link } from "react-router"
import { AddToCalendarButton } from "add-to-calendar-button-react"

export default function BookingsPage() {
    const [bookings, setBookings] = useState([])
    console.log(bookings)

    useEffect(() => {
        axios.get("/bookings").then((response) => {
            setBookings(response.data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div>
                <div
                    className="font-bold p-4 border rounded-lg text-tertiary text-center"
                    key={"paymentInfoDiv2"}
                >
                    <p className="bg-gray-300 rounded-xl p-2">
                        Booking an event only reserves your spot. For any events
                        that are not free, payment will be taken at the venue
                        when you arrive.
                    </p>
                    <br />
                    <p className="bg-gray-300 rounded-xl p-2 mx-8 -my-2">
                        Feel free to browse Event Details for each booking and
                        and it to your calendar.
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-10"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl text-center font-bold text-tertiary mb-5">
                    Ticket Information
                </h2>
            </div>

            <div>
                {bookings?.length > 0 &&
                    bookings.map((booking) => (
                        <div key={booking._id + "maindiv"}>
                            <div
                                key={booking._id + "title"}
                                className="text-center"
                            >
                                <div
                                    key={booking._id + "div1"}
                                    className="bg-tertiary rounded-xl p-3 mt-4 mb-10 text-white"
                                >
                                    <div className="grid grid-rows-2 p-2">
                                        <div className="font-bold text-xl">
                                            Booking ref:
                                        </div>
                                        <div>{booking._id}</div>
                                    </div>
                                    <div className="grid justify-center">
                                        <div className="mb-3 mt-3">
                                            <Link
                                                to={`/event/${booking.place}`}
                                                className="font-bold border bg-white text-tertiary p-2 text-lg hover:bg-tertiary hover:text-white cursor-pointer"
                                                key={
                                                    booking._id + booking.place
                                                }
                                            >
                                                Event Details
                                            </Link>
                                        </div>
                                        <div className="font-bold text-2xl items-center text-tertiary hover:text-white underline rounded-2xl my-3 py-1 mt-1 mb-1 mx-3 cursor-pointer">
                                            <AddToCalendarButton
                                                name="Add event name and date"
                                                startDate="2000-01-01"
                                                options={[
                                                    "Apple",
                                                    "Google",
                                                    "Yahoo",
                                                    "iCal",
                                                ]}
                                            ></AddToCalendarButton>
                                        </div>
                                    </div>
                                    <br />
                                    <h2
                                        key={booking._id + "ticket"}
                                        className="text-xl font-bold pt-7 border-t"
                                    >
                                        Ticket holder
                                    </h2>
                                    <div
                                        className="mb-4"
                                        key={booking._id + booking.name}
                                    >
                                        {booking.name}
                                    </div>
                                    <h2
                                        key={booking._id + "emailadd"}
                                        className="text-xl font-bold"
                                    >
                                        Email address:
                                    </h2>
                                    <div
                                        className="mb-4"
                                        key={booking._id + booking.email}
                                    >
                                        {booking.email}
                                    </div>
                                    <h2
                                        key={booking._id + booking.number}
                                        className="text-xl font-bold"
                                    >
                                        Phone:
                                    </h2>
                                    <div
                                        className="mb-4"
                                        key={booking._id + booking.phone}
                                    >
                                        {booking.phone}
                                    </div>
                                    <div className="border mx-20">
                                        <div
                                            key={booking._id + "tickets"}
                                            className="mb-4 text-2xl font-bold bg-white text-tertiary"
                                        >
                                            {booking.tickets} x Tickets
                                        </div>
                                        <h2
                                            key={booking._id + "total"}
                                            className="text-2xl font-bold"
                                        >
                                            Total Price
                                        </h2>
                                        <div
                                            key={booking._id + booking.price}
                                            className="mb-4 text-2xl"
                                        >
                                            £{booking.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {/* <Link to={`/events/${id}`}></Link> */}
        </div>
    )
}
