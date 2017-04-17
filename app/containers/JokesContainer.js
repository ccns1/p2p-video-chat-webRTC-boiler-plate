import {connect} from 'react-redux'
import JokesComponent from '../components/JokesComponent'
import {userDetailsChange, addConnectedUser, userCalling} from '../actionCreators/userActionCreators'


const mapStateToProps = (state, ownProps) => {
	return {
		userDetailInput: state.user.userInput.name,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleUserDetailsInput: (userDetail) => dispatch(userDetailsChange(userDetail)),
		addUser: (user) => {
			dispatch(addConnectedUser(user))
		},
		userCalling: (data) => {
			dispatch(userCalling(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(JokesComponent)
