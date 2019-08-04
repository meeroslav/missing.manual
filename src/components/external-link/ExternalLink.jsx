import React from 'react';

const ExternalLink = props => {
  const { to, children } = props;

  return (
    <a href={to} target="_blank" rel="noopener noreferrer">{children}</a>
  );
};

export default ExternalLink;
