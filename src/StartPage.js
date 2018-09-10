import React, { Component } from 'react';
import './StartPage.css'

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
        items: this.filterItems(items.items),
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

  getContentTypes = () => this.contentTypes;

  matchContentByType = (item) =>
    this.getContentTypes()
      .reduce((acc, value) => acc || value === item.sys.contentType.sys.id,false);

  filterItems = (items) => items.filter(item => this.matchContentByType(item));

  render() {
    return (
      <div className="main-page">
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
    return (
      <div className="items">
        {
          this.state.items.map( item => {

            const id = item.sys.id;
            const {
              title,
              published,
              publisher,
              cover,
              spoiler
            } = item.fields;

            switch(item.sys.contentType.sys.id) {
              case 'article':
                return this.renderArticleSnippet({id, title, published});
              case 'report':
                return this.renderReportSnippet({id, title, published, publisher, cover});
              case 'disgest':
                return this.renderDigestSnippet({id, title, published, publisher, cover, spoiler});
              default:
                return (
                  <div>неправильный тип данных {item.sys.contentType.sys.id} </div>
                )
            }
          })
        }
      </div>
    )
  }

  renderArticleSnippet({id, title, published}) {
    return (
      <div className="article-snippet" key={id}>
        <div className="article-snippet--title">{title}</div>
        <div>{published} | {id}</div>
      </div>
    )
  }

  renderReportSnippet({id, title, published, publisher, cover}) {
    console.log(cover.fields.file);
    return (
      <div className="report-snippet" key={id}>
        <div className="report-snippet--title">{title}</div>
        <div className="report-snippet--publisher">{publisher}</div>
        <div>{published}</div>
        <div className="report-snippet--cover"><img src={cover.fields.file.url} alt={cover.fields.title}/></div>
      </div>
    )
  }

  renderDigestSnippet({id, title, published, publisher, cover, spoiler}) {
    return (
      <div className="digest-snippet" key={id}>
        <div className="digest-snippet--title">{title}</div>
        <div className="digest-snippet--publisher">{publisher}</div>
        <div className="digest-snippet--spoiler">{spoiler}</div>
        <div>{published}</div>
        <div className="digest-snippet--cover"><img src={cover.fields.file.url} alt={cover.fields.title}/></div>
      </div>
    )
  }

}