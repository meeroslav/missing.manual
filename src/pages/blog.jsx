import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import Image from 'gatsby-image';

export default class BlogPage extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Blog"/>
        <h1>Blog</h1>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const excerpt = node.frontmatter.description || node.excerpt;
          return (
            <div key={node.fields.slug}>
              <Image fixed={node.frontmatter.cover.childImageSharp.fixed}/>
              <h3
                style={{
                  marginBottom: '20px',
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: excerpt,
                }}
              />
            </div>
          );
        })}
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
                fixed(height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
