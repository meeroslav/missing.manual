import React, { Component } from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';

export default class AboutPage extends Component {
    render() {
      const { data } = this.props;
      const siteTitle = data.site.siteMetadata.title;

      return (
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="About" />
          <h1>About</h1>
          <p>Some text will be here</p>
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
  }
`;
