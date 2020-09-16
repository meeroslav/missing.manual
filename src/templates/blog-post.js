import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

import Bio from '../components/bio/Bio.jsx';
import Layout from '../components/layout/Layout.jsx';
import style from './blog-post.module.scss';
import ExternalLink from '../components/external-link/ExternalLink.jsx';

export default function BlogPostTemplate(props) {
  const post = props.data.mdx;
  const siteUrl = props.data.site.siteMetadata.siteUrl;
  const { previous, next } = props.pageContext;
  const location = props.location;
  const tags = post.frontmatter.tags
    ? post.frontmatter.tags.split(',').map(tag => tag.trim())
    : null;
  const disqusConfig = {
    url: `${siteUrl + location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
  }

  const tweetLink = `https://twitter.com/intent/tweet?text=Check out this post by @meeroslav 👇%0ahttps://missing-manual.com${post.fields.slug}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=https://missing-manual.com${post.fields.slug}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=https://missing-manual.com${post.fields.slug}`

  return (
    <Layout location={location}
      hero={post.frontmatter.cover.childImageSharp.fluid}
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}>
      {post.frontmatter.coverInfo && (<p className={style.blogPost}>
        <small dangerouslySetInnerHTML={{ __html: post.frontmatter.coverInfo }} />
      </p>)
      }
      <h1 className={style.blogPostHeading}>
        {post.frontmatter.title}
      </h1>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <p className={style.blogPost}>
        <small>
          {post.frontmatter.date} ・ {post.fields.readingTime.text}
          {tags && (` ・ `)}
          {tags && (<span className="tags">
            { tags.map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </span>)}
        </small>
      </p>
      <div className={style.blogPost}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
      <p>
        <br />
        Did you like the post? Share it on <ExternalLink to={tweetLink}>Twitter <FaTwitter /></ExternalLink>, <ExternalLink to={linkedInLink}>LinkedIn <FaLinkedin /></ExternalLink> or <ExternalLink to={fbLink}>Facebook <FaFacebook /></ExternalLink>.
        <br />
        Did you find it helpful? Leaving <ExternalLink to="https://www.paypal.com/paypalme/meeroslav">a small tip <span role="img" aria-label="coffee">☕</span></ExternalLink> helps.
      </p>
      <Disqus config={disqusConfig} />
      <hr className={style.bioDivider} />
      <Bio className={style.blogPost} />

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
        tags
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2000, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
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
