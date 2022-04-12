import React, { Component } from 'react';
import logo from '../logo.svg'
import { Navbar } from 'react-bootstrap'

class Header extends Component {
    render() {
        return (
            <div style={{maxWidth: "900px", margin: "0 auto"}}>
                <Navbar  >
                    <Navbar.Brand></Navbar.Brand>
                    <img alt=""
                        style={{marginLeft: "13px"}}
                        src={logo}
                        width="35"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                    <span style={{marginLeft: "10px"}}>NodeSound</span>
                </Navbar>
            </div>
        )
    }
}

export default Header;