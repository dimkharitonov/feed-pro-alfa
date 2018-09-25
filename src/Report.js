import React from 'react';
import Article from './Article';
import * as Markdown from 'react-markdown';
import './Report.css'
import {Link} from "react-router-dom";
import {FaChevronLeft} from "react-icons/fa";
import Tags from "./components/Tags";

export default class Report extends Article {

  render() {
    return (
      this.state.isLoading
        ? <div>Loading</div>
        : this.state.fields.length === 0
        ? <div>no items</div>
        : this.renderReport()
    )
  }

  renderReport() {
    const {
      title,
      publisher,
      published,
      summary,
      slides,
      indicators,
      industries,
      tags,
      companies,
      flippingbookId
    } = this.state.fields;

    console.log(this.state.fields);

    if(flippingbookId) {
      // attach script
      var addScript = document.createElement('script');
      addScript.setAttribute('src', 'https://online.flippingbook.com/EmbedScriptUrl.aspx?m=redir&hid=' + flippingbookId);
      document.body.appendChild(addScript);
    }

    return(
      <div className="report">
        <div className="article--header header">
          <div className="header--backlink">
            <Link to="/"><FaChevronLeft/></Link>
          </div>
          <div className="header--title">
            <h1>{title}</h1>
            <div className="header--details">
              { this.content.formatDate(published) }
            </div>
            <div className="header--details">
              Издатель <strong>{ publisher }</strong>
            </div>
          </div>
        </div>

        <div className="article--meta">
          <Tags data={indicators} name="Показатели" prefix="indicators"/>
          <Tags data={companies} name="Компании" prefix="companies"/>
          <Tags data={industries} name="Отрасли" prefix="industries"/>
          <Tags data={tags} name="Теги" prefix="tags"/>
        </div>

        <div className="article--body">
          <div className="report--summary">
            <Markdown source={ summary }/>
          </div>
          { flippingbookId
            ? <div>
              <a href={'https://online.flippingbook.com/view/' + flippingbookId + '/'} className="fbo-embed" data-fbo-id="678531"
                 data-fbo-lightbox="yes" data-fbo-width="320px" data-fbo-height="320px" data-fbo-version="1"
                 style={ {maxWidth : "100%"} }>Прогноз развития рынка обувного ретейла в 2018-2019 гг</a>
            </div>
            : <div className="report--slides">
              {
                slides.map((slide, idx) =>
                  <div className="slides--slide" key={idx}>
                    <img src={slide.fields.file.url+'?w=544&h=544'} alt={slide.fields.file.title} />
                  </div>
                )
              }
            </div>
          }
        </div>
      </div>
    )
  };
};