import React from 'react';
import './container.scss';



function Container({ children }) {
  return (
    <div className="container">{children}</div>
  );
}

export default Container;
