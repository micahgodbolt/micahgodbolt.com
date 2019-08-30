var path = require("path");

var {createFilePath} = require("gatsby-source-filesystem");

const kebabCase = string => string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('-');

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
            fields {
              slug
            }
            frontmatter {
              title
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
        component: blogTemplate,
        context: {
          title: post.node.frontmatter.title
        }
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = kebabCase(node.frontmatter.title);
    createNodeField({
      name: `slug`,
      node,
      value: `/blog/${value}`
    });
  }
};

