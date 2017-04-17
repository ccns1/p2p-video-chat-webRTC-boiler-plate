const socketio = require('socket.io');

const emitAnswer = (socket, userDestiny, answer) => {
  socket.broadcast.to(userDestiny.id).emit('answer', answer);
}

const sendCandidate = (socket, userDestiny, candidate) => {
  if (userDestiny) socket.broadcast.to(userDestiny.id).emit('receiveIceCandidate', candidate);
}

const Session = (idCaller, idCallee) => {
  this.idCaller = idCaller;
  this.idCallee = idCallee;
  this.id = Date.now();
  this.status = null;
}

const createCall = (socket, userCalling, userDestiny, offer) => {
    var sessionId = Date.now();
    var session = new Session(userCalling.id, userDestiny.id);
    session.offer = offer;
    socket.broadcast.to(userDestiny.id).emit('receiveOffer', {
      offer: offer,
      caller: userCalling
    });

    return sessionId;
};

const backend = (server) => {

  const io = socketio(server);

  io.on('connection', (socket) => {

  	console.log('socket connected', socket.id, 'backend library being imported')

    socket.on('start_call_with', (options) => {
      console.log('Request call start with ' + options.userDestiny.id + ' from ' + options.userCalling.id);
      createCall(socket, options.userCalling, options.userDestiny, options.offer);
    });

    socket.on('closed connection', (data) => {
      socket.broadcast.to(data.room).emit('peer connection severed');
    });

    //Receive answer
    socket.on('answer', (options) => {
      emitAnswer(socket, options.userDestiny, options.answer);
    });

    //Receive candidates
    socket.on('ice_candidate', (options) => {
      console.log('Received ice candidate');
      sendCandidate(socket, options.userDestiny, options.candidate);
    });

  })
}

module.exports = backend;