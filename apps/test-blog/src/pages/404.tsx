import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import H from '../components/heading/Heading';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout
      location={location}
      title={siteTitle}
      hero={data.cover.childImageSharp.gatsbyImageData}
    >
      <H>These are not the droids you are looking for</H>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export const Head = ({
  data: {
    cover: {
      childImageSharp: { gatsbyImageData: hero },
    },
  },
}) => <Seo title="404: Not Found" image={hero} />;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    cover: file(absolutePath: { regex: "/pages/404.jpg/" }) {
      childImageSharp {
        gatsbyImageData(
          transformOptions: { cropFocus: CENTER }
          layout: FULL_WIDTH
        )
      }
    }
  }
`;
