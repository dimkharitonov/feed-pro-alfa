import React from 'react';

export default (props) => (
  props.data
    ? <div className="persons">
      <span className="tags--tag">Люди</span>
      { props.data.split(',').map((tag, idx) => {
        const [name, title] = tag.split('.');
        return (
          <div className="persons--details" key={idx}>
            <div className="details--name"><span>{name}</span></div>
            <div className="details--title">{title}</div>
          </div>
        );
        }
        )}
    </div>
    : ''
)