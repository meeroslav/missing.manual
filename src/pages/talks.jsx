import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import Talk from '../components/talk/Talk.jsx';

export default class TalksPage extends Component {
  render() {
    const { data } = this.props;
    const upcoming = data.upcoming.edges;
    const past = data.past.edges;

    return (
      <Layout location={data.location}
              hero={data.cover.childImageSharp.sizes}
              title="Talks">
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
    cover: file(absolutePath: { regex: "/pages\/talk.jpeg/" }) {
      childImageSharp {
        sizes(maxWidth: 2000, maxHeight: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    upcoming: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { gt: "2020-05-01" }}
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
      filter: { date: { lt: "2020-05-01" }}
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
