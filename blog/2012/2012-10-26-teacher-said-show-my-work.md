---
view: post.twig
title: Teacher said to show my work so I am
date: 2012-10-26
teaser: I have quite a bit on my plate with this current project. As the only developer I am tasked with the design, front end, and back end development of the entire site. With the design and front end coming together quite well in the past weeks I have been starting to focus on the back end. Having decided to build this site on Drupal, I knew there was going to be a steep learning curve to get to the point I wanted to be at.
---

I have quite a bit on my plate with this current project. As the only developer I am tasked with the design, front end, and back end development of the entire site. With the design and front end coming together quite well in the past weeks I have been starting to focus on the back end. Having decided to build this site on Drupal, I knew there was going to be a steep learning curve to get to the point I wanted to be at.

I've never been one to just drop in a CMS, some modules and move on. I always want to understand as much of the process as possible. This probably comes from my background in audio production where one of the first things you learn to do is to follow the flow of the audio signal. If you know the exact path audio takes, it will be much easier to troubleshoot when a problem occurs. This same principal occurs in web development, where the more you know about the entire process of service a webpage to a client's computer, the easier it is to make adustments and fix problems.

<h2>Diving Into Module Development</h2>
Recently I picked up <a href="http://www.amazon.com/Drupal-Module-Development-Matt-Butcher/dp/1849511160" target="_blank">Drupal 7 Module Development</a>, a book written by several of the core contributors of the Drupal project. I thought that if anyone knew how to write this stuff, they must! Recently I've done most of my learning through video training, and my past experience diving into development books has been less than stellar, so I wanted to take a fresh approach. And I wanted to share that approach with you.

D7 Module Development starts off creating a pretty simple module that replicates a 'recent blog article' block. It has a database call, does some themeing, and then spits it out into a block. It would be really easy to just read over this chapter, going "yeah, ok ok, uh huh, got it, got it", but in reality get only the basic concepts and miss almost all of the specifics. I reminded myself that I needed to learn to write this code line by line, so if there was a single line that I didn't understand completely, I wouldn't be able to reproduce it.

<h2>Back To School I Go</h2>
So I starting writing every single line of the module by hand as the author went through each section.

```php
/**
 * Implements hook_theme()
 */
function single_blog_theme($existing, $type, $theme, $path) {
  return array (
    'single_blog_block_item' => array (
      'variables' => array (
        'node' => NULL,
      ),
      'template' => 'single-blog-block-item',
    ),
  );
}
```

After the author finished with each draft of the module I would go back through it and write down the process, in english, step by step, as if I were describing it to another person.

```php
single_blog_theme
  defines a hook_theme called single_blog_block_item
    variables passed to this theme hook is the '#node' => $node up in the block view
    template defines an external template file, drupal tacks on the tpl.php
```


This was harder to do than I thought! There were parts where I wasn't sure why a certain function was necessary, or why the array key was named what it was. Once I was done though, I felt confident that I could exlain every line of the code to a total stranger. Therefore, I not only understod the module better, I had a better understanding of how Drupal used all of these various functions to do what it was doing under the hood. It was akin to setting up and tearing down the stage week after week, where you get really intimate with the signal flow from the stage microphones to the console and then back to the monitors.

Sure this approach takes longer. I've only gotten through a single chapter like this. But now that chapter 5 staring back at me I feel confident that I understood 100% of previous chapter. My goal is to feel that way all the way through to the end of the book.
