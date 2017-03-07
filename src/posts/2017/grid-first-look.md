---
title: CSS Grid - First Look
view: post.twig
date: 2017-03-06
---

You might say that I've been living under a rock for a bit. With all my focus on design systems, and more recently React and Typescript, I've been completely ignoring the elephant in the room...the inevitable arrival of CSS grid and how they will change the way that we write out layouts! In this post I'm going to be sharing my thoughts as I take a first look at this incredible new layout tool, and hopefully it'll intice you to take the plunge yourself.

So what's the first thing we do when needing to learn about a new web technology? We Google it of course.

So in the spirit of [let me google that for you](http://lmgtfy.com/?q=css+grid), here are the first 3 links you'll find when you look up CSS Grid.

## First 3 Links

1. [CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
2. [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
3. [W3C](https://www.w3.org/TR/css3-grid-layout/)

Not a bad starting point! A definitive tutorial from our friends at [CSS Tricks](https://css-tricks.com), which will inevitably replace their [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) as my most frequented CSS resource. A developer friendly specification from the always reliable [Mozilla Developer Network](https://developer.mozilla.org), and the spec itself from none other than the [W3C](https://www.w3.org). 

These display quality search results is what makes being a developer so much easier these days.

I'm also glad to not see any W3schools in the top 3, though they do have listing at #5 that links to some article about CSS float based grids. ¯\\_(ツ)_/¯

## A First Look at the Grid Spec

First thing I needed to do was make sure that I have a browser that supports CSS Grid layout. Unfotunately, as of today, that takes a little bit of work. As you can see from [Can I Use](http://caniuse.com/#feat=css-grid), CSS Grid is right around the corner on just about every desktop browser, so the easiest way to get started with grid is to grab a copy of [Chrome Canary](https://www.google.com/chrome/browser/canary.html). There is supposed to be a flag on Chrome 56 to turn on [Experimental Web Platform features](chrome://flags/#enable-experimental-web-platform-features), but it didn't work for me, so grab Canary if you have the same trouble. 

Once I had a supported browser, I could now view all the grid examples I ran across at [Rachel Andrew's](https://twitter.com/rachelandrew) great grid site called [Grid By Example](http://gridbyexample.com/examples/).  

## Our First Grid Example

I wanted to wrap this post up by looking at [Rachel's first examples](http://codepen.io/rachelandrew/pen/BNXyQa), and taking note of everything I learned.

<img src="/assets/img/grid-example-1.png"/>

- `display: grid` is nice and consistent with `display: flex` and will make switching from one display mode to another quite easy.
- `grid-template-columns: 100px 100px 100px;` is one of the longest hyphenations I've seen in CSS, and I'm sure this attribute will take a LONG time to unpack. At least it's very clear as to what it's doing, and adding a 4th value or changing each value to a percentage does exactly what you'd expect.
- `grid-gap: 10px` is the value we've been waiting for! It's a single value that determines the space __between__ all of the grid elements. No more faking this with margins and worrying about nth-child/last-child to remove that trailing margin. 

## Math Note
If you are looking to turn change this example from one with 100px, fixed column widths, to one where we have 3 equal columns, forget about using fractions. `grid-template-columns: 33.33% 33.33% 33.33%;` plus a grid-gap will yield a row longer than the parent grid. 

Fortunately there is a new unit of measurement called the [flexible length](https://www.w3.org/TR/css3-grid-layout/#fr-unit) which is a fraction of the free space available. Sort of like flex grow, if you have `grid-tempmlate-columns: 1fr 1fr 1fr` this means each column will grow equally to fill up the available space, and you'll have a perfect gallery regardless of the gutter you decide to apply.

<img src="/assets/img/grid-example-2.png"/>

## Wrap it Up

So that's it for tonight. I literally sat down, took my first look at CSS Grid, and shared with you what I'd found. Hope you enjoyed it! I'll try to share a bit more once I dive in further. From the looks of it, I could spent quite a long time on grid-templates alone. See you next time!

