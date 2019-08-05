import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import style from './blog-post.module.scss';

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    const cover = post.frontmatter.cover;

    console.log(post);

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        {cover && <Image sizes={cover.childImageSharp.sizes}/> }
        <h1 className={style.blogPostHeading}>
          {post.frontmatter.title}
        </h1>
        <p className={style.blogPostDate}>
          <small>{post.frontmatter.date}</small>
        </p>
        <div className={style.blogPostBody} dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        cover {
          publicURL
          childImageSharp {
            sizes(maxWidth: 2000, maxHeight: 600) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
