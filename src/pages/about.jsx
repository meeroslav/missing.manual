import React, { Component } from 'react';
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout.jsx';
import SEO from '../components/seo';
import ExternalLink from '../components/external-link/ExternalLink';

export default class AboutPage extends Component {
    render() {
      const { data } = this.props;
      const siteTitle = data.site.siteMetadata.title;

      return (
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="About" />
          <h1>About</h1>
          <p>
            I'm Miroslav Jonas, a software developer based in Vienna, Austria. I was born and raised in Serbia
            where I lived in two beautiful towns - Kovačica and Novi Sad.
            Currently I work at 5G Systems, creating a betting solutions of the future.
          </p>
          <p>
            I occasionally write. You can find some of my thoughts on technology in the <Link to={'blog'}>blog</Link> section.
            I also organize meetups for <ExternalLink to="https://www.meetup.com/Angular-Vienna/">Angular Vienna</ExternalLink> and try to
            help and grow the Angular community in Austria via <ExternalLink to="https://angular-austria.at">Angular Austria Association</ExternalLink>.
            When I learn something cool, I like to share it live on stage. You can see the list of my past and upcoming talks in the <Link to={'talks'}>talks</Link> section.
          </p>
          <p>
            My parent bought me my first computer when I was still kid. Lack of access to quality games forced me to
            be creative with my computer - whether it's development, computer graphics or composing music.
            Some of that creative experiments will see the light of the internet on this website soon.
          </p>
          <p>
            I like to travel and discover new countries, cultures and cuisines. While there I take candid street photos of
            the everyday life.
          </p>
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
  }
`;
