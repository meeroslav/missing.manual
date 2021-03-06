import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import style from './bio.module.scss';

const Bio = ({ className }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <div className={`${className} ${style.bio}`}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        className={style.bioImage}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div className={style.bioText}>
        Written by <strong>{author}</strong>, a software developer focusing on the front-end of things.<br />
        He lives and works in Vienna, Austria.
      </div>
    </div>
  )
};

export default Bio;
