import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';

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
                fixed(height: 100) {
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
        { fixedImage && <Image
          fixed={fixedImage.node.childImageSharp.fixed}
          alt={title}
        /> }
        <div>Title: {title}</div>
        <div>Date: {date}</div>
        <div>Event: <a href={link} target="_blank">{event}</a></div>
        { slides && <div><a href={slides} target="_blank">Slides</a></div> }
        { video && <div><iframe width="560" height="315"
                                src={video}
                                title="video"
                                frameBorder="0"
                                allow="encrypted-media"
                                allowFullScreen/></div> }
      </div>
    );
};

export default Talk;
