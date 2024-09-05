import React from 'react';
import './NameList.css';

const NameList = ({ names }) => {
  return (
    <div className="name-list">
      <ul>
        {names.slice(0, 10).map((name, index) => (
          <li key={index} className="name-item">{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;
