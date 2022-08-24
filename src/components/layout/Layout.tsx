import React from 'react';
import '../../styles/main.scss';
import { layout, hero as heroStyle, main, herolessMain, mainSection } from './layout.module.scss';
import { GatsbyImage } from "gatsby-plugin-image";
import Footer from '../footer/Footer';
import SEO from '../seo/Seo';
import Header from '../header/Header';

const Layout = ({ children, ...props }) => {
  const title = props.title || props.pageContext?.frontmatter?.title;

  const description = props.description;
  const hero = props.hero || (props.data && props.data.cover?.childImageSharp.gatsbyImageData);
  const heroComponent = props.heroComponent;
  const canonical = props.canonical;
  return <>
    <SEO title={title} description={description} image={hero} canonical={canonical} />
    <div className={layout}>
      <Header />
      {hero && <GatsbyImage image={hero} className={heroStyle} alt="Hero image" />}
      {heroComponent}
      <main className={hero ? main : `${main} ${herolessMain}`}>
        <section className={mainSection}>
          {children}
        </section>
      </main>
      <Footer />
    </div>
  </>;
};

export default Layout;
