import React, { Component } from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/seo/Seo';
import { graphql } from 'gatsby';
import ExternalLink from '../components/external-link/ExternalLink';

export default class ImprintPage extends Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Imprint"/>
        <h1>Privacy Policy</h1>
        <p>The protection of your personal data is very important to me. Therefore I process your data exclusively on
          the basis of the legal regulations (DSGVO, TKG 2003). In this privacy policy I inform you about the most
          important aspects of data processing within this website.</p>

        <h2> Contact me </h2>
        <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to
          contact me through email at <ExternalLink to={'mailto:missing.manual@gmail.com'}>missing.manual@gmail.com</ExternalLink>. Your mail can be stored up to six months to process and
          in case of follow-up questions. I will not share your information without your consent.</p>

        <h2> Cookies </h2>
        <p>This website uses so-called cookies. These are small text files that are stored on your device using the
          browser. They do no harm.</p>
        <p>Cookies remain stored on your device until you delete them. They allow me to recognize your browser on your
          next visit.</p>
        <p>If you do not want this, you can set up your browser so that it informs you about the setting of cookies and
          you allow this only in individual cases.</p>
        <p>The deactivation of cookies may limit the functionality of our website.</p>

        <h2> Web analytics </h2>
        <p>This website uses functions of the web analytics service Google Analytics. Provider is Google Inc., located
          at 1600 Amphitheater Parkway Mountain View, CA 94043, USA. For this purpose, cookies are used that allow an
          analysis of the use of the website by its users. The information generated thereby is transmitted to the
          Google server in the USA and stored there. You can prevent this by setting up your browser so that no cookies
          are stored.</p>
        <p>I have concluded a corresponding contract data processing contract with the provider.</p>
        <p>My concern within the meaning of the DSGVO (legitimate interest) is the improvement of the offer and the
          website. Since the privacy of our users is important to me, the user data is pseudonymized.</p>
        <p>Your IP address is recorded, but immediately pseudonymised (eg by deleting the last 8 bits). As a result,
          only a rough localization is possible.</p>
        <p>Data processing takes place on the basis of the statutory provisions of § 96 (3) TKG and Art. 6 para. 1 lit.
          a (consent) and / or f (legitimate interest) of the GDPR.</p>
        <p>In addition, Google is certified under the Privacy Shield Agreement, providing a guarantee to comply with <ExternalLink
            to={'https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active'}>European privacy legislation</ExternalLink>.</p>
        <p>The user data is kept for a period of 14 months.</p>

        <h2>Log Files</h2>
        <p>Missing Manual follows a standard procedure of using log files. These files log visitors when they visit
          websites. All hosting companies do this and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and
          time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information
          that is personally identifiable. The purpose of the information is for analyzing trends, administering the
          site, tracking users' movement on the website, and gathering demographic information.</p>

        <h2>Consent</h2>
        <p>By using this website, you hereby consent to this Privacy Policy and agree to its terms.</p>
      </Layout>
    );
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
