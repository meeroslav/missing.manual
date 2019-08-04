import React, { Component } from 'react';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import '../styles/main.scss';
import style from './layout.module.scss';

export default class Layout extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className={`${style.layout}`}>
        <Header title={title}/>
        <main>{children}</main>
        <Footer/>
      </div>
    )
  }
}
