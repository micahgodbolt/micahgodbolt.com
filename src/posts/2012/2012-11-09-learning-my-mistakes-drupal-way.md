---
view: post.twig
title: Learning From My Mistakes - The Drupal Way
date: 2012-11-09
teaser: This week I finally got through chapter 6 of Drupal 7 Module Development, and I have to say, it was quite an experience. This chapter walked me through the process of creating an entirely new entity, called Artworks. True to form, I followed along and hand typed over 700 lines of schemas, controller functions, page callbacks, menu entries and form validate hooks.
---

This week I finally got through chapter 6 of Drupal 7 Module Development, and I have to say, it was quite an experience. This chapter walked me through the process of creating an entirely new entity, called Artworks. True to form, I followed along and hand typed over 700 lines of schemas, controller functions, page callbacks, menu entries and form validate hooks.

In the process I came up with a few new snippits to speed up my typing, learned how Drupal handles the CRUD process, and realized that I type "artowrk" almost as often as I type "artwork". This last lesson, and all of the other errors I made throughout this chapter, might have provided the greatest lessons to me.

Several times throughout the process I stopped to check my work and found that my page callback was giving me a blank page, or that the database wasn't being updated when I submitted a new piece of content. Working out these bugs definitely slowed me down, but they also provided me with a chance to test how well I was grokking the module I was recreating.

As I mentioned before, I want to understand my code on the same level I understand the flow of audio signal through a mixing console. Only by understanding the entire process can you evaluate the problem, understand where to start testing, and how to resolve the issue once you've found the problem. So when I fix an entry in my hook_menu, I don't just get the page to work, I get a better understanding of auto-loaders and how that affects the flow of information through my module.

If all I wanted to do was get this module working, it would have been easy to just install the finished code provided by the publisher, but I would have missed some valuable lessons. By challenging myself to write each line by hand I not only learned how to write this code faster, I was forced to fix my own mistakes, which required a greater understanding of the material than I would ever get just reading the chapter.
