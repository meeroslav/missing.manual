import React from 'react';
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import '../../styles/main.scss';
import style from './layout.module.scss';
import SEO from '../seo/Seo';
import Image from 'gatsby-image';

const Layout = ({ children, ...props }) => {
  const title = props.title || props.pathContext.frontmatter.title;
  const description = props.description;
  const hero = props.hero || (props.data && props.data.cover.childImageSharp.sizes);
  return (
    <>
      <SEO title={title} description={description}/>
      <div className={style.layout}>
        <Header/>
        {hero && <Image sizes={hero}/>}
        <main className={hero ? style.main : `${style.main} ${style.herolessMain}`}>
          <section className={style.mainSection}>
            {children}
          </section>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;
