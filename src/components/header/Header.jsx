import React from 'react';
import { Link } from 'gatsby';
import style from './header.module.scss';

const Header = props => (
  <header className={`${style.header}`}>
        <h1
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {props.title}
          </Link>
        </h1>
        <Link to={`/`}>Home</Link>
        <Link to={`/about`}>About</Link>
        <Link to={`/blog`}>Blog</Link>
        <Link to={`/talks`}>Talks</Link>
        <Link to={`#contact`}>Contact</Link>
  </header>
);

export default Header;
