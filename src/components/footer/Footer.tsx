import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { socialNav, socialLink, footer as footerStyle, menuNav, footerLink, footnote } from './footer.module.scss';
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
    <footer className={`${footerStyle}`}>
      <nav className={socialNav}>
        <ExternalLink
          className={socialLink}
          to={`https://twitter.com/${social.twitter}`}>
          <FaTwitter title="Link to Twitter acount" />
        </ExternalLink>
        <ExternalLink
          className={socialLink}
          to={`https://github.com/${social.github}`}>
          <FaGithub title="Link to GitHub acount" />
        </ExternalLink>
        <ExternalLink
          className={socialLink}
          to={`https://www.linkedin.com/in/${social.linkedIn}`}>
          <FaLinkedin title="Link to LinkedIn acount" />
        </ExternalLink>
        <ExternalLink
          className={socialLink}
          to={`https://www.instagram.com/${social.instagram}`}>
          <FaInstagram title="Link to Instagram acount" />
        </ExternalLink>
        <ExternalLink
          className={socialLink}
          to={`https://www.behance.net/${social.behance}`}>
          <FaBehance title="Link to Behance acount" />
        </ExternalLink>
        <ExternalLink
          className={socialLink}
          to={`https://medium.com/@${social.medium}`}>
          <FaMediumM title="Link to Medium acount" />
        </ExternalLink>
      </nav>
      <nav className={menuNav}>
        {menuItems.map(({ node }, i) => {
          return <Link
            to={node.link}
            className={footerLink}
            key={i}>{node.label}</Link>;
        })}
      </nav>
      <div className={footnote}>
        Built using <ExternalLink to="https://www.gatsbyjs.com/">Gatsby</ExternalLink> ・ Source available on <ExternalLink to="https://github.com/meeroslav/missing.manual"><FaGithub /> GitHub</ExternalLink>
        <br />
        Miroslav Jonas © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
