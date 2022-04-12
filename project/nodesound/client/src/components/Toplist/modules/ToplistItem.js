import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Link, Route, NavLink, Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

export class ToplistItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        this.setState(state => ({
            location: '/submittedaudio/' + this.props.info._id
        }))
    }

    render() {
        const itemStyle = {
            border: "1px solid #ececec",
              borderRadius: "10px",
              padding: "1rem",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "400px",
              maxWidth: "400px",
              backgroundColor: "rgb(229, 249, 255)"
        }

        return (
            <div style={{marginBottom: "20px"}}>
                <li style={itemStyle}>
                    Name: {this.props.info.customName},
                    Rating: {this.props.info.rating}.
                <LinkContainer to={this.state.location}><Link> Listen</Link></LinkContainer>
                </li>
            </div>
        )
    }
}

export default ToplistItem
