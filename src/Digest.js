import React from 'react';
import './Digest.css'
import {Link} from "react-router-dom";
import Article from './Article';
import {FaChevronLeft} from "react-icons/fa";
import Summary from './components/Summary';
import Articles from './components/Articles';

export default class Digest extends Article {

  render() {
    return (
      this.state.isLoading
        ? <div>Loading</div>
        : this.state.fields.length === 0
        ? <div>no items</div>
        : this.renderDigest()
    )
  }

  renderDigest() {
    const {
      title,
      issue,
      period,
      summary,
      articles
    } = this.state.fields;
    return(
      <div className="article">
        <div className="article--header header">
          <div className="header--backlink">
            <Link to="/"><FaChevronLeft/></Link>
          </div>
          <div className="header--title">
            <div className="snippet--type"><span>ДАЙДЖЕСТ</span> выпуск {issue}</div>
            <h1>{title}</h1>
            <div className="header--details">
              { period }
            </div>
          </div>
        </div>

        <div className="article--body">
          <Summary data={summary}/>
          <Articles data={articles} content={this.content}/>
        </div>
      </div>
    )
  }

};