module.exports = {
  siteMetadata: {
    siteName: 'Micah Godbolt Blog',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `scrb5nqyy4vx`,
        // Learn about environment variables: https://gatsby.app/env-vars
        accessToken: 'ce5d874f2ee4f8180b5e925845cad644a8f102096fbc11487763292554df3297',
      },
    },
  ],
}
