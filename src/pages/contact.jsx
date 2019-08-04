import React, { Component } from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import ExternalLink from '../components/external-link/ExternalLink';
import { FaMediumM, FaGithub, FaLinkedin, FaTwitter, FaBehance, FaAngular, FaInstagram } from 'react-icons/fa';

export default class ContactPage extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const social = data.site.siteMetadata.social;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Contact" />
        <h1>Contact</h1>
        <h4>
          Miroslav Jonas
        </h4>
        <div>
          E-mail: <ExternalLink to={`mailto:missing.manual@gmail.com`}>
          missing.manual@gmail.com
          </ExternalLink>
        </div>
        <div>
          Vienna, Austria
        </div>
        <nav>
          <ExternalLink to={`https://twitter.com/${social.twitter}`}>
            <FaTwitter/>
          </ExternalLink>
          <ExternalLink to={`https://github.com/${social.github}`}>
            <FaGithub/>
          </ExternalLink>
          <ExternalLink to={`https://www.linkedin.com/in/${social.linkedIn}`}>
            <FaLinkedin />
          </ExternalLink>
          <ExternalLink to={`https://www.instagram.com/${social.instagram}`}>
            <FaInstagram/>
          </ExternalLink>
          <ExternalLink to={`https://www.behance.net/${social.behance}`}>
            <FaBehance/>
          </ExternalLink>
          <ExternalLink to={`https://medium.com/@${social.medium}`}>
            <FaMediumM/>
          </ExternalLink>
          <ExternalLink to={`https://angular-austria.at`}>
            <FaAngular/>
          </ExternalLink>
        </nav>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
`;
