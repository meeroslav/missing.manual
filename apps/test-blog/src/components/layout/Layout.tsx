import React from 'react';
import '../../styles/main.scss';
import {
  layout,
  hero as heroStyle,
  main,
  herolessMain,
  mainSection,
} from './layout.module.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = ({ children, ...props }) => {
  const hero =
    props.hero ||
    (props.data && props.data.cover?.childImageSharp.gatsbyImageData);
  const heroComponent = props.heroComponent;
  return (
    <>
      <div className={layout}>
        <Header />
        {hero && (
          <GatsbyImage image={hero} className={heroStyle} alt="Hero image" />
        )}
        {heroComponent}
        <main className={hero ? main : `${main} ${herolessMain}`}>
          <section className={mainSection}>{children}</section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
