import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Bio from '../components/bio/Bio.jsx';
import Layout from '../components/layout/Layout.jsx';
import style from './blog-post.module.scss';

export default function BlogPostTemplate(props) {
  const post = props.data.mdx;
  const { previous, next } = props.pageContext;
  const location = props.location;

  return (
    <Layout location={location}
            hero={post.frontmatter.cover.childImageSharp.sizes}
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}>
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
  );
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
