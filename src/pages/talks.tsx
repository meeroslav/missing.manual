import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import Talk from '../components/talk/Talk';
import H from '../components/heading/Heading';

const TalksPage = ({ data }) => {
  const upcoming = data.upcoming.edges;
  const past = data.past.edges;

  return (
    <Layout location={data.location}
      hero={data.cover.childImageSharp.gatsbyImageData}
      title="Talks">
      <H>Talks</H>
      {upcoming.length && (<><h2>Upcoming talks</h2><span /></>)}
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
        siteUrl
      }
    }
    cover: file(absolutePath: { regex: "/pages/talk.jpeg/" }) {
      childImageSharp {
        gatsbyImageData(transformOptions: {cropFocus: CENTER}, layout: FULL_WIDTH)
      }
    }
    upcoming: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { gt: "2022-06-27" }}
    ) {
      edges {
        node {
          title
          date(formatString: "MMMM DD, YYYY")
          event
          video
          link
          slides
          type
          coSpeaker
          coSpeakerHandle
        }
      }
    }
    past: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { lt: "2022-06-27" }}
    ) {
      edges {
        node {
          title
          date(formatString: "MMMM DD, YYYY")
          event
          video
          link
          slides
          type
          coSpeaker
          coSpeakerHandle
        }
      }
    }
  }
`;
