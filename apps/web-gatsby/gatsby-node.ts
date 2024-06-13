/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`);
import readingTime from "reading-time";
const { createFilePath } = require(`gatsby-source-filesystem`);

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            published
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMdx.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  const createBlogPostPage = (post, previous = null, next = null) => {
    createPage({
      path: post.fields.slug,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug: post.fields.slug,
        id: post.id,
        previous,
        next,
      },
    });
  };

  const publishedPosts = posts.filter(post => post.frontmatter.published);
  publishedPosts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : publishedPosts[index - 1].id;
    const nextPostId =
      index === publishedPosts.length - 1 ? null : publishedPosts[index + 1].id;

    createBlogPostPage(post, previousPostId, nextPostId);
  });

  const drafts = posts.filter(post => !post.frontmatter.published);
  drafts.forEach(post => {
    createBlogPostPage(post);
  });
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
    createNodeField({
      node,
      name: `readingTime`,
      value: readingTime(node.body)
    })
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: String
      siteUrl: String
      social: Social
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      published: Boolean
      date: Date @dateformat
    }

    type MdxFrontmatter {
      canonical: String
    }

    type Fields {
      slug: String
      readingTime: ReadingTime
    }

    type ReadingTime {
      text: String
      time: Int
      words: Int
      minutes: Int
    }

    type MdxFields {
      slug: String
      readingTime: ReadingTime
    }
  `);
};
