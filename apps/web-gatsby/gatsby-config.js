module.exports = {
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
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-145350512-1'
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              colorTheme: 'Dark+ (default dark)'
            }
          },

        ]
      }
    },
    'gatsby-remark-reading-time',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-reading-time',
          'gatsby-remark-external-links',
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Dark+ (default dark)'
            }
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-twitter`,
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-social-cards',
      options: {
        // ommit to skip
        // authorImage: "./static/img/coffee-art.jpg",
        // image to use when no cover in frontmatter
        backgroundImage: "./default.jpg",
        // author to use when no auth in frontmatter
        defaultAuthor: 'Miroslav Jonas',
        // card design
        design: 'default', // 'default' or 'card'
      },
    },
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
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
        icon: `./src/images/icon.png`,
      },
    },
  ],
};
