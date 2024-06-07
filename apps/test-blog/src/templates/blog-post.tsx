import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

import Bio from '../components/bio/Bio';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import ExternalLink from '../components/external-link/ExternalLink';
import H from '../components/heading/Heading';
import {
  blogPost,
  bioDivider,
  blogPostNavigation,
  blogPostNavigationPrev,
  blogPostNavigationNext,
} from './blog-post.module.scss';

const BlogPostTemplate = ({ data, location }) => {
  const { previous, next, site, markdownRemark: post } = data;
  const tags = post.frontmatter.tags
    ? post.frontmatter.tags.split(',').map(tag => tag.trim())
    : null;
  const tweetLink = `https://twitter.com/intent/tweet?text=Check out this post by @meeroslav 👇%0ahttps://missing-manual.com${post.fields.slug}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=https://missing-manual.com${post.fields.slug}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=https://missing-manual.com${post.fields.slug}`;

  return (
    <Layout
      location={location}
      title={post.frontmatter.title}
      hero={post.frontmatter.cover?.childImageSharp.gatsbyImageData}
    >
      <article
        className={blogPost}
        itemScope
        itemType="http://schema.org/Article"
      >
        <small>
          {post.frontmatter.date} ・ {post.fields.readingTime.text}
        </small>
        {post.frontmatter.coverInfo && (
          <>
            {' '}
            ・{' '}
            <small>
              Cover by{' '}
              <span
                dangerouslySetInnerHTML={{ __html: post.frontmatter.coverInfo }}
              />
            </small>
          </>
        )}
        <H>{post.frontmatter.title}</H>
        <small>
          {tags && (
            <span className="tags">
              {tags.map(t => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </span>
          )}
        </small>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>

      <hr />
      <p>
        <br />
        Did you like the post? Share it on{' '}
        <ExternalLink to={tweetLink}>
          Twitter <FaTwitter />
        </ExternalLink>
        ,{' '}
        <ExternalLink to={linkedInLink}>
          LinkedIn <FaLinkedin />
        </ExternalLink>{' '}
        or{' '}
        <ExternalLink to={fbLink}>
          Facebook <FaFacebook />
        </ExternalLink>
        .
        <br />
        Did you find it helpful? Leaving{' '}
        <ExternalLink to="https://www.paypal.com/paypalme/meeroslav">
          a small tip{' '}
          <span role="img" aria-label="coffee">
            ☕
          </span>{' '}
        </ExternalLink>{' '}
        helps.
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
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      canonical={post.frontmatter.canonical}
      description={post.frontmatter.description || post.excerpt}
      image={post.frontmatter.cover?.childImageSharp.gatsbyImageData}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previous: String, $next: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        readingTime {
          text
        }
      }
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
            gatsbyImageData(
              transformOptions: { cropFocus: CENTER }
              layout: FULL_WIDTH
            )
          }
        }
        coverInfo
      }
    }
    previous: markdownRemark(id: { eq: $previous }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $next }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
