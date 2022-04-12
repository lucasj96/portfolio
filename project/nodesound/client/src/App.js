import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
// Components
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
// Main Site Components
import About from './components/About'
import Submit from './components/Submit/Submit'
import Toplist from './components/Toplist/Toplist'
import SubmittedAudio from './components/SubmittedAudio'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App" style={{marginLeft: "-150px"}}>
        <Router>
          <Container fluid >
            {/* Header */}
            <Row style={{ backgroundColor: "#343a40", color: "white" }} >

              <Col >
                <Header />
              </Col>
            </Row>
            {/* Content */}
            <Row style={{ flex: "1", width: "900px", margin: "0 auto" }}>
              {/* Nav */}
              <Col>
                <Navigation id="appNav" />
              </Col>
              {/* Main */}
              <Col xs={10} >
                <Switch>
                  <Route path="/" exact component={Submit} />
                </Switch>
                <Switch>
                  <Route path="/about" exact component={About} />
                </Switch>
                <Switch>
                  <Route path="/toplist" exact component={Toplist} />
                </Switch>
                <Switch>
                  <Route path="/submittedaudio" component={SubmittedAudio} />
                </Switch>
              </Col>
            </Row>

            {/* Footer */}
            <Row style={{backgroundColor: "rgb(52, 58, 64)"}}>
              <Col >
                <Footer />
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
