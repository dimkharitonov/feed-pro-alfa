import React, { Component } from 'react';
import * as Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import './Article.css'
import { FaChevronLeft } from 'react-icons/fa';
import Tags from './components/Tags';
import Persons from './components/Persons';

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
    this.articleID = this.props.match.params.id;

    [
      'setItems',
      'reportError'
    ].map(f => this[f] = this[f].bind(this));
  }

  componentDidMount() {
    this._isMounted = true;

    this.setState({
      isLoading: true
    });
    this.content.requestItem(this.setItems, this.reportError, this.articleID);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItems(fields) {
    if(this._isMounted) {
      this.setState({
        fields: fields.fields,
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
      this.state.isLoading
        ? <div>Loading</div>
        : this.state.fields.length === 0
          ? <div>no items</div>
          : this.renderArticle()
    )
  }

  renderArticle() {
    const {
      title,
      body,
      published,
      source,
      origin,
      companies,
      industries,
      persons,
      tags
    } = this.state.fields;
    return(
      <div className="article">
        <div className="article--header header">
          <div className="header--backlink">
            <Link to="/"><FaChevronLeft/></Link>
          </div>
          <div className="header--title">
            <h1>{title}</h1>
            <div className="header--details">
              { this.content.formatDate(published) },
              Источник <a href={origin} target="_blank">{ source }</a>
            </div>
          </div>
        </div>
        <div className="article--meta">

          <Tags data={companies} name="Компании" prefix="companies"/>
          <Persons data={persons}/>
          <Tags data={industries} name="Отрасли" prefix="industries"/>
          <Tags data={tags} name="Теги" prefix="tags"/>
        </div>
        <div className="article--body">
          <Markdown source={body} />
        </div>
      </div>
    )
  }


};