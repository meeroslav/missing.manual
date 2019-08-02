import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

class TalksPage extends React.Component {
    render() {
      const { data } = this.props
      const siteTitle = data.site.siteMetadata.title
  
      return (
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Talks" />
          <h1>Talks</h1>
          <p>Some text will be here</p>
        </Layout>
      )
    }
}
  
export default TalksPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`