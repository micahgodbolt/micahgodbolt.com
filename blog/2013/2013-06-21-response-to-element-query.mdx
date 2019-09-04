---
view: post.twig
title: A Response To "Working around a lack of element queries"
date: 2013-06-21
---

Today Fillament Group posted about the age old question of [ Working around a lack of element queries](http://filamentgroup.com/lab/element_query_workarounds/). I crafted a response that I thought was worth sharing here.

I agree that this is a big pain in the butt! We want to create a system where content blocks are styled properly regardless of where they are placed on a page.

Option #2 made me think about about the power of a basic media query mixin, and how you can pass the contents of the mixin to more than one directive/selector.  I’ve done this in the past where I pass my layout media queries to both min-width media queries and an .ie8 prefixed version of the selector. (Like this [Gist](https://gist.github.com/micahgodbolt/5406759))

So thinking about the problem, we want the style of your calendar to switch from “full” to “condensed” under 2 different circumstances.

1) is if the media browser drops under a certain width (say 500px). In that case the calendar should always be “condensed” because there is no room in any parent container for the “full” version.

2) in it’s simplest terms, is when the calendar is displayed in a parent element that we know will never be large enough for a “full” version. In this case, we can simply change the selector from .calendar to .sidebar .calendar and pass in the same styles without the media query.  [Solution in CodePen](http://codepen.io/micahgodbolt/pen/qjFnB)

Now this makes the assumption that the sidebar will never be large enough for the full version, and it could probably be improved upon. But this is a way to write “media queries” where we can also pass in the class names of containers where we want the calendar to always display in “condensed”
