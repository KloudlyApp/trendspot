'use client'
import { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('tech')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [    filterByDateArray, setfilterByDateArray] = useState([])

  return (
    <GlobalStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDate,
        setSelectedDate,
        filterByDateArray,
        setfilterByDateArray
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalStateContext)
