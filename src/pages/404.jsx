import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/Layout.jsx';

const NotFoundPage = ({ data }) => {
  return (
    <Layout location={data.location}
      hero={data.cover.childImageSharp.fluid}
      title="404: Not Found">
      <h1>These are not the droids you are looking for</h1>
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </Layout>
  );
};
export default NotFoundPage;

export const pageQuery = graphql`
  query {
    cover: file(absolutePath: { regex: "/pages\/404.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 2000, maxHeight: 600, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
