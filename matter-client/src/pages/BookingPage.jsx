import { Link, useParams } from "react-router"

export default function BookingPage() {
    const { id } = useParams()

    function copyEventRef() {
        var copyText = document.getElementById("eventRef")

        copyText.select()
        copyText.setSelectionRange(0, 99999)

        navigator.clipboard.writeText(copyText.value)

        alert("Copied the text: " + copyText.value)
    }

    return (
        <div>
            <div className="text-center items-center mt-20">
                <div className="">
                    <h2 className="text-2xl p-1 mb-4">
                        Your event has been booked!
                    </h2>
                    <div className="text-xl p-2 rounded-2xl mb-3 grid gap-7 bg-tertiary text-white">
                        <div className="mt-5 mb-6">
                            To view your booking confirmation, head over to{" "}
                            <Link
                                to={"/account/bookings"}
                                className="underline"
                            >
                                My Booked Events
                            </Link>{" "}
                            in your account panel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
