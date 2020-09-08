import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import ExternalLink from '../external-link/ExternalLink';
import style from './talk.module.scss';

const Talk = ({ title, date, event, slides, video, link, image, type }) => {
  const data = useStaticQuery(graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 320) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `);
  const imageFluid = data.images.edges.find(({ node }) =>
    node.relativePath.match('talks') && node.relativePath.includes(image));

  return (
    <div className={style.talk}>
      {video ?
        <div className={`${style.talkImage} iframeContainer`}>
          <iframe
            src={video}
            title="video"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen />
        </div> :
        imageFluid && <Image
          className={style.talkImage}
          fluid={imageFluid.node.childImageSharp.fluid}
          alt={title}
        />
      }
      <div className={style.talkText}>
        <h3><ExternalLink to={link}>{title}</ExternalLink></h3>
        <small>{date}</small>
        <div>{event}</div>
        {slides && <div><ExternalLink to={slides}>Slides</ExternalLink></div>}
        {type === 'MC' && <div>MC/Stage Moderator</div>}
      </div>
    </div>
  );
};

export default Talk;
