import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { expanded, burger, bar1, bar2, bar3, verticalNav, horizontalNav, mainLink, link, header as headerStyle } from './header.module.scss';

const touchDevice = typeof window !== 'undefined' ?
  window.matchMedia('(any-pointer: coarse)').matches :
  false;

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allMenuJson {
        edges {
          node {
            label
            link
            home
            footerOnly
          }
        }
      }
    }
  `);
  const menuItems = data.allMenuJson.edges;

  const handleBurger = (ev) => {
    ev.currentTarget.parentElement.classList.toggle(expanded);
    document.body.classList.toggle('navExpanded');
  };

  const Burger = () => (
    <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
      className={burger}
      onTouchStart={ev => touchDevice && handleBurger(ev)}
      onMouseDown={ev => !touchDevice && handleBurger(ev)}
      role="navigation"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9">
        <path className={bar1} fill="currentColor" d="M0,0H11V1.44H0Z" />
        <path className={bar2} fill="currentColor" d="M0,3.78H5.5V5.22H0Z" />
        <path className={bar2} fill="currentColor" d="M5.5,3.78H11V5.22H5.5Z" />
        <path className={bar3} fill="currentColor" d="M0,7.56H11V9H0Z" />
      </svg>
    </div>
  );

  return (
    <header className={headerStyle}>
      <nav className={horizontalNav}>
        <Link
          className={`${link} ${mainLink}`}
          to={`/`}
        >
          Miroslav Jonaš
        </Link>
        {menuItems
          .filter(({ node }) => !node.home && !node.footerOnly)
          .map(({ node }, i: number) => {
            return <Link
              to={node.link}
              className={`${link}`}
              key={i}>{node.label}</Link>
          })}
      </nav>
      <Burger />
      <nav className={verticalNav}>
        {menuItems
          .map(({ node }, i: number) => {
            return <Link
              to={node.link}
              className={`${link}`}
              key={i}>{node.label}</Link>
          })
        }
      </nav>
    </header>
  );
};

export default Header;
