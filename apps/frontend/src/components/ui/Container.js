import React from 'react';

const Container = (props) => (
  <div {...props} className="container mx-auto px-8">{props.children}</div>
);

export default Container;
