'use client'
import { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState('2024-08-02T03:21:15Z')

  return (
    <GlobalStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalStateContext)
