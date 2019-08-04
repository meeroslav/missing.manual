import Image from 'gatsby-image';
import { Link } from 'gatsby';
import React from 'react';
import style from './mini-post.module.scss';

const MiniPost = props => {
  const title = props.frontmatter.title || props.fields.slug;
  const excerpt = props.frontmatter.description || props.excerpt;
  return (
    <div key={props.fields.slug} className={style.miniPost}>
      <Image className={style.miniPostImage} sizes={props.frontmatter.cover.childImageSharp.sizes}/>
      <section className={style.miniPostText}>
        <h3>
          <Link to={props.fields.slug}>
            {title}
          </Link>
        </h3>
        <small className={style.miniPostDate}>
          {props.frontmatter.date}
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
