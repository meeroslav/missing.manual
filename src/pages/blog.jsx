import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout.jsx';
import SEO from '../components/seo/Seo.jsx';

import MiniPost from '../components/mini-post/MiniPost';

export default class BlogPage extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle} cover={data.cover}>
        <SEO title="Blog"/>
        <h1>Blog</h1>
        {posts.map(({ node }) => <MiniPost {...node} />)}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
