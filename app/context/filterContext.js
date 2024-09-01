'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserNiche } from '../api/airtable/users/latest-niche/get-latest-niche'

const FilterStateContext = createContext()

export const FilterStateProvider = ({ children }) => {
  const [filterNiche, setFilterNiche] = useState({})
  const [filterDate, setFilterDate] = useState(new Date())
  const [filterByTag, setFilterByTag] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      const latestNiche = await getUserNiche()
      setFilterNiche(latestNiche)
    }

    initialize()
  }, [])

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
