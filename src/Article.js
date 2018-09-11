import React, { Component } from 'react';
//import * as Markdown from 'react-markdown';
import './Article.css'

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.articleID = this.props.match.params.id;
  }

  render() {
    return (
      <div>
        article { this.articleID }
      </div>
    )
  }
};