import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio/Bio.jsx';
import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import style from './blog-post.module.scss';

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    const cover = post.frontmatter.cover;

    console.log(post);

    return (
      <Layout location={this.props.location} title={siteTitle} cover={cover}>
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
        <div className={style.blogPost} dangerouslySetInnerHTML={{ __html: post.html }} />
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
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
      fields {
        slug
        readingTime {
          text
        }
      }      
    }
  }
`;
