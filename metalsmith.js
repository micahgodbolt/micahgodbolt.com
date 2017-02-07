var Metalsmith  = require('metalsmith');
var assets      = require('metalsmith-assets');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var excerpts    = require('metalsmith-excerpts');
var collections = require('metalsmith-collections');
var twig        = require('metalsmith-twig');

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(assets({
      source: './src/assets', // relative to the working directory
      destination: './assets' // relative to the build directory
  }))
  .use(collections({
    posts: {
      pattern: 'posts/**/*.md'
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(permalinks({
    pattern: '/blog/:title'
  }))
  .use(twig({
    directory: 'presenters',
    cache: false
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
