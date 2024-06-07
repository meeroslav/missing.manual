import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import IndexHero from '../components/index-hero/IndexHero';
import Talk from '../components/talk/Talk';
import MiniPost from '../components/mini-post/MiniPost';

const today = Date.now();

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Home`;
  const posts = data.allMarkdownRemark.nodes;
  const upcomingTalks = data.talks.edges.filter(
    ({ node }) => new Date(node.date).getTime() > today
  );

  return (
    <Layout
      location={location}
      title={siteTitle}
      heroComponent={<IndexHero text={'Miroslav Jonaš'} />}
    >
      <h2>Latest posts</h2>
      <span />
      <span />
      {posts.map((node, i) => (
        <MiniPost {...node} key={i} />
      ))}
      {upcomingTalks.length > 0 && (
        <>
          <h2>Upcoming talks</h2>
          <span />
          <span />
          {upcomingTalks.map(({ node }, i) => (
            <Talk {...node} key={i} />
          ))}
        </>
      )}
    </Layout>
  );
};

export default IndexPage;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      limit: 3
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          cover {
            publicURL
            childImageSharp {
              gatsbyImageData(
                transformOptions: { cropFocus: CENTER }
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    talks: allTalksJson(sort: { date: DESC }, limit: 10) {
      edges {
        node {
          title
          date(formatString: "MMMM DD, YYYY")
          event
          video
          link
          type
          slides
          coSpeaker
          coSpeakerHandle
        }
      }
    }
  }
`;
