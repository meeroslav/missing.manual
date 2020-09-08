import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import MiniPost from '../components/mini-post/MiniPost';

const BlogPage = ({ data }) => {
  const posts = data.allMdx.edges;

  return (
    <Layout location={data.location}
      hero={data.cover.childImageSharp.fluid}
      title="Blog">
      <h1>Blog</h1>
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
      }
    }
    cover: file(absolutePath: { regex: "/pages\/blog.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 2000, maxHeight: 600) {
          ...GatsbyImageSharpFluid
        }
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
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            published
            description
            cover {
              publicURL
              childImageSharp {
                fluid(maxWidth: 320) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
