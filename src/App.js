import React, { Component } from 'react';
import Routes from './Routes';
import Content from './utils/content';
import myRox from './utils/rox';

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

    myRox.setup();

    return (
      <div className="App">
        <header className="App--header">
          <div className="App--title">РИТЕЙЛ <em>ПРО</em></div>
        </header>
        <div className="App--content">
          <Routes childProps={ childProps } />
        </div>
      </div>
    );
  }
}

export default App;
