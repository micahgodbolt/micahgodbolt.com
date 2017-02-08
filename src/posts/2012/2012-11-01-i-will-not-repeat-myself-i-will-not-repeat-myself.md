---
view: post.twig
title: I will not repeat myself, I will not repeat myself
date: 2012-11-01
teaser: As I've mentioned before, I am going through the "Drupal 7 Module Development" book, trying to learn as much as I possibly can as I go from chapter to chapter. I still stand by my suggestion of <a href="/blog/teacher-said-show-my-work.html">explaining your code in plain english</a>. That one technique has really served me well as I try to trace the flow of Drupal's rendering process. Sure, it makes getting through a chapter take longer, but I always find the process worth while. Another thing I do that slows down my progress is typing out, by hand, every single line of code from the module examples.
---

As I've mentioned before, I am going through the "Drupal 7 Module Development" book, trying to learn as much as I possibly can as I go from chapter to chapter. I still stand by my suggestion of <a href="/blog/teacher-said-show-my-work.html">explaining your code in plain english</a>. That one technique has really served me well as I try to trace the flow of Drupal's rendering process. Sure, it makes getting through a chapter take longer, but I always find the process worth while. Another thing I do that slows down my progress is typing out, by hand, every single line of code from the module examples.

<h2>Can't I just copy and paste?</h2>
Sure, I've downloaded the example files from the publisher's website. I could easily read the chapter, copy/paste the files into my Drupal install, and view the results. Wouldn't this be good enough? I could still go through and 'show my work', describing what is happening at each step. What could I possibly gain from typing array after array after blessed array? Well, after typing several dozen associative arrays, it was pretty obvious to me how I could improve my module development process.

Here is a quick snippit from inside a schema array.
```php
'title' => array(
        'description' => 'The title of this artwork.',
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
        'default' => '',
        ),
      'changed' => array(
        'description' => 'The Unix timestamp when the artwork was created.',
        'type' => 'int',
        'not null' => TRUE,
        'dafault' => 0,
        ),
```

I don't know about you, but after moving my eyes from the book to the keyboard to type my 11th '=>' I was determined to improve my typing speed. It didn't require much. I noticed there is a very obvious pattern here with the array key and value, and decided I'd had enough.

<h2>There's a snippit for that</h2>
So the tl:dr of it all is that by forcing myself to write out every single line of this example code, I found the repetitive pieces of code that I could turn into a snippit in Sublime Text.

```html
<snippet>
  <content>
'${1:attribute}' =>
</content>
   <tabTrigger>key</tabTrigger>
<scope>source.php</scope>
</snippet>
```


And now that I have this snippit in place I'll keep typing every line, improving the speed and accuracy in which I can type out all of these associative arrays. I'll keep looking for other common patterns that trip me up and keep working those into my coding regimen.
