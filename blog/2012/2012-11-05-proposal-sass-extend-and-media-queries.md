---
view: post.twig
title: A Proposal for Sass, @extend, and Media Queries
date: 2012-11-05
teaser: Life has a way of being cruel and ironic. I was thinking yesterday how lucky I was to have a job where I could go home, and leave work at work. Fast forward a few hours and I was having trouble sleeping as I tried to tackle a sticky Sass and Media Query delima.
---

Life has a way of being cruel and ironic. I was thinking yesterday how lucky I was to have a job where I could go home, and leave work at work. Fast forward a few hours and I was having trouble sleeping as I tried to tackle a sticky Sass and Media Query delima.

It all started as I was mulling over a tweet from @patrickfulton about how problems <a href="https://twitter.com/patrickfulton/status/257988454376431617" target="_blank">@extend'ing across media queries</a> was keeping his team from switching from @include to @extend for most of their projects.

It took a little bit to settle in. Sass 3.2 has only been out a short time, and it was this release that made @extend a viable tool for creating the objects we use in our OOCSS. As I'm just now wrapping up the mobile design of my mobile first layout, it struck me that I had no idea how to deal with this same problem! Hence no sleep!

extend is an amazing tool because it allows you to 'extend' the list of selectors for a selector, property set, but it has a limitation. Let me illustrate the issue.

```scss
.mybox {
  width: 10em;
  height: 10em;
  background: blue;
}
```

So here is a class of "mybox". If I want to apply these styles to a div on my page I don't have duplicate these properties (which is what @include would do). If I use @extend I get the following:

```scss

/*******   Sass   *********/

.mybox {
  width: 10em;
  height: 10em;
  background: blue;
}

.callout_box {
  @extend .mybox;
}

/*******   Resulting CSS   *********/

.mybox, .callout_box {
  width: 10em;
  height: 10em;
  background: blue;
}
```

As you can see, this works great. No duplication of CSS properties, and you can continue to extend this box as often as you need to.

##The Problem
But what about media queries? What happens when you need to extend a class, but only at a particular media query (Note that I am using my respond-to mixin that I <a href="/blog/sass-abstraction-and-media-queries">wrote about yesterday</a>)?

```scss


/*******   Sass   *********/

.mybox {
  width: 10em;
  height: 10em;
  background: blue;
}

.mybigbox {
  width: 20em;
  height: 20em;
}

.callout_box {
  @extend .mybox;
  @include respond-to('medium'){
    @extend .mybigbox;
  }
}

/*******   This won't work!!   *********/

.mybox, .callout_box {
  width: 10em;
  height: 10em;
  background: blue;
}

.mybigbox, @media screen and (min-width: 600px).callout_box {
  width: 20em;
  height: 20em;
}
```

Sass can't wrap the entire .mybigbox with a media query, because it might be extended elsewhere, and there is no way to associate a media query with just a single selector like this. So what can you do about this? Well I have 3 possible solutions.

##Working around the problem

If you have @extends that follow really consistent patterns you could always include your media queries inside of the extend. This way, your Sass would look like this:

```scss

.mybox {
  width: 10em;
  height: 10em;
  background: blue;
  @include respond-to('medium'){
    width: 20em;
    height: 20em;
  }
}
```

This will work and produce the css you want, but you lose the ability to @extend the smaller box without the media query. So sure, this might solve the problem in some cases, but as your CSS gets more abstract you'll find yourself not able to @extend code because you don't want the media queries tied to it.

##A Javascript Hack

As with any problem, one of the solutions is always "we can just fix it with javascript!". I don't think I'd use this solution, but it's at least interesting to think about.

A media query is a context. It says that given a certain situation (screen width), use this CSS, and ignore the other. This is the same idea as saying if a list is in a nav element, don't use any list style or margins. So why use the media query syntax at all?

With a few lines of javascript I could check the width of the screen and apply a specified class to the HTML element (similar to how modernizr.js works). Then I could use that context to apply the styles that I need.

```scss

/*******   Sass   *********/

.mybox {
  width: 10em;
  height: 10em;
  background: blue;
}

.large_mediaquery %mybigbox {
// A silent @extend is required here to make this work, so we use the %
  width: 20em;
  height: 20em;
}

.callout_box {
  @extend .mybox;
  @extend %mybigbox;
}

/*******   Resulting CSS  *********/

.mybox, .callout_box {
  width: 10em;
  height: 10em;
  background: blue;
}

.large_mediaquery .callout_box {
  width: 20em;
  height: 20em;
}
```

So if the window is 600px wide or more, javascript will tack on a .large_mediaquery class to my HTML tag, and my callout box will be 20em instead of 10em.

There are many obvious problems with this solution from a semantic, future-proofing, standard complying standpoint. But the point is...it'd work!

##The Sass Way

TL;DR: After tossing and turning on this issue for a bit I realized that there wasn't a perfect solution using the tools we have today. But I finally got some sleep once I figured out how I would propose to solve this problem, "The Sass Way &trade;".

Right now if you write a silent class (using the % like I did above), the class doesn't get written to your style sheet until you @extend it, determining it's place in the cascade as well. So what if Sass treats an @extend inside a media query as just another instance of that class. See the following:

```scss

/*******   Sass   *********/

%mybigbox {
  width: 20em;
  height: 20em;
}
.some_other_box {
  @extend %mybigbox;
}

.callout_box {
  @include respond-to('large'){
    @extend %mybigbox;
  }
}

.callout_box_2 {
  @include respond-to('large'){
    @extend %mybigbox;
  }
}

/*******   Resulting CSS  *********/

.some_other_box {
  height: 20em;
  width: 20em;
}

@media screen and (min-width: 600px) {
  .callout_box, .callout_box_2 {
  height: 20em;
  width: 20em;
  }
}
```

Sure, this will a create seperate instances for each media query the @extend is used in, but this is how media queries are handled in the browser. And assuming you are using a small set of standard media queries values, they should group together nicely and cause limited code bloat.

I know I wrote a lot here, and I am sure I made a few mistakes along the way. Feel free to point out anything I missed, and I will try to update it.
