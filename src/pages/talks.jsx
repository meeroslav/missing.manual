import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import Talk from '../components/talk/Talk.jsx';
import H from '../components/heading/Heading';

const TalksPage = ({ data }) => {
  const upcoming = data.upcoming.edges;
  const past = data.past.edges;

  return (
    <Layout location={data.location}
      hero={data.cover.childImageSharp.fluid}
      title="Talks">
      <H>Talks</H>
      {upcoming.length && <h2>Upcoming talks</h2>}
      {upcoming.map(({ node }, i) => <Talk {...node} key={i} />)}
      <h2>Previous talks</h2>
      {past.map(({ node }, i) => <Talk {...node} key={i} />)}
    </Layout>
  );
};
export default TalksPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    cover: file(absolutePath: { regex: "/pages\/talk.jpeg/" }) {
      childImageSharp {
        fluid(maxWidth: 2000, maxHeight: 600, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    upcoming: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { gt: "2020-05-28" }}
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
      filter: { date: { lt: "2020-05-28" }}
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
