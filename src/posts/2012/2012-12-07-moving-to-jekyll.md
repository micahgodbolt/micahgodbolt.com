---
view: post.twig
title: Moving to Jekyll
date: 2012-12-07
teaser: As much as I am enjoying Drupal right now, the one place I am not enjoying it is on my own blog. Now I have no problem with Drupal and it's ability to be a blogging platform. My issue was with performance on my cheap shared hosting. I realized that I had three options - Suffer through a slow admin interface, open up my wallet and upgrade, or move to Jekyll. By the name of this blog post, it's pretty obvious what my choice was.
---

As much as I am enjoying Drupal right now, the one place I was not enjoying it is on my own blog. Now I have no problem with Drupal and it's ability to be a blogging platform. My issue was with performance on my cheap shared hosting. I realized that I had three options: Suffer through a slow admin interface, open up my wallet and upgrade, or move to Jekyll. By the name of this blog post, it's pretty obvious what my choice was.

For those unfamiliar with [Jekyll](http://www.jekyllrb.com), it is a 'blog aware' static site generator built on Ruby, powered by the [Liquid](http://liquidmarkup.org) markup language. This means I can write this blog article as a Markdown file and everytime I save the file Jekyll will use my layout file to create a new html page in the blog directory. It will also regenerate the homepage adding this entry to the top of the list.

Now that I have a new blog entry, and updated homepage in my local site directory, all I need to do is push those up to github and a post commit hook FTPs them over to my shared hosting account.

##What I learned

- auto: true and server: true in the \_config.yml file means that I can start up jekyll with a single 'jekyll' command and it will host the \_site directory at 'localhost' and constantly look for changes
- Sass works great with Jekyll. Just rename the folder \_sass so that it doesn't get compiled by jekyll.
- Live reload is still your friend here, though it takes a few seconds for Jekyll to finish processing before the changes kick in
- Jekyll error reporting is far from perfect. I'm used to Sass errors telling me the exact file and line number of the error. I simply forgot to use a % on a closing tag, and though Jekyll told me the file name, the error message was no help and it took some time for me to see the problem.
- Templates can call other templates. So figure out your base HTML (stuff that NEVER changes), and then figure out what rarely changes (blog, homepage, inside page, store page) and create sub templates for those. Then call those subtemplates in your actual content.
- It's really nice to be able to work/write locally and not worry about out of sync databases.


##What's Next
I'm still learning a ton about the whole Liquid templating engine, what it can and can't do. I'd like to be a bit more programatic in my templates (passing variables and settings around with each post). Fortunately many people are posting their entire Jekyll site on github, so it's easy to dive into their templates and see how they are working.

Right now my "recent work" is just some static text in my default layout file. I'd like to create a more automated way to input that information, similar to the blog articles.

If you have questions about Jekyll, or tips, feel free to comment. It's always fun learning something new.

