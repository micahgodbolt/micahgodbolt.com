import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogEntry = path.resolve("src/templates/blog-entry.tsx");
  const contentfulEntry = path.resolve("src/templates/contentful-entry.tsx");
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
      allContentfulPost {
        edges {
          node {
            text {
              text
            }
            title
            createdAt
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMdx.edges;
    const contentfuls = result.data.allContentfulPost.edges;

    posts.forEach((post, index) => {
      if (post.node.frontmatter && post.node.frontmatter.path) {
        createPage({
          path: post.node.frontmatter.path,
          component: blogEntry,
          context: {
            slug: post.node.frontmatter.path
          }
        });
      }
    });
    contentfuls.forEach((contentful, index) => {
      createPage({
        path: contentful.node.title.replace(/\s+/g, "-").toLowerCase(),
        component: contentfulEntry,
        context: {
          id: contentful.node.id
        }
      });
    });

    return null;
  });
};
