import React from 'react';
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import '../../styles/main.scss';
import style from './layout.module.scss';
import SEO from '../seo/Seo';
import Image from 'gatsby-image';

const Layout = ({ children, hero, ...props }) => {
  const title = props.title || props.pathContext.frontmatter.title;
  return (
    <div className={style.layout}>
      <SEO title={title}/>
      <Header/>
      {hero || <Image sizes={props.data.cover.childImageSharp.sizes}/> }
      <main className={style.main}>
        <section className={style.mainSection}>
          {children}
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
