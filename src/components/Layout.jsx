import React, { Component } from 'react';
import './layout.scss';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import '../styles/main.scss';

export default class Layout extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div>
        <Header title={title}/>
        <main>{children}</main>
        <Footer/>
      </div>
    )
  }
}
