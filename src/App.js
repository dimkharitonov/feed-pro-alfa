import React, { Component } from 'react';
import Routes from './Routes';
import Content from './utils/content';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.content = new Content();
  }


  render() {
    const childProps = {
      content: this.content
    };
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Routes childProps={ childProps } />
      </div>
    );
  }
}

export default App;
