import React, { Component } from 'react';
//import * as Markdown from 'react-markdown';
import './Digest.css'

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      isLoading: false,
      isLoaded: false,
      error: ''
    };

    this._isMounted = false;
    this.content = this.props.content;
    this.digestID = this.props.match.params.id;
  }

  componentDidMount() {
    this._isMounted = true;

    this.setState({
      isLoading: true
    });
    this.content.requestItems(this.setItems, this.reportError);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItems(items) {
    if(this._isMounted) {
      this.setState({
        isLoading: false,
        isLoaded: true
      });
    } else {
      console.log('component is not mounted');
    }
  }

  reportError(error) {
    this.setState({
      error,
      isLoading: false,
      isLoaded: false
    });

    console.log('error with getting content', error);
  }

  render() {
    return (
      <div>
        digest { this.digestID }
      </div>
    )
  }
};