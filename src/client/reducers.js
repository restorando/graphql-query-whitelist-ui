const defaultState = {
  visible: false,
  currentQuery: ''
}

export function queryEditor(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_QUERY_FORM':
      return { ...state, visible: !state.visible }
    case 'SET_CURRENT_QUERY':
      return { ...state, currentQuery: action.currentQuery }
    case 'CLEAN_CURRENT_QUERY':
      return { ...state, currentQuery: "" }
    default:
      return state
  }
}
