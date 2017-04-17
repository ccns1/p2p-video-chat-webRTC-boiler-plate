import * as constants from '../constants'

const initialState = {
  users: [],
  userInput: '',
  calling: [],
  connectedUsers: [],
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case constants.USER_ADDED:
      newState.users = newState.users.concat(action.user)
      break
    case constants.USER_REMOVED:
      newState.users = action.users
      break
    case constants.USER_INPUT:
      newState.userInput = action.userInput
      break
    case constants.USER_CALLING:
      newState.calling = newState.calling.concat(action.userCalling)
      break
    case constants.CONNECTED_USER_ADDED:
      newState.connectedUsers = newState.connectedUsers.concat(action.user)
      break
    default:
      return state
  }
  return newState
}

export default reducer
