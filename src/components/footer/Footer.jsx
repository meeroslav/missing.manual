import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import style from './footer.module.scss';
import ExternalLink from '../external-link/ExternalLink';

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
      © {new Date().getFullYear()}, Built with <ExternalLink to={"https://www.gatsbyjs.org"}>Gatsby</ExternalLink>
    </footer>
  );
};

export default Footer;
