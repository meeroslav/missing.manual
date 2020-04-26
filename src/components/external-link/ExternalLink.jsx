import React from 'react';

const ExternalLink = ({ to, children, className }) => {
    const target = (to || '').startsWith('mailto:') ? '_self' : '_blank';

    return (
      <a className={className} href={to} target={target} rel="noopener noreferrer">
        {children}
      </a>
    );
};

export default ExternalLink;
