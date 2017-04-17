import React, { Component } from 'react'
import ListContainer from '../containers/ListContainer'
import io from 'socket.io-client'

const socket = io('http://localhost:1337')

export default class List extends Component {

  constructor(props){
    super(props)
    this.state = {
      bool: true,
    }
    this.handleUserDetailsChange = this.handleUserDetailsChange.bind(this)
    this.handleUserDetails = this.handleUserDetails.bind(this)
  }

  componentDidMount () {
    console.log('mounted')
    console.log(socket)
    socket.on('user joined session', (user) => {
      console.log('joined', user)
      this.props.addUser(user)
    })
    socket.on('user calling', (data) => {
      if (data.socketId !== socket.id){
        this.props.userCalling(data)
      }
    })
  }

  handleUserDetailsChange(event){
    this.props.handleUserDetailsInput(
      {
        name: event.target.value,
      }
    )
  }

  handleUserDetails(event){
    event.preventDefault()
    const socketId = socket.id
    socket.emit('connect me', {
      name: this.props.userDetailInput,
      room: null,
      socketId,
    })
  }

  render() {
    console.log(socket.id)
    return (
      <div>
      <h1>JAMES DEEHAN</h1>
        <form onSubmit={this.handleUserDetails}>
          <input onChange= {this.handleUserDetailsChange} />
          <ListContainer />
        </form>
      </div>
    )
  }
}

