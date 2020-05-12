import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Image from 'gatsby-image';
import Masonry from 'react-masonry-component';
import style from './gallery.module.scss';

const BASE_URL = 'https://www.instagram.com/p';

const Gallery = () => {
  const { allInstaNode: { edges } } = useStaticQuery(graphql`
    {
      allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 12) {
        edges {
          node {
            id
            caption
            original
            preview
            timestamp
            localFile {
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }`);

  const tagCleanup = s => s.split('.')[0];

  return (<>
    <Masonry className={style.showcase}>
      {edges.map(({ node: { id, caption, localFile: { childImageSharp } } }) => (
        <div key={id} className={style.showcase__item}>
          <figure className={style.card}>
            <Link to={`${BASE_URL}/${id}`} className={style.card__image}>
              <Image
                loading="lazy"
                alt={caption || ''}
                fluid={childImageSharp.fluid}
              />
            </Link>
            <figcaption className={style.card__caption}>
              <div className={style.card__description}>
                {tagCleanup(caption)}
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </>);
};
export default Gallery;
