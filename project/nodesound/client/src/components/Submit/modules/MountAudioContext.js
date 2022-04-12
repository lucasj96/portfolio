// Param is a reference to this
function mountAudioContext(param) {
    param.audioContext = new AudioContext()
    param.chunks = []
    param.track = param.audioContext.createMediaElementSource(param.audioPlayer.current)
    param.gainNode = param.audioContext.createGain()
    param.baseFilter = param.audioContext.createBiquadFilter()
    param.baseFilter.type = 'lowshelf'
    param.baseFilter.frequency.value = 200
    param.trebleFilter = param.audioContext.createBiquadFilter()
    param.trebleFilter.type = 'highshelf'
    param.trebleFilter.frequency.value = 2000
    param.panner = param.audioContext.createStereoPanner()
    param.reverbNode = param.audioContext.createConvolver()
    
    param.oscillator = param.audioContext.createOscillator()
    param.oscillator.type = "square"
    param.oscillatorGainNode = param.audioContext.createGain()

    param.oscillatorGainNode.connect(param.audioContext.destination)
    param.oscillator.connect(param.oscillatorGainNode)
    
    // Connect the nodes
    param.track.connect(param.gainNode)
    param.gainNode.connect(param.trebleFilter)
    param.trebleFilter.connect(param.baseFilter)
    param.baseFilter.connect(param.panner)
    param.panner.connect(param.audioContext.destination)

    param.newDestination = param.audioContext.createMediaStreamDestination()
    param.mediaRecorder = new MediaRecorder(param.newDestination.stream)
    param.panner.connect(param.newDestination)

    param.mediaRecorder.ondataavailable = (evt) => {
        param.chunks.push(evt.data)
    }

    param.mediaRecorder.onstop = (evt) => {
        param.savedAudioBlob = new Blob(param.chunks, { 'type': 'audio/ogg; codecs=opus' })
        param.setState(state => ({
            savedAudioFile: URL.createObjectURL(param.savedAudioBlob)
        }))
    }
}

export default mountAudioContext