import React, { Component } from 'react'
import UserContainer from '../containers/UserContainer'

export default class ListComponent extends Component {
	constructor(props) {
		super(props)
	}

	sortOutMedia(){
		const MediaStreamURL = this.props.URL;
		const updateStoreRemoteURL = this.props.UpdateRemoteStream.bind(this);
		ConfigureSocket(socket, this.state.playerInfo, MediaStreamURL, updateStoreRemoteURL);
	}

	render() {
		console.log(this.props)
		return (
			<div>
				{
					this.props.users.map((user) => 
						<UserContainer
							key={user.name}
							user={user}
							sortOutMedia = {this.sortOutMedia}
						/>
					)
				}
			</div>
		)
	}
}
