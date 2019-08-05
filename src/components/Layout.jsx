import React, { Component } from 'react';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import '../styles/main.scss';
import style from './layout.module.scss';
import Image from 'gatsby-image';

export default class Layout extends Component {
  render() {
    const { title, children, cover } = this.props;

    return (
      <div className={style.layout}>
        <Header title={title}/>
        { cover && <Image className={style.coverImage} sizes={cover.childImageSharp.sizes}/> }
        <main className={style.main}>{children}</main>
        <Footer/>
      </div>
    )
  }
}
