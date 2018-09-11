import React, { Component } from 'react';
//import * as Markdown from 'react-markdown';
import './Report.css'

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.reportID = this.props.match.params.id;
  }

  render() {
    return (
      <div>
        report { this.reportID }
      </div>
    )
  }
};