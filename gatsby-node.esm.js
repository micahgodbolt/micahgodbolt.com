const path = require('path');

const kebabCase = string =>
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('src/templates/blog-template.tsx');
  return graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            fields {
              slug
            }
            parent {
              ... on File {
                id
                name
                sourceInstanceName
              }
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

    const posts = result.data.allMdx.edges.filter(e => {
      return e.node.parent.sourceInstanceName === 'blog';
    });

    posts.forEach(post => {
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
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);

    if (parent.sourceInstanceName === 'blog') {
      const value = kebabCase(node.frontmatter.title);
      createNodeField({
        name: `slug`,
        node,
        value: `/blog/${value}`
      });
      createNodeField({
        name: `name`,
        node,
        value: parent.sourceInstanceName
      });
    }
  }
};
