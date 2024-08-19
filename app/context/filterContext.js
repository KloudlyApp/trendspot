'use client'
import { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('tech')
  const [filterByDateArray, setfilterByDateArray] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filterByTag, setfilterByTag] = useState(undefined)

  return (
    <GlobalStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDate,
        setSelectedDate,
        filterByDateArray,
        setfilterByDateArray,
        filterByTag,
        setfilterByTag,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalStateContext)
