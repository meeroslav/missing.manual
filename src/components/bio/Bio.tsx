import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { bio, bioImage, bioText } from './bio.module.scss';
import { StaticImage } from 'gatsby-plugin-image';

const Bio = ({ className }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <div className={`${className} ${bio}`}>
      <StaticImage src="../../images/profile-pic.jpg" alt={author} className={bioImage} width={50}
        height={50} />
      <div className={bioText}>
        Written by <strong>{author}</strong>, a software developer focusing on the front-end of things.<br />
        He lives and works in Vienna, Austria.
      </div>
    </div>
  )
};

export default Bio;
