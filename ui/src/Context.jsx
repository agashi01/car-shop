import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [guest, setGuest] = useState(true)

    return (
        <Context.Provider value={{ guest, setGuest }}>
            {children}
        </Context.Provider>
    )
}

export const useGuest = () => useContext(Context)