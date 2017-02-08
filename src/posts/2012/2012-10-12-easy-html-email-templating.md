---
view: post.twig
title: Easy HTML Email Templating
date: 2012-10-12
teaser: I came across a tool today that I can honestly say I've been trying to find for years, <a href="http://beaker.mailchimp.com/inline-css" target="_blank">CSS Inliner</a>. If you do any HTML email designing you know it's best to put your styles inline (to get the best email client support), but inline styles are HORRIBLE to maintain and difficult to implement when you have multiple authors contributing. CSS Inliner is a tool that will take everything from the style tag and spit out HTML code with all of those styles inlined! I've seriously dreamed of finding something like this, and here it is.
---
I came across a tool today that I can honestly say I've been trying to find for years, <a href="http://beaker.mailchimp.com/inline-css" target="_blank">CSS Inliner</a>. If you do any HTML email designing you know it's best to put your styles inline (to get the best email client support), but inline styles are HORRIBLE to maintain and difficult to implement when you have multiple authors contributing. CSS Inliner is a tool that will take everything from the style tag and spit out HTML code with all of those styles inlined! I've seriously dreamed of finding something like this, and here it is.

I know at <a href="http://www.fish-marketing.com" target="_blank">Fish Marketing</a> we used a CMS to template out our emails, and then each newsletter was created as a "page" in that CMS. We then imported the outputed HTML right into our email program. This had many benefits, but the biggest drawback was that if something couldn't be put into a field and then wrapped with inline styles in the template it was nearly impossible to apply any complex styles. We specifically had a sidebar that always changed in length and content, but needed some really specific styling. We had to resort to copy and pasting in some complex html and trying to edit it with the WYSIWYG without breaking it.

With <a href="http://beaker.mailchimp.com/inline-css" target="_blank">CSS Inliner</a> you can require that users just apply your standard header, paragraph, and list tags and then make a robust stylesheet that styles those elements exactly like you want them. This also lets you keep your archived newsletters following a single master stylesheet. No more going back through dozens of old newsletters updating inline styles because your brand color changed.

Ok, I'm done. Who needs me to write them up a newsletter? I almost don't hate HTML emails  now...almost.
