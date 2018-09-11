import React from 'react';

function renderSummaryItem(item) {
  const { title, body} = item.fields;
  const id = item.sys.id;

  return (
    <div className="summary-item" key={'smr-'+id}>
      <div className="summary-item--title">{title}</div>
      <div className="summary-item--body">{body}</div>
      <div className="summary--hr">***</div>
    </div>
  )
}

export default (props) => (
  props.data
    ? <div className="summary">
      { props.data.map(item => renderSummaryItem(item)) }
      </div>
    : ''
)

