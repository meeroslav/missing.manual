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
  console.log(props);
  return (
    <div className={style.layout}>
      <SEO title={title} description={description} />
      <Header/>
      { hero && <Image sizes={hero}/> }
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
