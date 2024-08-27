'use client'
import { createContext, useContext, useState } from 'react'

const FilterStateContext = createContext()

export const FilterStateProvider = ({ children, initialNiche }) => {
  const [filterNiche, setFilterNiche] = useState(initialNiche)
  const [filterDate, setFilterDate] = useState(new Date())
  const [filterByTag, setFilterByTag] = useState(false)

  return (
    <FilterStateContext.Provider
      value={{
        filterNiche,
        setFilterNiche,
        filterDate,
        setFilterDate,
        filterByTag,
        setFilterByTag,
      }}
    >
      {children}
    </FilterStateContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterStateContext)
