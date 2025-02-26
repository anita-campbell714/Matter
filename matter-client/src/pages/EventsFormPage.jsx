import { useState } from "react"
import ImagesUploader from "../ImagesUploader"
import AdditionalInfo from "../AdditionalInfo"

export default function EventsFormPage() {
    const [title, setTitle] = useState("")
    const [age, setAge] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [addedImages, setAddedImages] = useState([])
    const [additionalInfo, setAdditionalInfo] = useState([])
    const [maxGuests, setMaxGuests] = useState(1)

    async function addNewEvent(event) {
        event.preventDefault()
        await axios.post("/events", {
            title,
            age,
            eventDate,
            startTime,
            endTime,
            address,
            price,
            description,
            addedImages,
            additionalInfo,
            maxGuests,
        })
    }

    return (
        <div>
            <div className="text-2xl center flex justify-center mb-8">
                New event
            </div>
            <form onSubmit={addNewEvent}>
                <h2 className="text-lg mt-4">Title</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="e.g.: Crochet with Friends"
                />
                <h2 className="text-lg mt-4">Minimum age</h2>
                <input
                    type="number"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="e.g.: 18"
                />
                <h2 className="text-lg mt-4">Event Date and Times</h2>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h2 className="text-md mt-2 mb-1">Date</h2>
                        <input
                            type="text"
                            value={eventDate}
                            onChange={(event) =>
                                setEventDate(event.target.value)
                            }
                            placeholder="14/01/2025"
                        />
                    </div>
                    <div>
                        <h2 className="text-md mt-2 mb-1">Start</h2>
                        <input
                            type="text"
                            value={startTime}
                            onChange={(event) =>
                                setStartTime(event.target.value)
                            }
                            placeholder="19:00"
                        />
                    </div>
                    <div>
                        <h2 className="text-md mt-2 mb-1">End</h2>
                        <input
                            type="text"
                            value={endTime}
                            onChange={(event) => setEndTime(event.target.value)}
                            placeholder="23:00"
                        />
                    </div>
                </div>
                <h2 className="text-lg mt-4">Address</h2>
                <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <h2 className="text-lg mt-4">Price</h2>
                <input
                    type="text"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="£0.00"
                />
                <h2 className="text-lg mt-4">Max Guests</h2>
                <input
                    type="number"
                    value={maxGuests}
                    onChange={(event) => setMaxGuests(event.target.value)}
                    placeholder="e.g.: 20"
                />
                <h2 className="text-lg mt-4">About this event</h2>
                <textarea
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Write your description here.."
                />
                <h2 className="text-lg mt-2">Images</h2>
                <p className="text-gray-500 text-sm">
                    Copy and paste an image link into the box below, or upload
                    an image from your device by clicking the "Upload" button.
                </p>
                <ImagesUploader
                    addedImages={addedImages}
                    onChange={setAddedImages}
                />
                <h2 className="text-lg mt-6">Additional information</h2>
                <p className="text-gray-500 text-sm">Select all that apply</p>
                <AdditionalInfo
                    selected={additionalInfo}
                    onChange={setAdditionalInfo}
                />
                <br />
                <p className="text-gray-500 text-sm italic">
                    If necessary, please specifiy in the description whether
                    selected amenities are free, or available at a cost.
                </p>
                <button className="primary my-4">Save event</button>
            </form>
        </div>
    )
}
