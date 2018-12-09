import { combineReducers } from 'redux'
import audioReducer from './audio'

const mainReducer = combineReducers({ audio: audioReducer })
export default mainReducer
