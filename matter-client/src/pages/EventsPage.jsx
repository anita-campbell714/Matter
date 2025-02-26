import { Link, useParams } from "react-router"

export default function EventsPage() {
    const { action } = useParams()

    return (
        <div>
            {action !== "new" && (
                <div className="text center flex justify-center">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
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
                </div>
            )}
        </div>
    )
}
