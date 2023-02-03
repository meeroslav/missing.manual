import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import Talk from '../components/talk/Talk';
import H from '../components/heading/Heading';

const today = Date.now();

const TalksPage = ({ data }) => {
  const upcoming = data.allTalks.edges.filter(({ node }) => new Date(node.date).getTime() > today);
  const past = data.allTalks.edges.filter(({ node }) => new Date(node.date).getTime() < today);

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
    allTalks: allTalksJson(
      sort: { fields: [date], order: DESC },
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
