import React, { Component } from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import Talk from '../components/talk/Talk.jsx';

export default class Home extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.blogPosts.edges;
    const upcomingTalks = data.upcomingTalks.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" />
        { posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: '14px',
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        }) }
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
