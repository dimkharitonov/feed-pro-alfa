import React, { Component } from 'react';
//import * as Markdown from 'react-markdown';
import './Digest.css'

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.digestID = this.props.match.params.id;
  }

  render() {
    return (
      <div>
        digest { this.digestID }
      </div>
    )
  }
};