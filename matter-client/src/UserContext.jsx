import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!user) {
            const { data } = axios
                .get("/profile") // /profile is called twice as shown in browser under Network. This could be because we have strictmode in React. It will also be called twice in development?
                .then(({ data }) => {
                    setUser(data)
                    setReady(true)
                })
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}
