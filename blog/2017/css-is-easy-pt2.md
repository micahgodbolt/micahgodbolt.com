---
title: Writing the Correct CSS Once is Pretty Easy - Part 2
view: post.twig
date: 2017-08-18
draft: true
---

## All People
So far, all of the solutions we've talked about so far are build time solutions. They won't change from render to render. But as your component gets used by more and more people, you often find that people want to change things at runtime, when the component is being rendered. 

### One Platform Many Themes

Create a design system that's used by enough different teams, and you are inevitably going to be asked at some point to support custom themes. It might be something as simple as changing font and link colors, or changing the base, hover, pressed and disabled states of the primary button, or it could be completely reskinning the application to match the brand colors of the 3rd party application. So no matter the level of customization your users require, you'll probably want to consider one of the following solutions.

#### Require a custom build

I know I said above that we'd want to move this type of customization into the browser, at runtime, but one option you can always consider is requiring the custom theme to be create at application build time. This essentially requires you to ship your Sass files with your design system, and expect custom themes to be generated by the application setting theme variables that are then passed into your Sass files.

```scss
// userVars.scss
$buttonRootBG: blue;
$buttonHoverBG: pink;
```

```scss
// designSystem.scss
@import 'userVars';

$buttonRootBG: red !default;
$buttonHoverBG: orange !default;

.button {
    background: $buttonRootBG;
}

.button:hover {
    background: $buttonHoverBG;
}
```

If this works for you and your users, that's great. This approach is popular with frameworks like Boostrap and Foundation, but it isn't without problems. 

1. You can't use themes without having a custom build step
2. You can't change themes in the application
3. To support multiple themes you need individual CSS files
4. Exporting source assets in an npm package is usually considered bad practice

#### User CSS Variables

CSS variables is one of the many great CSS features that was pulled directly from CSS preprocessors, and it is exactly what we need to move our themes into the browser.

First we move from Sass variables to CSS variables, and from !default definitions in our application to fallback values in the CSS variable. Note that you can always continue to use `$buttonRootBG: var(--buttonRootBG, red)` instead.

```css
/* designSystem.css */
.button {
    background: var(--buttonRootBG, red);
}

.button:hover {
    background: var(--buttonHoverBG, orange);
}
```

```html
<!-- Inject a custom style tag to set a theme -->
<style>
.button {
    --buttonRootBG: green;
    --buttonHoverBG: pink;
}
</style>
<link rel="stylesheet" type="text/css" href="designSystem.css" />

<button class="button">Click Me</button>
```

#### Fake CSS Variables

If you can't jump on CSS variables yet (shakes fist at IE11), you can always fake it as long as your CSS rendering pipeline provides you enough flexibility. Without going into all the details, at Microsoft we use an NPM package called [Load Themed Styles](https://www.npmjs.com/package/load-themed-styles) that allows our React application to parse and modify the CSS strings before printing them to the page.

It works almost exactly like CSS variables in that there is a variable name, and a fallback set for each property, but instead of relying on the browser to interpret the CSS variable, Load Themed Styles swaps the values out for us before printing them to the page. The result might make CSS linters yell at you, but it certainly gets the job done.

```css
/* designSystem.css */
.button {
    background: "[theme:buttonRootBG, default:red]";
}

.button:hover {
    background: "[theme:buttonHoverBG, default:orange]";
}
```

Afer this CSS is converted into a string in our React module, we replaced our tokenized values with either a supplied `buttonRootBG`, or the default value. The valid CSS is then burned onto the page, and if the application ever needs to change the theme, the original CSS string can be reprocessed, and the old style tag replaced with the new.

### One Page Many Themes

Coming Soon

### 