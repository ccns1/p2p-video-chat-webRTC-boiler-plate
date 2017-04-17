import {connect} from 'react-redux'
import ListComponent from '../components/ListComponent'


const mapStateToProps = (state, ownProps) => {
	return {
		users: state.user.connectedUsers
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent)
