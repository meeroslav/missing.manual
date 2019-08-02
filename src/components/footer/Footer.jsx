import React from 'react';
import { Link } from 'gatsby';
import style from './footer.module.scss';

const Footer = props => (
  <footer className={`${style.footer}`}>
        <Link to={`/`}>Home</Link>
        <Link to={`/about`}>About</Link>
        <Link to={`/blog`}>Blog</Link>
        <Link to={`/talks`}>Talks</Link>
        <Link to={`#contact`}>Contact</Link>
        © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
);

export default Footer;