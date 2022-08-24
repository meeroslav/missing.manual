import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import MiniPost from '../components/mini-post/MiniPost';
import H from '../components/heading/Heading';

const BlogPage = ({ data }) => {
  const posts = data.allMdx.edges;

  return (
    <Layout location={data.location}
      hero={data.cover.childImageSharp.fluid}
      title="Blog">
      <H>Blog</H>
      <span /><span />
      {posts.map(({ node }, i) => <MiniPost {...node} key={i} />)}
    </Layout>
  );
};
export default BlogPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    cover: file(absolutePath: { regex: "/pages\/blog.jpg/" }) {
      childImageSharp {
        gatsbyImageData(transformOptions: {cropFocus: CENTER}, layout: FULL_WIDTH)
      }
    }
    allMdx(
        filter: { frontmatter: { published: { eq: true } }},
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
                gatsbyImageData(transformOptions: {cropFocus: CENTER}, layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`;
