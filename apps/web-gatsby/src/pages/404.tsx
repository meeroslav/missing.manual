import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/Layout';
import H from '../components/heading/Heading';

const NotFoundPage = ({ data }) => {
  return (
    <Layout location={data.location}
      hero={data.cover.childImageSharp.gatsbyImageData}
      title="404: Not Found">
      <H>These are not the droids you are looking for</H>
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </Layout>
  );
};
export default NotFoundPage;

export const pageQuery = graphql`{
  cover: file(absolutePath: {regex: "/pages/404.jpg/"}) {
    childImageSharp {
      gatsbyImageData(transformOptions: {cropFocus: CENTER}, layout: FULL_WIDTH)
    }
  }
}
`;
