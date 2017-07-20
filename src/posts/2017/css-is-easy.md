---
title: Writing the Correct CSS Once is Pretty Easy
view: post.twig
date: 2017-05-15
---

Sometime back I tweeted "Writing the correct CSS once is pretty easy.  Making that CSS work in all situations, and for all people is the hard part." and it resonated with more than a few people. I'm not saying that CSS is simple, and doesn't require skill to master. I'm saying that writing the correct CSS is just the first of many steps when creating a large scale Design System. 

You see, the color and padding of your primary button might not change for two whole years, but the way that it is delivered and rendered might change a dozen times as you face various challengs. I want to share with you a few of the challenges I've seen design systems face, and the ways that you can conquere them.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Writing the correct CSS once is pretty easy.  Making that CSS  work in all situations, and for all people is the hard part.</p>&mdash; Micah Godbolt (@micahgodbolt) <a href="https://twitter.com/micahgodbolt/status/864260989629353985">May 15, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## All Situations

In a very controlled environment, like this blog, I don't have to worry too much about how my CSS might be used. I know my target platform, and I can be quite certain what code makes it to the page. In large scale design systems, this is often not the case.

### One System Multiple Platforms

One common challenge you might face is creating a single system that is going to work across multiple platforms. Those platforms might be programming languages (Node vs Ruby vs PHP), or templating languages (Twig vs Nunjucks vs Mustache) or frameworks (Angular vs Ember vs React). No matter what combination of platforms you need to support, creating a single design system that will support them all will be quite a bit of work, as Brad Frost has been has been saying for a while in articles such as [Managing Technology-Agnostic Design Systems](http://bradfrost.com/blog/post/managing-technology-agnostic-design-systems/).

One solution that I have seen to be really effective is to create a set of design tokens with tools such as [Theo](https://github.com/salesforce-ux/theo) to capture all of your important values. These design tokens, such as `BUTTON_TEXT_COLOR_HOVER: #999`, are cross platform by nature, and can be converted to Sass variables, JavaScript objects, or even assets for Android and iOS. This way, even if you are creating an Angular and React version of every component, you won't be forced to try and share markup and CSS in order to keep these important values in sync.

### One Platform Multiple Systems

Another difficult challenge you might come across happens when you need to support multiple systems, or multiple versions of the same system on a single platform. One of the larger ommisions in the CSS spec is a way to properly scope, or contain styles. In JavaScript we can simply `var myModule = require('someModule')` and we get all of "someModule" available to us inside of the myModule variable. So if we require two different modules that include a `unicorn` variable, we don't have to worry about which `unicorn` our code uses, as they'll both be scopeed under their import variable. 

Not so with CSS. If you import two CSS files that both have `.unicorn` defined, the file that loads second wins. Most major frameworks have gotten around this by adding a prefix to their classes, such as `.bs-unicorn`. While this might solve the problem of two different frameworks working together, what happens if you have an application that needs to support multiple versions of the __same__ framework? 'Would never happens' you say? Think of a situation where you provide a copy of your css to external, or 3rd party developers to create content for your application. These 3rd party snippets end up living side by side with your content, and unless you have a plan for supporting multiple versions of your framework on a single page, they will all be sharing the same CSS. Now with any update to `.bs-unicorn`, breaking changes will either require all 3rd party code to be updatetd, or will introduce bugs into their code, and errode their trust in you.

There are few possible solutionss to this problem, but only one that really makes 100% sense.

#### Scope styles inside a parent wrapper

Using Sass it's pretty easy to import a whole mess of styles inside of a single scoping class.

```sass

// my-styles.scss
.unicorn {...}

// main.scss
.v5 { @import 'my-styles'}

.v6 { @import 'my-styles'}
```

This will yield

```
.v5 .unicorn {...}

.v6 .unicorn {...};
```

So now these two unicorn can live side by side.

```html
<div class="v6">
    <div class="unicorn">🦄</div>
<div>

<div class="v5">
    <div class="unicorn">🦄</div>
<div>
```

This solution works alright, but you just increased the specificity of all of your css selectors, bloated each css file, and you have to load multiple version of the CSS onto the page. Also, this solution only works as long as these components are never nested, as once you put a v5 unicorn inside of a v6 component, we're right back to css load order issue.

```html
<div class="v6">
    <div class="unicorn">🦄</div>
    <div class="v5">
        <div class="unicorn">🦄</div>
    <div>
<div>
```

#### Add version prefix to every classname

Since our last example failed due to limitations in parent selectors, what if we moved the version number into the selector itself. This way we aren't adding any specificity, and components only rely on their class names for styling, not their parent selectors.

```css
.unicorn_v5 {...}

.unicorn_v6 {...}
```

Now we don't have any trouble, even when we nest components.


```html
<div class="A_v6_component">
    <div class="unicorn_v6">🦄</div>
    <div class="A_v5_component">
        <div class="unicorn_v5">🦄</div>
    <div>
<div>
```

This is great and all, but you can imagine needing to update all of your class names every time someone bumps the version number. And with unique sets of CSS for every version, you might end up loading a different version of a component that is exactly the same CSS. Sure, you can alleviate by versioning each component seperately, and only bump the version when that component changes, but now you're in a dependency and maintenence nightmare. 

So what if we could automatically generate new, unique class names for both our CSS and HTML that only changed when the actual CSS of the component changes? Well, I'm glad you asked.

#### CSS Modules  

[CSS modules](https://github.com/css-modules/css-modules) gets you all of the benefits of the above approach (single, scoped selectors) but handles the class names automatically, and is smart enough to create new revisions only when the CSS changes.

CSS Modules, as the name implies, uses the JavaScript import syntax to convert CSS into a JavaScript object that is accessible to your rendering engine. Class names include a hash that is based off of the styles in the selector. So the hash doesn't change unless the styles do.

```css
/* v5.css */
.unicorn { color: white}
.horse   { color: brown}

/* v6.css */
.unicorn { color: pink}
.horse   { color: brown}
``` 

```js
// UserA.js
import styles from "./v5.css";

document.getElementById('userAComponent').innerHTML = `
 <div class= ${styles.unicorn}>🦄</div>
 <div class=${styles.horse}>🐴</div>
`;

// UserB.js
import styles from "./v6.css";

document.getElementById('userBComponent').innerHTML = `
 <div class= ${styles.unicorn}>🦄</div>
 <div class=${styles.horse}>🐴</div>
`;
```
The resulting HTML would look like this

```html
<!-- Rendered Style Tags -->
<style>
    .unicorn_ab25jau { color: white}
    .horse_b8e7bj3   { color: brown}
</style>

<style>
    .unicorn_8glsj9s { color: pink}
    .horse_b8e7bj3   { color: brown}
</style>

<!-- Rendered HTML -->

<div id="userAComponent">
    <div class="unicorn_ab25jau">🦄</div>
    <div class="horse_b8e7bj3">🐴</div>
</div>

<div id="userBComponent">
    <div class="unicorn_8glsj9s">🦄</div>
    <div class="horse_b8e7bj3">🐴</div>
</div>
```

So you can see how two versions of the same component can be rendered to the page and each will bring along the correct styles needed to render as expected. Notice today that both horses use the same hash, but if v7 gives us a horse of another color, we'll get a new hash associated with those styles, like `horse_ljb02bh`.

## All People
So far, all of the solutions we've talked about so far are build time solutions. They won't change from render to render. But as your component gets used by more and more people, you often find that people want to change things at runtime, when the component is being rendered. 

### One Platform Many Themes

### One Page Many Themes


### 