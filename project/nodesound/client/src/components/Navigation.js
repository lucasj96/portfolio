import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class Navigation extends Component {
    render() {
        return (
            <div style={{fontSize: "20px"}}>
                <Nav className="flex-column" >
                    <LinkContainer draggable="false" to="/">
                        <Nav.Link>Submit</Nav.Link>
                    </LinkContainer>
                    <LinkContainer draggable="false" to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer draggable="false" to="/toplist">
                        <Nav.Link>Toplist</Nav.Link>
                    </LinkContainer>
                </Nav>
            </div>
        )
    }
}

export default Navigation;