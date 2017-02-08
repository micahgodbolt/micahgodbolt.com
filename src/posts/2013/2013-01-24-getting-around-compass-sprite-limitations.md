---
view: post.twig
title: Getting Around Some Limitations of Compass Sprites
date: 2013-01-24
---
### The Problem
I have been diving headlong into Compass Sprites for a large response redesign. The site has a ton of sprite images, so it seemed to be a perfect opportunity to learn as much as I could about spriteing. One of the problems I ran into was that Compass used @extend to add selectors to the background-image property. This obviously causes problems in media queries.

### The Solution
The solution is obviously to put the main sprite mixins outside of any media query and then use the more specific mixins inside media queries when needed.

### Mo' Problems
The next problem was that one certain sprite wasn't supposed to show up until a desktop media query (it was to be hidden in a mobile context of this mobile first site). I couldn't call the main mixin and then hide it with background: none; I'd just have to rebuild the background again to override the background: none.


### Mo' Solutions
The solution I landed on was adjusting the background-size instead. So after calling the main mixin I just added a background-size: 0%, effectively hiding the entire sprite-sheet for those elements. Later on, inside my media query I just had to add a background-size: inherited, and the backgrounds were right where I left them.

I'm sure there are some other solutions out there, and if you know of a better one, I'd love to hear it! But this is something that worked for me, so I wanted to pass it along.
