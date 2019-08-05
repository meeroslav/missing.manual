import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import Talk from '../components/talk/Talk.jsx';

export default class TalksPage extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const upcoming = data.upcoming.edges;
    const past = data.past.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Talks"/>
        <h1>Talks</h1>
        <h2>Upcoming talks</h2>
        {upcoming.map(({ node }, i) => <Talk {...node} key={i}/>)}
        <h2>Previous talks</h2>
        {past.map(({ node }, i) => <Talk {...node} key={i}/>)}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    upcoming: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { gt: "2019-01-01" }}
    ) {
      edges {
        node {
          title
          date(formatString: "MMMM DD, YYYY")
          event
          image
          video
          link
          slides
          type
        }
      }
    }
    past: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { lt: "2019-01-01" }}
    ) {
      edges {
        node {
          title
          date(formatString: "MMMM DD, YYYY")
          event
          image
          video
          link
          slides
          type
        }
      }
    }
  }
`;