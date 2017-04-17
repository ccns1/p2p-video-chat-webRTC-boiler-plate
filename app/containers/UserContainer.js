import {connect} from 'react-redux'
import UserComponent from '../components/UserComponent'


const mapStateToProps = (state, ownProps) => {
	return {
		user: ownProps.user,
		calling: state.user.calling,
		sortOutMedia: ownProps.sortOutMedia,

	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)
