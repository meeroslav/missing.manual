import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

import Bio from '../components/bio/Bio';
import Layout from '../components/layout/Layout';
import { blogPost, bioDivider, blogPostNavigation, blogPostNavigationPrev, blogPostNavigationNext } from './blog-post.module.scss';
import ExternalLink from '../components/external-link/ExternalLink';
import H from '../components/heading/Heading';

export default function BlogPostTemplate(props) {
  const post = props.data.mdx;
  const { previous, next } = props.pageContext;
  const location = props.location;
  const tags = post.frontmatter.tags
    ? post.frontmatter.tags.split(',').map(tag => tag.trim())
    : null;

  const tweetLink = `https://twitter.com/intent/tweet?text=Check out this post by @meeroslav 👇%0ahttps://missing-manual.com${post.fields.slug}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=https://missing-manual.com${post.fields.slug}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=https://missing-manual.com${post.fields.slug}`

  return (
    <Layout location={location}
      hero={post.frontmatter.cover?.childImageSharp.gatsbyImageData}
      title={post.frontmatter.title}
      canonical={post.frontmatter.canonical}
      description={post.frontmatter.description || post.excerpt}>
      <p className={blogPost}>
        <small>
          {post.frontmatter.date} ・ {post.fields.readingTime.text}
        </small>
        {post.frontmatter.coverInfo && (<> ・ <small>Cover by <span dangerouslySetInnerHTML={{ __html: post.frontmatter.coverInfo }} /></small></>)}
      </p>
      <H>
        {post.frontmatter.title}
      </H>
      <p className={blogPost}>
        <small>
          {tags && (
            <span className="tags">
              {tags.map(t => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </span>
          )}
        </small>
      </p>
      <div className={blogPost}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
      <hr />
      <p>
        <br />
        Did you like the post? Share it on <ExternalLink to={tweetLink}>Twitter <FaTwitter /></ExternalLink>, <ExternalLink to={linkedInLink}>LinkedIn <FaLinkedin /></ExternalLink> or <ExternalLink to={fbLink}>Facebook <FaFacebook /></ExternalLink>.
        <br />
        Did you find it helpful? Leaving <ExternalLink to="https://www.paypal.com/paypalme/meeroslav">a small tip <span role="img" aria-label="coffee">☕</span> </ExternalLink> helps.
      </p>
      <hr className={bioDivider} />
      <Bio className={blogPost} />

      <ul className={blogPostNavigation}>
        {previous && (
          <li className={blogPostNavigationPrev}>
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li className={blogPostNavigationNext}>
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    </Layout >
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
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
        published
        canonical
        tags
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(transformOptions: {cropFocus: CENTER}, layout: FULL_WIDTH)
          }
        }
        coverInfo
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
