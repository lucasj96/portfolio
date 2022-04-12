import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export class SubmittedAudio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioFile: '',
      rating: '',
      customName: '',
      voteStatus: '',
    }
    this.audioPlayer = React.createRef()
  }

  componentDidMount() {
    this.loadAudio()
    this.getRating()
    this.getName()
  }


  getName = async () => {
    const pathName = window.location.pathname
    let res = await fetch('http://78.70.175.39:5000' + pathName + '/getname')
    let parsedRes = await res.json()
    await this.setState(state => ({
      customName: parsedRes.customName
    }))
  }

  getRating = async () => {
    const pathName = window.location.pathname
    let res = await fetch('http://78.70.175.39:5000' + pathName + '/getrating')
    let parsedRes = await res.json()
    await this.setState(state => ({
      rating: parsedRes.rating
    }))
  }

  loadAudio = async () => {
    const pathName = window.location.pathname
    let res = await fetch('http://78.70.175.39:5000' + pathName + '/getaudio')
    await this.setState(state => ({
      audioFile: res.url
    }))
  }

  handleLikeButton = async (event) => {
    const pathName = window.location.pathname
    let feedback = { increment: true }
    feedback = JSON.stringify(feedback)
    let res = await fetch('http://78.70.175.39:5000' + pathName, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: feedback
    })
    if (res.status === 403) {
      this.setState(state => ({
        voteStatus: 'Can only vote once every 24 hours.'
      }))
    }
    if (res.status === 200) {
      this.setState(state => ({
        voteStatus: 'Successfully voted'
      }))
    }
    this.getRating()
  }

  handleDislikeButton = async (event) => {
    const pathName = window.location.pathname
    let feedback = { increment: false }
    feedback = JSON.stringify(feedback)
    let res = await fetch('http://78.70.175.39:5000' + pathName, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: feedback
    })
    if (res.status === 403) {
      this.setState(state => ({
        voteStatus: 'Can only vote once every 24 hours.'
      }))
    }
    if (res.status === 200) {
      this.setState(state => ({
        voteStatus: 'Successfully voted'
      }))
    }
    this.getRating()
  }


  render() {
    return (
      <div>
        <h1>Submitted Audio</h1>
        <p>Filename: {this.state.customName}</p>
        <p>Rating: {this.state.rating}</p>
        <Button variant="success"
          onClick={this.handleLikeButton}>Like</Button> {' '}
        <Button variant="danger"
          onClick={this.handleDislikeButton}>Dislike</Button>
        <br />
        {this.state.voteStatus}
        <br />
        <audio controls
          src={this.state.audioFile}
          ref={this.audioPlayer}>
        </audio>
      </div>
    )
  }
}

export default SubmittedAudio
