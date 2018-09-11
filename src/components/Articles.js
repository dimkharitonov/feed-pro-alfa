import React from 'react';
import {Link} from "react-router-dom";

function renderArticleSnippet(article, content) {
  const { title, published} = article.fields;
  const id = article.sys.id;

  return (
    <div className="article-snippet snippet" key={'art-'+id}>
      <Link to={ `/articles/${id}`}>
        <div className="snippet--date">{content.formatDate(published)}</div>
        <div className="snippet--title">{title}</div>
      </Link>
    </div>
  )
}

export default (props) => (
  props.data
    ? <div className="articles">
      { props.data.map(item => renderArticleSnippet(item, props.content)) }
    </div>
    : ''
)

