import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import ExternalLink from '../components/external-link/ExternalLink';

export default class ContactPage extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout location={data.location}
              hero={data.cover.childImageSharp.sizes}
              title="Contact">
        <h1>Contact</h1>
        <h4>
          Miroslav Jonas
        </h4>
        <div>
          E-mail: <ExternalLink to={`mailto:missing.manual@gmail.com`}>missing.manual@gmail.com</ExternalLink>
        </div>
        <div>
          Vienna, Austria
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    cover: file(absolutePath: { regex: "/pages\/message-box.jpg/" }) {
      childImageSharp {
        sizes(maxWidth: 2000, maxHeight: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
