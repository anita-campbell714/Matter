import axios from "axios"
import { useState } from "react"

export default function ImagesUploader({ addedImages, onChange }) {
    const [imageLink, setImageLink] = useState("")
    async function addImageByLink(event) {
        event.preventDefault()
        const { data: filename } = await axios.post("/upload-by-link", {
            link: imageLink,
        })
        onChange((previousValue) => {
            return [...previousValue, filename]
        })
        setImageLink("")
    }

    function uploadImage(event) {
        const files = event.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append("images", files[i])
        }
        axios
            .post("/upload", data, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((response) => {
                const { data: filenames } = response
                onChange((previousValue) => {
                    return [...previousValue, ...filenames]
                })
            })
    }

    function removeImage(event, filename) {
        event.preventDefault()
        onChange([...addedImages.filter((photo) => photo !== filename)])
    }

    function setAsMainImage(event, filename) {
        event.preventDefault()
        onChange([
            filename,
            ...addedImages.filter((photo) => photo !== filename),
        ])
    }

    return (
        <>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={imageLink}
                    onChange={(event) => setImageLink(event.target.value)}
                    placeholder={"Add using a link...jpg, png, etc."}
                ></input>
                <button
                    onClick={addImageByLink}
                    className="bg-primary hover:bg-tertiary px-2 text-xs font-bold  rounded-2xl text-white"
                >
                    Add image
                </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedImages.length > 0 &&
                    addedImages.map((link) => (
                        <div className="relative h-32 flex" key={link}>
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={
                                    "http://localhost:4000/api/uploads/" + link
                                }
                                alt="event image"
                            />
                            <button
                                onClick={(event) => {
                                    removeImage(event, link)
                                }}
                                className="absolute cursor-pointer text-white bg-black  bg-opacity-50 hover:bg-opacity-100 rounded-xl py-1 px-2 bottom-1 right-1"
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
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={(event) => {
                                    setAsMainImage(event, link)
                                }}
                                className="absolute cursor-pointer text-white bg-black bg-opacity-50 hover:bg-opacity-100  rounded-xl py-1 px-2 bottom-1 left-1"
                            >
                                {link === addedImages[0] && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 "
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                                {link !== addedImages[0] && (
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
                                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
                <label className="">
                    <div className="bg-primary hover:bg-tertiary flex  justify-center items-center gap-1 border rounded-2xl p2 text-3xl font-bold text-white cursor-pointer h-32">
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={uploadImage}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                            />
                        </svg>
                        Upload
                    </div>
                </label>
            </div>
        </>
    )
}
