import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Bio from '../components/bio/Bio.jsx';
import Layout from '../components/layout/Layout.jsx';
import SEO from '../components/seo/Seo.jsx';
import style from './blog-post.module.scss';
import Image from 'gatsby-image';

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.mdx;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    const cover = post.frontmatter.cover;

    return (
      <Layout location={this.props.location}
              title={siteTitle}
              hero={<Image sizes={cover.childImageSharp.sizes}/>}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1 className={style.blogPostHeading}>
          {post.frontmatter.title}
        </h1>
        <p className={style.blogPost}>
          <small>{post.frontmatter.date} ・ {post.fields.readingTime.text}</small>
        </p>
        <div className={style.blogPost}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
        <div className={style.blogPost}>
          <hr/>
        </div>
        <Bio className={style.blogPost}/>

        <ul className={style.blogPostNavigation}>
          {previous && (
            <li className={style.blogPostNavigationPrev}>
              <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li className={style.blogPostNavigationNext}>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
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
      fields {
        slug
        readingTime {
          text
        }
      }
    }
  }
`;
