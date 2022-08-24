import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Miroslav Jonas`,
    author: `Miroslav Jonas`,
    description: `A personal website of Miroslav Jonas`,
    siteUrl: `https://missing-manual.com/`,
    social: {
      twitter: `meeroslav`,
      linkedIn: `meeroslav`,
      github: `meeroslav`,
      behance: `meeroslav`,
      instagram: `missing.manual`,
      medium: `meeroslav`
    },
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-145350512-1'
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap', {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          "gatsby-remark-images",
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              colorTheme: 'Dark+ (default dark)'
            }
          },

        ],
        // plugins: [require(`gatsby-remark-vscode`)]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-reading-time",
          "gatsby-remark-external-links",
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Dark+ (default dark)'
            }
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './src/blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: './src/assets',
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: 'gatsby-plugin-social-cards',
      options: {
        // ommit to skip
        // authorImage: "./static/img/coffee-art.jpg",
        // image to use when no cover in frontmatter
        backgroundImage: "./static/img/blog.jpg",
        // author to use when no auth in frontmatter
        defaultAuthor: 'Miroslav Jonas',
        // card design
        design: 'default', // 'default' or 'card'
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The missing manual`,
        short_name: `miro`,
        start_url: `/`,
        background_color: `#FEFFFF`,
        theme_color: `#246e6a`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
  ]
};

export default config;
