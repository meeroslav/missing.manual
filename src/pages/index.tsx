import * as React from "react";
import Layout from '../components/layout/Layout';
import Talk from '../components/talk/Talk';
import MiniPost from '../components/mini-post/MiniPost';
import { graphql } from 'gatsby';
import IndexHero from '../components/index-hero/IndexHero';

// markup
const IndexPage = ({ data, location }) => {
  const posts = data.blogPosts.edges;
  const upcomingTalks = data.upcomingTalks.edges;

  return (
    <Layout
      location={location}
      heroComponent={<IndexHero text={'Miroslav Jonaš'} />}
      title="Home">
      <h2>Latest posts</h2>
      <span /><span />
      {posts.map(({ node }, i) => <MiniPost {...node} key={i} />)}
      <h2>Upcoming talks</h2>
      <span /><span />
      {upcomingTalks.map(({ node }, i) => <Talk {...node} key={i} />)}
    </Layout >
  )
}

export default IndexPage

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
            canonical
            description
            tags
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
    }
    upcomingTalks: allTalksJson(
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
          coSpeaker
          coSpeakerHandle
        }
      }
    }
  }
`;
