import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import playlistReducer from './playlistReducer'

const reducer = combineReducers({
  search: searchReducer,
  playlist: playlistReducer
})
export default reducer
