---
view: post.twig
title: Sass Placeholders and Unicorns With Lasers.
date: 2012-10-12
---
I really like Sass placeholders.

```scss
.widget {
awesome-level: unicorns;
  .context & {
      awesome-level: unicorns-with-lasers;
  }
}
```

This way all widgets are awesome-level "unicorns", but if that widget is in a certain context (in a sidebar, in a header, nav..whatever), then it's awesome-level is "unicorns-with-lasers"!

Of course the CSS this creates isn't anything new, but this is a great way to keep your widget code organized.
