import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import style from './header.module.scss';

const Header = props => {
  const data = useStaticQuery(graphql`
    query {
      allMenuJson {
        edges {
          node {
            label
            link
          }
        }
      }
    }
  `);
  const menuItems = data.allMenuJson.edges;

  return (
    <header className={style.header}>
      <nav>
        { menuItems
          .filter((item, i) => i < menuItems.length / 2)
          .filter(({ node }) => node.link !== '/')
          .map(({ node }, i) => {
          return <Link
            to={node.link}
            className={style.link}
            key={i}>{ node.label }</Link>
        }) }
        <Link
          className={`${style.link} ${style.mainLink}`}
          to={`/`}
        >
          {props.title}
        </Link>
        { menuItems
          .filter((item, i) => i >= menuItems.length / 2)
          .filter(({ node }) => node.link !== '/')
          .map(({ node }, i) => {
          return <Link
            to={node.link}
            className={style.link}
            key={i}>{ node.label }</Link>
        }) }
      </nav>
    </header>
  );
};

export default Header;
