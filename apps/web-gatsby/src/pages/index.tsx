import * as React from "react";
import Layout from '../components/layout/Layout';
import Talk from '../components/talk/Talk';
import MiniPost from '../components/mini-post/MiniPost';
import { graphql } from 'gatsby';
import IndexHero from '../components/index-hero/IndexHero';

const today = Date.now();

// markup
const IndexPage = ({ data, location }) => {
  const posts = data.blogPosts.edges;
  const upcomingTalks = data.talks.edges.filter(({ node }) => new Date(node.date).getTime() > today);

  return (
    <Layout
      location={location}
      heroComponent={<IndexHero text={'Miroslav Jonaš'} />}
      title="Home">
      <h2>Latest posts</h2>
      <span /><span />
      {posts.map(({ node }, i) => <MiniPost {...node} key={i} />)}
      {upcomingTalks.length > 0 && <>
        <h2>Upcoming talks</h2>
        <span /><span />
        {upcomingTalks.map(({ node }, i) => <Talk {...node} key={i} />)}
      </>}
    </Layout >
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
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
            readingTime {
              text
            }
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
    talks: allTalksJson(
      sort: { fields: [date], order: DESC },
      limit: 10
    ) {
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
