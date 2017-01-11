export const toggleQueryForm = () => ({
  type: 'TOGGLE_QUERY_FORM'
})

export const setCurrentQuery = (currentQuery) => ({
  type: 'SET_CURRENT_QUERY',
  currentQuery
})

export const cleanCurrentQuery = () => ({
  type: 'CLEAN_CURRENT_QUERY'
})
