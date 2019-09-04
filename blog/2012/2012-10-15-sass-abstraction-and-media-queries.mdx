---
view: post.twig
title: Sass Abstraction and Media Queries
date: 2012-10-15
teaser: Brad Frost pointed out a blog entry today by Bearded called The Thing About Those Media Types. The TL:DR of it is that some people use "screen" in their media queries, while others do not. Right now this is not a huge deal because almost all devices that are capable of displaying websites identify themselves as "screen" media type, even if they are a TV or a projector.
---

[@Brad_Frost](https://twitter.com/brad_frost) pointed out a blog entry today by Bearded called [The Thing About Those Media Types](http://blog.bearded.com/post/33656467094/the-thing-about-those-media-types). The TL:DR of it is that some people use "screen" in their media queries, while others do not. Right now this is not a huge deal because almost all devices that are capable of displaying websites identify themselves as "screen" media type, even if they are a TV or a projector.

While I think this artcile brings up a good point, that we need to be 'future-friendly' and consider how these choices might affect devices yet to come, I think my main takeaway was quite different.

The big fear here is that after we build our masterpiece, with its massive database, and tens of thousands of lines of CSS, we come to find out that ommiting/including the "screen" media type is breaking our site on device X, Y and Z. Sure we might be able to solve this with a massive "find and replace", but this solution is pretty hackish and error prone.

The solution to this problem is to use a layer of abstraction in your media queries, and my favorite tool for that is Sass.

This is the mixin that I am currently using for the iQ website to handle my media queries:

```scss
@mixin respond-to($media) {
  @if $media == small {
    @media screen and (max-width: $break-small) { @content; }
  }
   @else if $media == medium {
    @media screen and (min-width: $break-small + 1) { @content; }
  }
  @else if $media == large {
    @media screen and (min-width: $break-medium + 1) { @content; }
  }
}
```

So then I create my media queries like this:

```css
.sidebar {
  @include respond-to('small') {
    width: 100%;
  }
  @include respond-to('large') {
    width: 40%;
    float: left;
  }
}
```


As you can see, right now I am including "screen" in my media query declaration. But if a year omitting "screen" is the awesome sauce, and it's fixing everythign from the iTV to world hunger... Well easy to fix:

```scss
@mixin respond-to($media) {
  @if $media == small {
    @media (max-width: $break-small) { @content; }
  }
   @else if $media == medium {
    @media (min-width: $break-small + 1) { @content; }
  }
  @else if $media == large {
    @media (min-width: $break-medium + 1) { @content; }
  }
}
```

And after 2 seconds of Sass compilation, all of my media queries are updated.

We might not know what the future is going to require of our stylesheets, but through the abstraction of these functions we can future proof our CSS so that it'll be easy to update when those changes come.
