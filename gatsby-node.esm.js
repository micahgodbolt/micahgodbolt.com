import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogEntry = path.resolve("src/templates/blog-entry.tsx");
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {

      createPage({
        path: post.node.fields.slug,
        component: blogEntry,
        context: {
          slug: post.node.fields.slug
        }
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `/blog${value}`
    });
  }
};
