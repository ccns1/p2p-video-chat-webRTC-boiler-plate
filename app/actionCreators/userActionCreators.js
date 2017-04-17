import * as constants from '../constants'

export const userDetailSubmit = (user) => ({
	type: constants.USER_ADDED,
	user,
})

export const userRemoved = (user) => ({
	type: constants.USER_REMOVED,
	user,
})

export const userDetailsChange = (userInput) => ({
	type: constants.USER_INPUT,
	userInput
})

export const addConnectedUser = (user) => ({
	type: constants.CONNECTED_USER_ADDED,
	user
})

export const userCalling = (data) => ({
	type: constants.USER_CALLING,
	userCalling: data.socketId
})
