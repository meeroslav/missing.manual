import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import ExternalLink from '../external-link/ExternalLink';

const Talk = props => {
  const { title, date, event, slides, video, link, image } = props;
  const data = useStaticQuery(graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fixed(height: 260, width: 320) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `);
  const fixedImage = data.images.edges.find(({ node }) =>
    node.relativePath.match('talks') && node.relativePath.includes(image));

  return (
    <div>
      <h3>{title}</h3>
      <div>Date: {date}</div>
      <div>Event: <ExternalLink to={link}>{event}</ExternalLink></div>
      {slides && <div><ExternalLink to={slides}>Slides</ExternalLink></div>}
      {video ?
        <div>
          <iframe width="320" height="260"
                  src={video}
                  title="video"
                  frameBorder="0"
                  allow="encrypted-media"
                  allowFullScreen/>
        </div> :
        fixedImage && <Image
          fixed={fixedImage.node.childImageSharp.fixed}
          alt={title}
        />
      }
    </div>
  );
};

export default Talk;
