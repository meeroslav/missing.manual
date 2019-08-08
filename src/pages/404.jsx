import React, { Component } from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout.jsx';
import SEO from '../components/seo/Seo.jsx';

export default class NotFoundPage extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle} cover={data.cover}>
        <SEO title="404: Not Found" />
        <h1>These are not the droids you are looking for</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
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
    cover: file(absolutePath: { regex: "/pages\/404.jpg/" }) {
      childImageSharp {
        sizes(maxWidth: 2000, maxHeight: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
