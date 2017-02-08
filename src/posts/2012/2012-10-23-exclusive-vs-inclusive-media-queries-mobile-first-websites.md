---
view: post.twig
title: Exclusive vs Inclusive Media Queries for Mobile First Websites
date: 2012-10-23
teaser: Some of the first big decisions I had to make for my mobile first design was how I would handle media queries. One of these decisions revolved around whether I would use an exclusive, or inclusive media query.
---

Some of the first big decisions I had to make for my mobile first design was how I would handle media queries. One of these decisions revolved around whether I would use an exclusive, or inclusive media query.

Inclusive media queries would look like this:

```scss
    @media only screen and (min-width: 500) {
      body {
        font-size: 1.2em;
       }
    }
    @media only screen and (min-width: 800) {
      body {
        color: blue;
       }
    }
```

At 800+ pixels my design would include styles from both sets of css attributes, 1.2ems and blue.

Exclusive styles would look like this:

```scss
    @media only screen and (min-width: 500) and (max-width: 799)  {
      body {
        font-size: 1.2em;
       }
    }
    @media only screen and (min-width: 800) {
      body {
        color: blue;
       }
    }
```

In this example the font will be 1.2em from 500 to 799 pixels, but from 800 on it will only be blue.

<h2>How I Started</h2>

My approach to mobile first has always been one of progressive enhancement, the baseline experience (no media queries) will allow our members to do everything that you could do at 1000+ pixels. Because of this I always thought my media queries would be "inclusive", as my experience builds with layer upon layer of function and style.

Unfortunately as I started to build more complex, desktop UI's I realized how often I was overwriting styles written at smaller breakpoints. The menu system that works great for a mobile touch experience would all need to be zero'd out and built back up again.

<h2>How I ended</h2>

So my solution was quite simple. Mix it up a bit!

Because I was using a respond-to Sass mixin to handle all of my media queries it was easy enough to add an exclusiving "upto" media query mixin to wrap my 'mobile only' styles. Now my mobile menu styles can be tucked away under a given breakpoint and I won't need to worry about resetting them before starting on a desktop version.

```scss
@mixin respond-to($media) {
...
   @else if $media == medium {
    @media only screen and (min-width: $break-small + 1) { @content; }
  }
   @else if $media == upto-medium {
    @media only screen and (max-width: $break-medium) { @content; }
  }
...
}
```
