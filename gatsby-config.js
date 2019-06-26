module.exports = {
  siteMetadata: {
    title: "Micah Godbolt Blog",
    description: "This is my blog",
    author: "Micah Godbolt"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-mdx`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: "blog"
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `scrb5nqyy4vx`,
        accessToken: `ce5d874f2ee4f8180b5e925845cad644a8f102096fbc11487763292554df3297`
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: "keyBNWqUbDnIuWA2g",
        tables: [
          {
            baseId: "appInxhv8w9saEAIZ",
            tableName: "Speaking"
          }
        ]
      }
    }
  ]
};
