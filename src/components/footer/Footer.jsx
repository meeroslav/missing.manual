import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import style from './footer.module.scss';
import ExternalLink from '../external-link/ExternalLink';
import { FaMediumM, FaGithub, FaLinkedin, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';

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
      site {
        siteMetadata {
          social {
            twitter
            behance
            linkedIn
            instagram
            github
            medium
          }
        }
      }
    }
  `);

  const menuItems = data.allMenuJson.edges;
  const { social } = data.site.siteMetadata;

  return (
    <footer className={`${style.footer}`}>
      <nav className={style.socialNav}>
        <ExternalLink
          className={style.socialLink}
          to={`https://twitter.com/${social.twitter}`}>
          <FaTwitter />
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://github.com/${social.github}`}>
          <FaGithub />
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://www.linkedin.com/in/${social.linkedIn}`}>
          <FaLinkedin />
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://www.instagram.com/${social.instagram}`}>
          <FaInstagram />
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://www.behance.net/${social.behance}`}>
          <FaBehance />
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://medium.com/@${social.medium}`}>
          <FaMediumM />
        </ExternalLink>
      </nav>
      <nav className={style.menuNav}>
        {menuItems.map(({ node }, i) => {
          return <Link
            to={node.link}
            className={style.footerLink}
            key={i}>{node.label}</Link>;
        })}
      </nav>
      <div className={style.footnote}>
        Built using <ExternalLink to="https://www.gatsbyjs.com/">Gatsby</ExternalLink> ・ Source available on <ExternalLink to="https://github.com/meeroslav/missing.manual"><FaGithub /> GitHub</ExternalLink>
        <br />
        Miroslav Jonas © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
