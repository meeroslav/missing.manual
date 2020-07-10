import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import Talk from '../components/talk/Talk.jsx';
import MiniPost from '../components/mini-post/MiniPost';
import IndexHero from '../components/index-hero/IndexHero';

const Home = ({ data }) => {
  const posts = data.blogPosts.edges;
  const upcomingTalks = data.upcomingTalks.edges;

  return (
    <Layout location={data.location}
            title="Home">
      <IndexHero text={'Missing manual'}/>
      <h2>Latest posts</h2>
      { posts.map(({ node }, i) => <MiniPost {...node} key={i}/>) }
      <h2>Upcoming talks</h2>
      { upcomingTalks.map(({ node }, i) => <Talk {...node} key={i}/>) }
    </Layout>
  );
};
export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    blogPosts: allMdx(
        filter: { frontmatter: { published: { eq: true } }},
        limit: 3,
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            published
            description
            cover {
              publicURL
              childImageSharp {
                sizes(maxWidth: 320) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
    upcomingTalks: allTalksJson(
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
        }
      }
    }
  }
`;
