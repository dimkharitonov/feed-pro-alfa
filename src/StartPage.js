import React, { Component } from 'react';
import './StartPage.css'

export default class StartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoading: false,
      isLoaded: false,
      error: ''
    };

    this._isMounted = false;
    this.content = this.props.content;
  }

  componentDidMount() {
    this._isMounted = true;

    this.setState({
      isLoading: true
    });
    this.content.requestItems(this.setItems.bind(this), this.reportError.bind(this))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItems(items) {
    if(this._isMounted) {
      this.setState({
        items,
        isLoading: false,
        isLoaded: true
      });

      console.log('get content', items);
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
      <div className="main-page">
        main page
      </div>
    );
  }
}