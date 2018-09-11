import React from 'react';

export default (props) => (
  props.data
    ? <div className={`tags ${props.prefix}-tags`}>
      { props.name ? <span className="tags--tag">{ props.name}</span>: '' }
      { props.data.split(',').map((tag, idx) => <span className="tags--value" key={idx}> {tag} </span> )}
    </div>
    : ''
)