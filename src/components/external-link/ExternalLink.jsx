import React, { Component } from 'react';

export default class ExternalLink extends Component {
  render() {
    const { to, children, className } = this.props;
    const target = to.startsWith('mailto:') ? '_self' : '_blank';

    return (
      <a className={className} href={to} target={target} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};
