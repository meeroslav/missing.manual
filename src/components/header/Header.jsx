import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import style from './header.module.scss';

const touchDevice = typeof window !== 'undefined' ?
  window.matchMedia('(any-pointer: coarse)').matches :
  false;

const Header = props => {
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
    ev.currentTarget.parentElement.classList.toggle(style.expanded);
    document.body.classList.toggle('navExpanded');
  };

  const Burger = () => (
    <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
      className={style.burger}
      onTouchStart={ev => touchDevice && handleBurger(ev)}
      onMouseDown={ev => !touchDevice && handleBurger(ev)}
      role="navigation"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9">
        <path className={style.bar1} fill="currentColor" d="M0,0H11V1.44H0Z" />
        <path className={style.bar2} fill="currentColor" d="M0,3.78H11V5.22H0Z" />
        <path className={style.bar3} fill="currentColor" d="M0,7.56H11V9H0Z" />
      </svg>
    </div>
  );

  return (
    <header className={style.header}>
      <nav className={style.horizontalNav}>
        { menuItems
          .filter((item, i) => i < menuItems.length / 2)
          .filter(({ node }) => !node.home && !node.footerOnly)
          .map(({ node }, i) => {
          return <Link
            to={node.link}
            className={`${style.link}`}
            key={i}>{ node.label }</Link>
        }) }
        <Link
          className={`${style.link} ${style.mainLink}`}
          to={`/`}
        >
          Missing.manual
        </Link>
        { menuItems
          .filter((item, i) => i >= menuItems.length / 2)
          .filter(({ node }) => !node.home && !node.footerOnly)
          .map(({ node }, i) => {
          return <Link
            to={node.link}
            className={`${style.link}`}
            key={i}>{ node.label }</Link>
        }) }
      </nav>
      <Burger/>
      <nav className={style.verticalNav}>
        { menuItems
          .map(({ node }, i) => {
            return <Link
              to={node.link}
              className={`${style.link}`}
              key={i}>{ node.label }</Link>
          })
        }
      </nav>
    </header>
  );
};

export default Header;
