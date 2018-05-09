---
title: What's right with css-in-js
view: post.twig
date: 2018-05-09
---

The first time I heard about CSS in JS I thought it was interesting but absurd. It was limited to producing inline styles, and introduced nasty workarounds to support pseudo selectors like `:hover` and `:after`. So when Brad wrote about [What's wrong with css-in-js](http://bradfrost.com/blog/link/whats-wrong-with-css-in-js/), on one hand I completely empathized with his frustrations. But on the other hand I had spent the past 2 years seeing the limitations of traditional, build time, CSS styling and had fully embraced the css-in-js model that [Microsoft Fabric UI](https://developer.microsoft.com/en-us/fabric) had adopted. I wanted to quickly jot down my thoughts of why Brad is partly correct, partly incorrect...but mostly,just hasn't seen everything yet.

## Obligatory Rebuttals

Brad highlighted three different frustrations with css-in-js, so before I dive into how Fabric tackles this subject, let me drop in a few rebuttals.

### Portability

Brad is concerned that css-in-js will produce styles with less portability, and while portability is always an important principle he has missed a few important points.

First, by writing styles in JavaScript, our components can actually be more portable. With Webpack, we at Fabric are able to package up our components into small bundles that can be imported directly into our applications, regardless of the tech stack of the application. Building on Drupal and want to render a small React powered widget? No need to change your CSS pipeline to include new assets, all of the CSS is loaded onto the page as soon as the widget is rendered.

Secondly, I agree that writing our styles in JavaScript makes them less accessible to other components wanting to reuse variables, mixins and functions. The variable problem can certainly be remedied by moving those important values into Tokens (or some JSON'esque file that JS and Sass can read). Mixins and Functions, on the other hand, are more difficult to produce cross platform and will either need to be duplicated, or accepted as a 'lost in translation' casualty. 

```js
{
    button_background: 'green',
    button_text: 'white'
}
```

This can be converted into the following with tools like [Theo](https://github.com/salesforce-ux/theo):

```sass
$button-background: green;
$button-text: white;
```

Lastly, his concern that this will make updating a simple button a herculean task is understandable....unless you take the opportunity to create global, and/or local interfaces into each component. These interfaces allow the user of the component to provide overrides that either effect all components (change default text size to 18px), or just a single component (change the font size of a single button to 18px). These interfaces are actually BETTER than what we traditionally have with CSS, as we never have to wonder what combination of CSS selectors will be specific enough to override the default styles.

We provide global theming functionality in Fabric with the [loadTheme function](https://developer.microsoft.com/en-us/fabric#/components/themes)

```js
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

loadTheme({
  palette: {
    'themePrimary': 'red',
    'themeDarkAlt': 'green'
  }
});
```

See it in action in [this CodePen](https://codepen.io/micahgodbolt/pen/dederq).

### Context Switching

Some of the css-in-js examples that Brad pointed to in fact DID have context switching issues in that...well there was no switching! It was just a single file of business logic, markup and styles. This really doesn't have anything to do with css-in-js though, it's just an enhanced version of inline styles, which have their place and time. We don't know if this code is simply a prototype, or actually something in production.

Regardless of your opinion of inline styles, css-in-js doesn't mean our concerns can't be separated. In Fabric our styles are always written in separate files. And if you understand Sass, you will have little trouble reading our css-in-js styles. Here's a quick sample from our [SearchBox Styles file](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/SearchBox/SearchBox.styles.tsx#L13).

```js
root: [
    'ms-SearchBox', // Classname passed to the root element
    fonts.medium, // Font Family Mixin we imported above
    normalize, // Normalize Mixin
    {
        color: palette.neutralPrimary, // Color variable from global palette
        display: 'flex', // normal old css
        flexDirection: 'row',
        flexWrap: 'nowrap',
    }
];

```

### Best Practices

I agree that you'll sometimes find JavaScript developers writing markup and styles who know very little about proper semantics and accessibility. But I would argue that this is at most a warning to always keep front-end minded developers involved in your markup and styles. If moving styles to JS makes you think "great, now all we need are more JS developers on this project", you are sorely missing the point!

## What's actually right with css-in-js

With [Microsoft Fabric UI](https://developer.microsoft.com/en-us/fabric) we faced a pretty unique challenge in that we were producing incredibly functional components that happened to include styling based on the Office design language. These components, such as [DetailsList](https://developer.microsoft.com/en-us/fabric#/components/detailslist), [ComboBox](https://developer.microsoft.com/en-us/fabric#/components/ComboBox) and [PeoplePicker](https://developer.microsoft.com/en-us/fabric#/components/peoplepicker) are valuable because they give you something that looks like Office out of the box, but 90% of their value is in the functionality they provide. Due to that distribution of value, there are many situations where product teams would like to use our components, but they want that ComboBox to match their own flavor of design language. This is not an occasional ask, this is a constant ask! So here were our options:

### Provide the components as is and expect them to override with CSS

If you've ever maintained a framework where people would customize it with CSS, you know how painful this can be. You never know what you'll break by doing something as simple as adding/removing a wrapper div, or rearranging a couple elements. As soon as your users feel they can't trust your components  you'll start losing them.

Cancel button is red as expected:

```html
<style>
.card button:last-child { background: red }
</style>

<div class="card">
    <button> Click Me </button>
    <button> Cancel </button>
</div>

```

Both buttons red after change in markup:

```html
<style>
.card button:last-child { background: red }
</style>

<div class="card">
    <div><button> Click Me </button></div>
    <div><button> Cancel </button></div>
</div>

```

### Provide Sass variables that can be changed at compile time

At first glance this approach seems fine. You'll see [Bootstrap](http://getbootstrap.com/docs/4.1/getting-started/theming/) doing it, as well as [Foundation](https://foundation.zurb.com/sites/docs/sass.html). But as soon as you do this, you make some incredible assumptions about your users.

```scss
// Your variable overrides
$body-bg: #000;
$body-color: #111;

// Bootstrap and its default variables
@import "node_modules/bootstrap/scss/bootstrap";
```

First, you assume they even have a build step that would let them compile Sass. Fabric is often used by including it as a JavaScript dependency. You can use Fabric components directly in [CodePen](https://codepen.io/FabricReact/pen/NvBvWx) by linking directly to the [unpkg file](https://unpkg.com/office-ui-fabric-react/dist/office-ui-fabric-react.min.js).

Secondly you assume they want to go through the effort of modifying their build process to include compiling your Sass. They might already use another preprocessor, or the cost of modifying their build system is too great to worry about it. Remember that your components might be one of the dozens of dependencies in someones application.

Thirdly, you assume that all theming happens at build time. In many Microsoft products, users have the ability to create custom themes by picking colors from a color wheel. I can assure you that there isn't a CSS file sitting on the server with every single color combination already compiled. Even if you only support a handful of themes, the CSS required to support them would increase the file size and compile time dramatically!

### Provide a JavaScript interface to change styles at runtime

If we treat component styles [as just another prop](https://reactjs.org/docs/components-and-props.html), we can update a Button's icon color just as easily as we update the Button's text.

This not only makes the Button easier to use by our downstream partners, but it also makes it easier to use within our own framework. We can use the Button's functionality in our Dropdown without adding yet another variant to the Button.scss file.

Another benefit of using a styling prop is that you can use [TypeScript](https://www.typescriptlang.org/) to define the interface. This means instead of hunting through the DOM to find the class name needed to target the SearchBox icon, you can [look at the interface](https://github.com/OfficeDev/office-ui-fabric-react/blob/b49d901ca069090a33777a6e03899673333aacf4/packages/office-ui-fabric-react/src/components/SearchBox/SearchBox.types.ts#L124). Ah, it's `icon`. 

```TypeScript
export interface ISearchBoxStyles {
  root?: IStyle;
  iconContainer?: IStyle;
  icon?: IStyle;
  field?: IStyle;
  clearButton?: IStyle;
}
```

Now I could write something like `<SearchBox styles={{icon: {fontSize: '24px'}}} />` to create a SearchBox with a big icon.

If you use an editor like [VS Code](https://code.visualstudio.com/), you won't even have to look the interface up. It'll just show up right in your editor.

#### Styles as a Function

As an added bonus, when we write our styles, we don't have to use a static set of value. This is invaluable when dealing with components that have many states. How does the SearchBox look when it's disabled? How does it look when it has focus? How does it look when text has been entered?

If we think of our styles as the result of a function, we can include a set of style parameters that change the styles produced.

So if we know the SearchBox has a `hasInput` style param, we can return different styles depending on that value.

```js
const styles = (hasInput) => {
    icon: {
        background: hasInput ? 'green' : 'transparent'
    }
}
```

## Why this all matters

JavaScript has always been a proving ground. We write code that simulates how we want the web to work. We had dozens of different JavaScript based responsive image solutions before a spec was settled on and adopted by browsers. css-in-js is the development community trying to imagine how CSS should work in the future to solve a specific set of problems.

I'm hoping that the patterns we discover during this phase of web development will lead to better web technologies in the future. We've all identified these problems, and we're all working towards solutions. Hopefully some combination of CSS custom properties, web components will obviate the need for css-in-js. But until then, we're going to keep experimenting with the best ways to solve these problems.