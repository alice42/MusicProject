const initialState = {
  loading: false,
  results: [],
  errorMessage: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return { ...state, loading: true, results: [], errorMessage: null }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        results: action.results,
        errorMessage: null
      }
    case 'SEARCH_FAILURE':
      return {
        ...state,
        loading: false,
        results: [],
        errorMessage: action.errorMessage
      }
    default:
      return state
  }
}

export default reducer
