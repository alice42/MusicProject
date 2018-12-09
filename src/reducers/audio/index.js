import { combineReducers } from 'redux'
import searchReducer from './searchReducer'

const reducer = combineReducers({
  search: searchReducer
})
export default reducer
