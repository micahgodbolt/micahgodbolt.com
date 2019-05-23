module.exports = {
  siteMetadata: {
    title: "Micah Godbolt Blog",
    description: "This is my blog",
    author: "Micah Godbolt"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugin: [
          `gatsby-transformer-remark`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: "blog"
      }
    }
  ]
};
