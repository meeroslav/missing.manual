import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import React from 'react';
import { miniPost, miniPostImage, miniPostText, miniPostDate } from './mini-post.module.scss';

const MiniPost = props => {
  const title = props.frontmatter.title || props.fields.slug;
  const excerpt = props.frontmatter.description || props.excerpt;
  const tags = props.frontmatter.tags
    ? props.frontmatter.tags.split(',').map(tag => tag.trim())
    : null;

  return (
    <div key={props.fields.slug} className={miniPost}>
      <GatsbyImage className={miniPostImage} image={props.frontmatter.cover.childImageSharp.gatsbyImageData} alt={title} />
      <section className={miniPostText}>
        <h3>
          <Link to={props.fields.slug}>
            {title}
          </Link>
        </h3>
        <small className={miniPostDate}>
          {props.frontmatter.date}
          {tags && (` ・ `)}
          {tags && (<span className="tags">
            {tags.map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </span>)}
        </small>
        <p
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      </section>
    </div>
  );
};

export default MiniPost;
