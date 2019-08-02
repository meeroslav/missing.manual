import React from 'react';
import './layout.scss';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';

import { rhythm } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header title={title}></Header>
        <main>{children}</main>
        <Footer></Footer>
      </div>
    )
  }
}

export default Layout
