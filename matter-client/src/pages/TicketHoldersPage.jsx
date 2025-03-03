import { useEffect, useState } from "react"
import Loading from "../Loading"
import axios from "axios"

export default function TicketHoldersPage() {
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     setIsLoading(true)
    //     axios.get("/ticket-holders").then(({ data }) => {
    //         setIsLoading(false)
    //     })
    // }, [])

    // if (isLoading) {
    //     return <Loading />
    // }
    return (
        <div>
            <div className="text-center mt-8 text-xl">
                All ticket holders displayed here
            </div>
        </div>
    )
}
