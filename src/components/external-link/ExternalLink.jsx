import React, { Component } from 'react';

export default class ExternalLink extends Component {
  render() {
    const { to, children, className } = this.props;

    return (
      <a className={className} href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};
