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
      console.log(post.node.frontmatter.path);
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.frontmatter.path,
        component: blogEntry,
        context: {
          slug: post.node.frontmatter.path,
          previous,
          next
        }
      });
    });

    return null;
  });
};
