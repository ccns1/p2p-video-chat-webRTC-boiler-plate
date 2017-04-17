import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./userReducer').default,
})

export default rootReducer
