let iceCandidates;
let pendingAcceptCandidates;
let canAcceptIce = false;
let peerConnection;
let startCall;
let iceTheCandidate;
let media = {};

const initiatePC = (onSuccess, MediaStreamURL, remoteVideoChatId) => {

    peerConnection = new RTCPeerConnection({
        iceServers: [{
            url: 'stun:stun.l.google.com:19302'
        }]
    });

    window.pc = peerConnection;

    iceCandidates = [];

    pendingAcceptCandidates = [];

    peerConnection.onaddstream = (event) => {
		var video = document.getElementById(remoteVideoChatId)
        video.src = URL.createObjectURL(event.stream)
        video.play()
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            iceCandidates.push(event.candidate.candidate);
        } else if (peerConnection.iceGatheringState === 'complete') {
            for (let i = 0; i < iceCandidates.length; i++) {
                iceTheCandidate(btoa(iceCandidates[i]));
            }
        }
    };
    onSuccess(MediaStreamURL)

}

const createOffer = (cb, MediaStreamURL, socket, remoteVideoChatId) => {
    initiatePC(
        (localMediaStream) => {

            peerConnection.addStream(localMediaStream);

            peerConnection.createOffer((offer) => {

                peerConnection.setLocalDescription(
                new RTCSessionDescription(offer),
                () => {
                    cb(btoa(offer.sdp));
                });
            },
            console.error
            );
        },
        MediaStreamURL,
        remoteVideoChatId
    );
}

const receiveOffer = (offerSdp, cb, MediaStreamURL, socket, remoteVideoChatId) => {
    offerSdp = atob(offerSdp);
    initiatePC(

        (localMediaStream) => {
            peerConnection.addStream(localMediaStream);
            peerConnection.setRemoteDescription(
                new RTCSessionDescription(
                    {
                        type: 'offer',
                        sdp: offerSdp
                    }
                ),

                () => {
                    peerConnection.createAnswer(
                        (answer) => {
                            peerConnection.setLocalDescription(answer);
                            canAcceptIce = true;
                            cb(btoa(answer.sdp));
                        },
                        console.error,
                        {
                            mandatory: {
                                OfferToReceiveAudio: true,
                                OfferToReceiveVideo: true
                            }
                        }
                    );
                },
                console.error
            );
        },
        MediaStreamURL,
        remoteVideoChatId
    );
}

const receiveAnswer = (answerSdp) => {
    peerConnection.setRemoteDescription(
        new RTCSessionDescription(
            {
                type: 'answer',
                sdp: atob(answerSdp)
            }
        )
    );
    canAcceptIce = true;
}

const addCandidate = (iceCandidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate({
        candidate: atob(iceCandidate)
    }));
}

const mergeCandidates = () => {
    if (canAcceptIce) {
        for (let i = 0; i < pendingAcceptCandidates.length; i++) {
            addCandidate(pendingAcceptCandidates[i]);
        }
        pendingAcceptCandidates = [];
    } else {
        setInterval(mergeCandidates, 100);
    }
}

const receiveIceCandidate = (iceCandidate) => {
    if (!canAcceptIce) {
        pendingAcceptCandidates.push(iceCandidate);
        setInterval(mergeCandidates, 100);
    } else {
        addCandidate(iceCandidate);
    }
}

const configureSocket = (socket, playerInfo, remoteVideoChatId, localVideoElementId, videoOptions) => {
	let theOtherUser;


	navigator.getUserMedia(
		videoOptions,
		(stream) => {
			media.stream = stream;
			var localVideo = document.getElementById(localVideoElementId)
			localVideo.src = stream;
			localVideo.play();
		},
		console.error
	)

    let MediaStreamURL = media.stream

	socket.removeAllListeners('refresh_user_list');
	socket.removeAllListeners('hang_up');
	socket.removeAllListeners('receiveOffer');
	socket.removeAllListeners('answer');
	socket.removeAllListeners('receiveIceCandidate');


	//Start a call
	startCall = (userDestiny) => {
		theOtherUser = userDestiny;
		createOffer(
			(offer) => {
				socket.emit('start_call_with',
					{
						userDestiny: theOtherUser,
						userCalling: playerInfo,
						offer: offer
					}
				);
			},
			MediaStreamURL,
			socket
		);
	}

	//Receive a call -- only for !isCaller
	socket.on('receiveOffer', (options) => {
		theOtherUser = options.caller;
		receiveOffer(
			options.offer,
			(answer) => {
				socket.emit('answer',
					{
					    userDestiny: theOtherUser,
					    userCalling: playerInfo,
					    answer: answer
					}
				);
			},
			MediaStreamURL,
			socket
		);
	});

	//Receive answer -- only for isCaller
	socket.on('answer', (answer) => {
		receiveAnswer(answer);
	})

	//Send ice candidates -- for all
	iceTheCandidate = (iceCandidate) => {
		socket.emit('ice_candidate',
			{
			    userDestiny: theOtherUser,
			    userCalling: playerInfo,
			    candidate: iceCandidate
			}
		);
	}

	//Receive ice candidates
	socket.on('receiveIceCandidate', (iceCandidate) => {
		receiveIceCandidate(iceCandidate);
	});

}

export const pc = peerConnection;

const initiateCall = (socket, playerInfo, remoteVideoChatId, localVideoChatId, options) => {
	configureSocket(socket, playerInfo, remoteVideoChatId, localVideoChatId, options)
}

const acceptCall = (collaborator, socket, playerInfo, remoteVideoChatId, localVideoChatId, options) => {
    return setTimeout(() => {
        configureSocket(socket, playerInfo, remoteVideoChatId, localVideoChatId, options)
        return setTimeout(() => {
            startCall(collaborator)
        }, 3000)
    }, 3000)


}

const hangUp = () => {
    if (window.pc && window.pc.connectionState !== 'closed') {
        window.pc.close()
        media.stream.getVideoTracks()[0].stop();
        media.stream.getAudioTracks()[0].stop();
    }
}

const libraryObject = {
	initiateCall,
    acceptCall,
	hangUp,
}

export default libraryObject;