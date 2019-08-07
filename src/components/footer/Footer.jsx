import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import style from './footer.module.scss';
import ExternalLink from '../external-link/ExternalLink';
import { FaMediumM, FaGithub, FaLinkedin, FaTwitter, FaBehance, FaAngular, FaInstagram } from 'react-icons/fa';

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
          <FaTwitter/>
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://github.com/${social.github}`}>
          <FaGithub/>
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://www.linkedin.com/in/${social.linkedIn}`}>
          <FaLinkedin />
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://www.instagram.com/${social.instagram}`}>
          <FaInstagram/>
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://www.behance.net/${social.behance}`}>
          <FaBehance/>
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://medium.com/@${social.medium}`}>
          <FaMediumM/>
        </ExternalLink>
        <ExternalLink
          className={style.socialLink}
          to={`https://angular-austria.at`}>
          <FaAngular/>
        </ExternalLink>
      </nav>
      <nav className={style.menuNav}>
        { menuItems.map(({ node }, i) => {
          return <Link
            to={node.link}
            className={style.footerLink}
            key={i}>{node.label}</Link>;
        })}
      </nav>
      <div className={style.footnote}>
        Miroslav Jonas © {new Date().getFullYear()}
        ・
        Built with <ExternalLink to={"https://www.gatsbyjs.org"}>Gatsby</ExternalLink>
        ・
        <ExternalLink to={"https://www.netlify.com/"}>
          <img alt={"Deploys by Netlify badge"} src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"/>
        </ExternalLink>
      </div>
    </footer>
  );
};

export default Footer;
