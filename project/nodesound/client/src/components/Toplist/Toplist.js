import React, { Component } from 'react';
import ToplistItem from './modules/ToplistItem'
var uniqid = require('uniqid')

class Toplist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parsedResponse: [],
    }
  }

  componentDidMount() {
    this.fetchTop()
  }

  renderList = () => {
    for (let item of this.state.parsedResponse) {
    }
  }

  fetchTop = async () => {
    let res = await fetch('http://78.70.175.39:5000/toplist/gettoplist')
    res = await res.json()
    res = res.slice(0, 5)
    this.setState(state => ({
      parsedResponse: res
    }))
  }

  render() {
    const items = this.state.parsedResponse.map(i => <ToplistItem info={i} key={uniqid()} />)
    const styleObj = {
      display: "flex",
      justifyContent: "center"
    }
    return (
      <div style={{border: "1px solid #ececec", borderRadius: "10px", padding: "20px", maxWidth: "800px", margin: "0 auto"}}>
        <h2>Highest Rated Audiofiles</h2>
        <hr/>
        <div style={styleObj}>
          <ol>
            {items}
          </ol>
        </div>
      </div>
    );
  }
}

export default Toplist;