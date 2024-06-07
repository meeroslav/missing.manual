import { createFilePath } from 'gatsby-source-filesystem';
import * as path from 'path';

const blogPost = path.resolve(`${__dirname}/src/templates/blog-post.tsx`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                published
              }
              body
            }
          }
        }
      }
    `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const createBlogPostPage = (post, previous = null, next = null) => {
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        id: post.id,
        previous,
        next
      }
    });
  };

  // Create blog posts pages.
  const published = result.data.allMdx.edges.filter(post => post.node.frontmatter.published);
  const drafts = result.data.allMdx.edges.filter(post => !post.node.frontmatter.published);

  published.forEach((post, index) => {
    const previous = index === published.length - 1 ? null : published[index + 1].node;
    const next = index === 0 ? null : published[index - 1].node;

    createBlogPostPage(post, previous, next);
  });
  drafts.forEach(post => createBlogPostPage(post))
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
