import React, { Component } from 'react'

import io from 'socket.io-client'

const socket = io('http://localhost:1337')

export default class List extends Component {

	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		if (this.props.calling.indexOf(this.state.user) !== -1 ) {
			// AnswerFunction
			this.handleIncomingCall()
		} else {
			//call function
			this.callCollaborator()
		}
	}

	callCollaborator() {
      if (window.pc) {
        window.pc.signallingState = 'closed'
      }
        socket.emit('Pair with me', {
            room: this.state.repoId,
            name: this.state.collaborator.name,
            url: `/${this.state.myName}`,
            caller: this.state.myName
        })

        var settingLocalMedia = Promise.promisify(this.setUserMedia)

        this.props.setPairingRoomURL(`/${this.state.myName}`)
        this.props.setPairPartner(this.state.collaborator)
        Promise.resolve(this.setLocalUserMedia())
        .then(() => this.setUserMedia())
        .then(() => {
            return setTimeout(() => {


                // this.props.clickToGoHome()
                return this.props.sortOutMedia();
            }, 3000)
        })
        .catch(console.error)

    }

    handleIncomingCall() {
        this.props.setPairPartner(this.state.collaborator)
        Promise.resolve(this.setLocalUserMedia())
        .then(() => this.setUserMedia())
        .then(() => {
            return setTimeout(() => {
                this.props.clickToGoHome()
                return this.props.sortOutMedia()
            }, 3000)
        })
        .then(() => {
          return setTimeout(() => {
            return events.trigger('startCall', this.state.collaborator)
          }, 3000)
        })
        .then(() => socket.emit('call answered', { caller: this.state.collaborator.name, receiver: this.state.myName, room: this.props.repoId }))
        .catch(console.error)
    }

  render() {
    return (
      <div onClick={this.handleClick}>
		{
			(this.props.calling.indexOf(this.state.user) !== -1 ) ?
				<div>
					Answer {this.state.user.name}
				</div>
				:
				<div>
					Call User {this.state.user.name}
				</div>
		}
      </div>
    )
  }
}
