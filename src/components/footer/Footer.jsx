import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import style from './footer.module.scss';

const Footer = () => {
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
    <footer className={`${style.footer}`}>
      <nav>
        { menuItems.map(({ node }, i) => {
          return <Link to={node.link} key={i}>{node.label}</Link>;
        })}
      </nav>
      © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

export default Footer;
