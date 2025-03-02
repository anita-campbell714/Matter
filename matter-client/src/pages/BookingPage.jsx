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
            <div className="text-center items-center mt-10">
                <div className="">
                    <h2 className="text-2xl p-1 mb-4">
                        Your event has been booked!
                    </h2>
                    <h3 className="text-lg mb-3">To view event details:</h3>
                    <div className="mt-5 text-xl p-2 mb-3 bg-tertiary rounded-2xl text-white">
                        1. Copy the{" "}
                        <span className="font-bold">reference number </span>
                        below
                    </div>
                    <div className="grid grid-cols-2 items-center gap-3 mb-4">
                        <div>
                            <input
                                type="text"
                                value={id}
                                readOnly
                                className="mt-4"
                                id="eventRef"
                            />
                        </div>
                        <div>
                            <button onClick={copyEventRef} className="primary">
                                copy ref
                            </button>
                        </div>
                    </div>
                    <div className="text-xl p-2 mb-3 grid gap-7 bg-tertiary text-white">
                        <div>
                            <div className="mt-5">
                                2. Head over to{" "}
                                <Link
                                    to={"/account/bookings"}
                                    target="blank"
                                    className="underline"
                                >
                                    My Booked Events
                                </Link>{" "}
                                in your account panel
                            </div>
                            <div className="items-center gap-3 mx-5 my-1 text-sm"></div>
                        </div>
                        <div className="mb-6 px-10">
                            4. Hit <span className="font-bold">Ctrl+F</span>
                            {", "}
                            and paste in your reference number to view details
                            for this specific event.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
