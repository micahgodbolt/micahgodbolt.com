var Metalsmith  = require('metalsmith');
var assets      = require('metalsmith-assets');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var excerpts    = require('metalsmith-excerpts');
var collections = require('metalsmith-collections');
var feed        = require('metalsmith-feed');
var twig        = require('metalsmith-twig');

Metalsmith(__dirname)
  .metadata({
    site: {
      url: 'https://micahgodbolt.com'
    },
    sitename: "MicahGodbolt.com",
    description: "The site and blog of Micah Godbolt"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(assets({
      source: './src/assets', // relative to the working directory
      destination: './assets' // relative to the build directory
  }))
  .use(collections({
    posts: {
      pattern: 'posts/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(permalinks({
    pattern: 'blog/:title'
  }))
  .use(feed({
    collection: 'posts'
  }))
  .use(twig({
    directory: 'presenters',
    cache: false
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
