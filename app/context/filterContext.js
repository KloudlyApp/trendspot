'use client'
import { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children, initialSelectedNiche }) => {
  const [selectedNiche, setSelectedNiche] = useState(initialSelectedNiche)
  const [filterByDateArray, setFilterByDateArray] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filterByTag, setFilterByTag] = useState(undefined)

  return (
    <GlobalStateContext.Provider
      value={{
        selectedNiche,
        setSelectedNiche,
        selectedDate,
        setSelectedDate,
        filterByDateArray,
        setFilterByDateArray,
        filterByTag,
        setFilterByTag,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalStateContext)
