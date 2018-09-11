import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css'
import Tags from "./components/Tags";

export default class StartPage extends Component {

  contentTypes = [
    'article',
    'disgest',
    'report'
  ];

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

    [
      'setItems',
      'reportError',
      'matchContentByType'
    ].map(f => this[f] = this[f].bind(this));
  }

  componentDidMount() {
    this._isMounted = true;

    this.setState({
      isLoading: true
    });
    this.content.requestItems(this.setItems, this.reportError)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItems(items) {
    if(this._isMounted) {
      this.setState({
        items: this.sortByDate(this.filterItems(items.items)),
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

  getContentTypes = () => this.contentTypes;

  matchContentByType = (item) =>
    this.getContentTypes()
      .reduce((acc, value) => acc || value === item.sys.contentType.sys.id,false);

  filterItems = (items) => items.filter(item => this.matchContentByType(item));

  sortByDate = items => items.sort((a, b) => new Date(b.fields.published) - new Date(a.fields.published));

  render() {
    return (
      <div className="items-list">
        { this.state.isLoading
          ? <div>Loading</div>
          : this.state.items.length === 0
            ? <div>no items</div>
            : this.renderItems()
        }
      </div>
    );
  }

  renderItems() {
    return this.state.items.map( item => {

      const id = item.sys.id;
      const {
        title,
        published,
        publisher,
        cover,
        spoiler,
        period,
        issue,
        companies,
        tags,
        indicators
      } = item.fields;

      switch(item.sys.contentType.sys.id) {
        case 'article':
          return this.renderArticleSnippet({id, title, published, companies, tags});
        case 'report':
          return this.renderReportSnippet({id, title, published, publisher, cover, indicators});
        case 'disgest':
          return this.renderDigestSnippet({id, title, published, publisher, cover, spoiler, period, issue });
        default:
          return (
            <div>неправильный тип данных {item.sys.contentType.sys.id} </div>
          )
      }
    })
  }

  renderArticleSnippet({id, title, published, companies, tags}) {
    return (
      <div className="article-snippet snippet" key={id}>
        <Link to={ `articles/${id}`}>
          <div className="snippet--date">{this.content.formatDate(published)}</div>
          <div className="snippet--title">{title}</div>
          <Tags data={companies} name="" prefix="companies"/>
          <Tags data={tags} name="" prefix="tags"/>
        </Link>
      </div>
    )
  }

  renderReportSnippet({id, title, published, publisher, cover, indicators}) {
    return (
      <div className="report-snippet snippet" key={id}>
        <Link to={ `reports/${id}` }>
          <div className="snippet--date">{this.content.formatDate(published)}</div>
          <div className="pannels">
            <div className="pannels--pannel left">
              <div className="snippet--type"><span>ОТЧЕТ</span></div>
              <div className="snippet--title">{title}</div>
              <div className="snippet--publisher">{publisher}</div>
            </div>
            <div className="pannels--pannel right">
              <div className="snippet--cover"><img src={cover.fields.file.url + '?w=100&h=100'} alt={cover.fields.title}/></div>
            </div>
          </div>
          <Tags data={indicators} name="" prefix="indicators"/>
        </Link>
      </div>
    )
  }

  renderDigestSnippet({id, title, published, publisher, cover, spoiler, period, issue}) {
    return (
      <div className="digest-snippet snippet" key={id}>
        <Link to={ `digests/${id}` }>
          <div className="snippet--date">{period}</div>
          <div className="pannels">
            <div className="pannels--pannel left">
              <div className="snippet--type"><span>ДАЙДЖЕСТ</span> выпуск {issue}</div>
              <div className="snippet--title">
                {title}
              </div>
              <div className="snippet--publisher">{publisher}</div>
            </div>
            <div className="pannels--pannel right">
              <div className="snippet--cover"><img src={cover.fields.file.url + '?w=192&h=192'} alt={cover.fields.title}/></div>
            </div>
          </div>
          <div className="snippet--spoiler">{ this.renderMultiline(spoiler)}</div>
        </Link>
      </div>
    )
  }

  renderMultiline(text) {
    const lines = text.split('\n');
    return lines.map((line, idx) => <span key={idx}>{line}<br/></span>);
  }
}