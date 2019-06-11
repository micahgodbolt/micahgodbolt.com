import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogEntry = path.resolve("src/templates/blog-entry.tsx");
  return graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
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

    const posts = result.data.allMdx.edges;

    posts.forEach((post, index) => {
      createPage({
        path: post.node.frontmatter.path,
        component: blogEntry,
        context: {
          slug: post.node.frontmatter.path
        }
      });
    });

    return null;
  });
};
