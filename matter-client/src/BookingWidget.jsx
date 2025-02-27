export default function BookingWidget({ event }) {
    return (
        <div className="flex text-center justify-center">
            <div className="bg-gray-300 px-10 py-4 rounded-2xl">
                <h2 className="font-bold text-xl rounded-md mb-2">
                    Price: £{event.price}
                </h2>
                <div className="flex items-center gap-3 text-md">
                    <label className="text-lg">Tickets:</label>
                    <input
                        className="border border-gray-400"
                        type="number"
                        placeholder="1"
                    />
                    <button className="justify-center primary mb-2 flex gap-1 mt-1">
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
                        Book event
                    </button>
                </div>
            </div>
        </div>
    )
}
