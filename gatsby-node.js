var path = require("path");

// var createFilePath = require("gatsby-source-filesystem");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve("src/templates/blog-template.tsx");
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
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

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {

      createPage({
        path: post.node.frontmatter.path,
        component: blogTemplate,
        context: {
          path: post.node.frontmatter.path
        }
      });
    });

    return null;
  });
};

