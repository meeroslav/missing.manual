import React, { Component } from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout.jsx';
import SEO from '../components/seo/Seo.jsx';
import Talk from '../components/talk/Talk.jsx';
import MiniPost from '../components/mini-post/MiniPost';
import IndexHero from '../components/index-hero/IndexHero';

export default class Home extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.blogPosts.edges;
    const upcomingTalks = data.upcomingTalks.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" />
        <IndexHero text={'Missing manual'}/>
        <h2>Latest posts</h2>
        {posts.map(({ node }, i) => <MiniPost {...node} key={i} />)}
        <h2>Upcoming talks</h2>
        { upcomingTalks.map(({ node }, i) => <Talk {...node} key={i}/>) }
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    blogPosts: allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              publicURL
              childImageSharp {
                sizes(maxWidth: 320) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
    upcomingTalks: allTalksJson(
      sort: { fields: [date], order: DESC },
      filter: { date: { gt: "2019-01-01" }}
    ) {
      edges {
        node {
          title
          date(formatString: "MMMM DD, YYYY")
          event
          image
          video
          link
          slides
        }
      }
    }
  }
`;
