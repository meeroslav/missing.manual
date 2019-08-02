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
    <header className={`${style.header}`}>
      <h1
        style={{
          marginTop: 0,
          display: 'inline-block',
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
      { menuItems.map(({ node }, i) => {
        return <Link to={node.link} key={i}>{ node.label }</Link>
      }) }
    </header>
  );
};

export default Header;
