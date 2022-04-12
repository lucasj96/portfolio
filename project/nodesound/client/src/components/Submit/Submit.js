import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import mountAudioContext from './modules/MountAudioContext'
import Info from './modules/Info'

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submittedAudio: false,
      fileName: 'No file submitted',
      audioFile: '',
      savedAudioFile: '',
      loadedMetaData: false,
      savedAudio: false,
      redirect: undefined,
      showAlert: false,
      customFileName: '',
      showTooltip: '',
      longName: '',
      isRecording: false,
    }
    this.fileInput = React.createRef()
    this.audioPlayer = React.createRef()
    this.savedAudioPlayer = React.createRef()
    this.savedAudioFile = React.createRef()
    this.playButton = React.createRef()
    this.volumeRange = React.createRef()
    this.pannerRange = React.createRef()
    this.bassRange = React.createRef()
    this.trebleRange = React.createRef()
    this.downloadButton = React.createRef()
    this.submitButton = React.createRef()
    this.oscillatorFrequencyRange = React.createRef()
    this.oscillatorGainRange = React.createRef()
    this.fileNameInput = React.createRef()
  }

  componentDidUpdate({ prevProps }, prevState) {
    // If there has not been an update to the filename state return
    if (prevState.fileName === this.state.fileName) {
      return
    }
    this.metadataTimer()
  }

  // Loops to wait until meta data is received from the submitted audio so there is access to html attributes
  metadataTimer() {
    this.countTime = setTimeout(arg => {
      if (this.state.loadedMetaData) {
        mountAudioContext(this)
      } else {
        this.metadataTimer()
      }
    }, 20)
  }

  handleDownload = (evt) => {
    if (!this.state.submittedAudio) return
    let blob = new Blob(this.chunks, {
      'type': 'audio/ogg; codecs=opus'
    })
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.style = "display: none"
    a.href = url
    a.download = this.state.fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }

  postFile = async (event) => {
    debugger
    if (!this.state.submittedAudio) return
    if (this.fileNameInput.current.textLength <= 4) {
      this.setState(state => ({
        longName: 'Enter a longer name.'
      }))
      return // Disabling button messed up listeners?
    } else if (this.fileNameInput.current.textLength > 14) {
      this.setState(state => ({
        longName: 'Enter a shorter name.'
      }))
    }

    let blob = new Blob(this.chunks, {
      'type': 'audio/ogg; codecs=opus'
    })
    let url = URL.createObjectURL(blob)
    let formData = new FormData()

    // Format name needs to be here because it otherwise passes funciton to formdata.
    let endingFormat = this.state.fileName.split('.').pop() // ex audio.mp3 becomes mp3
    let formattedFilename = this.state.fileName.split('.')[0] // ex audio.mp3 becomes audio

    formData.append('inpFile', blob, formattedFilename)
    formData.append('format', endingFormat)
    formData.append('rating', 0)
    formData.append('customName', this.state.customFileName)

    let res = await fetch('http://78.70.175.39:5000/upload', {
      method: 'POST',
      body: formData,
    })
    const location = res.headers.get('Location') // The string from the header Location "submitted audio"
    if (res.status == '201') {
      // Redirects to the submitted audio
      this.setState(state => ({
        redirect: location
      }))
    }
  }

  /**
   * Saves the audio in a DOMString containg a URL to the file.
   * Changes the state to the file name etc.
   * @param {object} event
   */
  handleSubmitFile = (event) => {
    const inpFile = this.fileInput.current.files[0]
    let outSide = URL.createObjectURL(inpFile)
    this.setState(state => ({
      submittedAudio: true,
      audioFile: outSide,
      fileName: this.fileInput.current.files[0].name,
    }))
  }

  handlePlayButton = async (event) => {
    if (!this.state.submittedAudio) return // Submit audio first
    const playButton = this.playButton.current
    const audioPlayer = this.audioPlayer.current
    // check if context is in suspended state (autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
    if (playButton.dataset.playing === 'false') {
      audioPlayer.play()
      this.mediaRecorder.start()
      playButton.dataset.playing = 'true'
      this.setState(state => ({
        isRecording: true
      }))
      playButton.textContent = 'Stop Record'
    } else if (playButton.dataset.playing === 'true') {
      audioPlayer.pause()
      this.mediaRecorder.stop()
      playButton.dataset.playing = 'false'
      playButton.disabled = true
      this.setState(state => ({
        isRecording: false
      }))
    }
  }

  handleVolume = (event) => {
    if (!this.state.submittedAudio) return // Submit audio first
    this.gainNode.gain.value = this.volumeRange.current.value
  }

  handlePanning = (event) => {
    if (!this.state.submittedAudio) return
    this.panner.pan.value = this.pannerRange.current.value
  }

  handleBassFilter = (event) => {
    if (!this.state.submittedAudio) return
    this.baseFilter.gain.value = this.bassRange.current.value
  }

  handleTrebleFilter = (event) => {
    if (!this.state.submittedAudio) return
    this.trebleFilter.gain.value = this.trebleRange.current.value
  }

  handleFinishedAudio = (event) => {
    const playButton = this.playButton.current
    playButton.dataset.playing = 'false'
    if (this.state.isRecording) {
      this.mediaRecorder.stop()
      this.playButton.current.disabled = true
    }
  }

  handleFileChange = (event) => {
    const fileName = event.target.files[0].name
    this.setState(state => ({
      fileName: fileName
    }))
  }

  loadMetaData = async (event) => {
    this.setState(state => ({
      loadedMetaData: true
    }))
  }

  handleNameInput = (event) => {
    this.setState(state => ({
      customFileName: this.fileNameInput.current.value
    }))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
          <Info />
        </div>

        <Form controlId="testid" style={{ border: "1px solid #ececec", borderRadius: "10px", padding: "1rem" }}>
          <Form.Group controlId="formBasicEmail">
            <h6>Select an audiofile</h6>
            <Form.File
              label={this.state.fileName}
              ref={this.fileInput}
              onChange={this.handleFileChange}
              custom
            />
            <Button style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
              onClick={this.handleSubmitFile}>
              Submit
            </Button>
          </Form.Group>
        </Form>

        <br />

        <div style={{ border: "1px solid #ececec", borderRadius: "10px", padding: "1rem" }}>
          <h3>Submitted Audio</h3>
          
          <audio controls
            onLoadedMetadata={this.loadMetaData}
            crossOrigin=""
            ref={this.audioPlayer}
            src={this.state.audioFile}
            onEnded={this.handleFinishedAudio}>
          </audio>
          <br />
          <Button data-playing="false"
            role="switch"
            aria-checked="false"
            onClick={this.handlePlayButton}
            ref={this.playButton}>
            <span>Record</span></Button>
          <br />
          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              border: "1px solid #ececec",
              borderRadius: "10px",
              padding: "1rem",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}>
              <h3>Audio Controls</h3>

                Volume<input type="range"
                min="0"
                max="5"
                step="0.01"
                defaultValue="1"
                onInput={this.handleVolume}
                ref={this.volumeRange}></input>

              <br />
              <br />
                Stereo panning<input type="range"
                min="-1"
                max="1"
                defaultValue="0"
                step="0.01"
                onInput={this.handlePanning}
                ref={this.pannerRange}
              ></input>
              <br />
              <br />

                Filter Base<input type="range"
                min="-10"
                max="10"
                defaultValue="0"
                step="0.01"
                onInput={this.handleBassFilter}
                ref={this.bassRange}
              ></input>

              <br />
              <br />

                Filter Treble<input type="range"
                min="-10"
                max="10"
                defaultValue="0"
                step="0.01"
                onInput={this.handleTrebleFilter}
                ref={this.trebleRange}
              ></input>
              <br />
              <br />
            </div>

            {' '}
          </div>

          <h3>Recorded Audio</h3>
          <audio controls
            crossOrigin=""
            ref={this.savedAudioPlayer}
            src={this.state.savedAudioFile}
          >
          </audio>
          <br />
          <Button
            onClick={this.handleDownload}
            ref={this.downloadButton}>
            <span>Download</span></Button>

          {' '}
          <Button onClick={this.postFile}
            ref={this.submitButton}>
            Upload
          </Button><br />
          <span style={{ fontSize: "14px" }}><i>{this.state.longName}</i></span>

          <br />
          <br />
          <i>Must be between 4 and 14 characters</i>
          <br />
          Filename: <input type="text"
            onInput={this.handleNameInput}
            ref={this.fileNameInput}>
          </input>
        </div>

        <br />
        <br />
      </div>
    );
  }
}

export default Submit;