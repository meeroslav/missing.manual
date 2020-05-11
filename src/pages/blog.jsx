import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import MiniPost from '../components/mini-post/MiniPost';

export default class BlogPage extends Component {
  render() {
    const { data } = this.props;
    const posts = data.allMdx.edges;

    return (
      <Layout location={data.location}
              hero={data.cover.childImageSharp.sizes}
              title="Blog">
        <h1>Blog</h1>
        {posts.map(({ node }, i) => <MiniPost {...node} key={i} />)}
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
    cover: file(absolutePath: { regex: "/pages\/blog.jpg/" }) {
      childImageSharp {
        sizes(maxWidth: 2000, maxHeight: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
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
  }
`;
