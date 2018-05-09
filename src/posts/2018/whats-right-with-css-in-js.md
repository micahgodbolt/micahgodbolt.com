---
title: What's right with css-in-js
view: post.twig
date: 2018-05-08
---

The first time I heard about CSS in JS I thought it was interesting but absurd. It was limited to producing inline styles, and introduced nasty workarounds to support pseudo selectors like `:hover` and `:after`. So when Brad wrote about [What's wrong with css-injs](http://bradfrost.com/blog/link/whats-wrong-with-css-in-js/), on one hand I completely empathised with his frustrations. But on the other hand I had spent the past 2 years seeing the limitations of traditional, build time, CSS styling and had fully embraced the css-in-js model that [Microsof Fabric UI](https://developer.microsoft.com/en-us/fabric) had adopted. I wanted to quickly jot down my thoughts of why Brad is correct...but hasn't seen everything yet.

## Obligatory Rebuttle

Brad highlighted three different frustrations with css-in-js, so before I dive into how Fabric tackles this subject, let me drop in a few rebuttles.

### Portability

Brad is concerned that css-in-js will produce styles with less portability, and while portability is always an important principle he has missed a few important points. 

First, by writing styles in JavaScript, our components can actually be more portable. With Webpack, we are able to package up our components into small bundles that can be imported directly into our applications, regardless of the tech stack of the application. Building on Drupal and want to render a small React powered widget? No need to change your CSS pipeline to include new assets, all of the CSS is loaded onto the page as soon as the widget is rendered.

Secondly, I agree that writing our styles in JavaScript makes them less accessible to other components wanted to reuse variables, mixins and functions. The variable problem can certainly be remedied by moving those important values into Tokens (or some JSON'esque file that JS and Sass can read). Mixins and Functions, on the other hand, are more difficult to produce cross platform and will either need to be duplicated, or accepted as a 'lost in translation' casualty. 

Lastly, his concern that this will make updating a simple button a herculean task is understandable....unless you take the opportunity to create global, and/or local interfaces into each component. These interfaces allow the user of the component to provide overrides that either effect all components (change default text size to 18px), or just a single component (change the font size of this single button to 18px). These interfaces are actually BETTER than what we traditionally have with CSS, as we never have to wonder what combination of css selectors will be specific enough to override the default styles.

### Context Switching

Some of the css-in-js examples that Brad pointed to in fact DID have context switching issues in that...well there was no switching! It was just a single file of business logic, markup and styles! I'm in total agreement that css-in-js makes these frankenstein files completely possible, but they don't have to be the rule. In Fabric we for one, never include any business logic in our components, they are purely UI elements that an application can wire up to perform their business needs.

Secondly, our styles are always written in seperate files and upon opening them, if you know how to read Sass, you will have little trouble reading css-in-js styles.

Thirdly, we are so commited to creating seperate context for each concern that we keep our components completely decoupled from our styling and default class names. You can take our [SearchBox Base](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/SearchBox/SearchBox.base.tsx) and render it without a single Fabric style or class name. We're that decoupled. This also means that you can easily provide your own styles using the same tools that we use to style the SearchBox...and you can do this at runtime! This means that you can have two instances of the SearchBox on the screen at the same time with completely different styles with zero fear of one bleeding into another.

### Best Practices

I agree that you'll often find JavaScript developers writing markup and styles who know very little about proper semantics and accessibility, but I would argue that this is at the most a warning to always keep front-end minded developers involved with the markup and styles you produce. If moving styles to JS makes you think "great, now all we need are more JS developers on this project", you are sorely missing the point!

## What's actually right with css-in-js

With [Microsof Fabric UI](https://developer.microsoft.com/en-us/fabric) we faced a pretty unique challenge in that we were producing incredibly functional components that happened to include styling based on the Office design language. These components, such as [DetailsList](https://developer.microsoft.com/en-us/fabric#/components/detailslist), [ComboBox](https://developer.microsoft.com/en-us/fabric#/components/ComboBox) and [PeoplePicker](https://developer.microsoft.com/en-us/fabric#/components/peoplepicker) are valuable because they give you something that looks like Office out of the box, but 90% of their value is in the functionality they provide. Due to that distribution of value, there are many situations where product teams would like to use our components, but they want them to match their own flavor of design language. This was not an occassional ask, this was a constant ask! So here were our options:

### Provide the components as is and expect them to override with CSS

If you've ever mainained a framework where people would customize it with CSS, you know how painful this can be. You never know what you'll break by doing something as simple as adding/removing a wrapper div, or rearanging a couple elements. As soon as your users feel they can't trust your components because their styles keep breaking, you'll start losing them, and they'll either fork the code and stop taking your updates, or they'll look elsewhere.

### Provide a set of Sass variables that can be used to override the current theme

At first glance this approach seems fine. You'll see [Bootstrap](http://getbootstrap.com/docs/4.1/getting-started/theming/) doing it, as well as [Foundation](https://foundation.zurb.com/sites/docs/sass.html). But as soon as you do this, you make some incredible assumptions about your users! 

First, you assume they even have a build step that would let them compile Sass. Fabric is often used by simply including it as a JavaScript dependency. You can use Fabric components directly in [CodePen](https://codepen.io/FabricReact/pen/NvBvWx). 

Secondly you assume they want to go through the effort of modifying their build process to include compiling your Sass. They might already use another preprocessor, or the cost of modifying their build system is too great to worry about it.

Thirdly, you assume that all theming happens at build time. In many Microsoft products, users have the ability to create custom themes by picking colors from a color wheel. I can assure you that there isn't a CSS file sitting on the server with every single color combination already compiled. Even if you only support a handful of themes, the CSS required to support them would increase the file size and compile time dramatically!

### Provide a runtime interface to override styles as components are rendered

Frameworks such as [React](https://reactjs.org/) and [Vue](https://vuejs.org/) are written in JavaScript because HTML, or even templating languages, don't give us the ability to change the markup after we run our build step and deploy. This works fine for a static blog, but doesn't cut it for dynamic applications!

In the same way, if we don't use JavaScript, we can't change our styles once the css has been compiled. Once we do use JavaScript though, we are then able to wait until the browser loads before we detemine what our final styles are. This means that our components can look to a global set of theme values to determine what colors and font-families to use. Those values can also be passed directly into the component [as a prop](https://reactjs.org/docs/components-and-props.html) allowing you to render two completely different looking Buttons side by side using the exact same component code.

This not only makes the Button easier to use by our downstream partners, but it also makes it easier to use within our own framework. Now we can use all Button functionality in our Dropdown menu without the need to go back to the Button component and write a new set of variant styles in the Sass.

The other benefit of providing a styling interface to a component is that you can use something like [TypeScript](https://www.typescriptlang.org/) to define it. This means you'll never have to hunt through the DOM to find the class name needed to target the SearchBox icon. You can just [look at the interface](https://github.com/OfficeDev/office-ui-fabric-react/blob/b49d901ca069090a33777a6e03899673333aacf4/packages/office-ui-fabric-react/src/components/SearchBox/SearchBox.types.ts#L124). Ah, it's simply `icon`. 

```TypeScript
export interface ISearchBoxStyles {
  root?: IStyle;
  iconContainer?: IStyle;
  icon?: IStyle;
  field?: IStyle;
  clearButton?: IStyle;
}
```

 If you use an editor like [VS Code](https://code.visualstudio.com/), you won't even have to look the interface up. It'll just show up right in your editor. 

#### Styles as a Function

As an added bonus, when we write our styles, we don't have to use a static set of value. This comes in handy when we realize that a single set of styles for a component are rarely enough. How does the SearchBox look when it's disabled? How does it look when it has focus? How does it look when text has been entered?

If we think of our styles as the result of a function, we can provide a set of style props at runtime that change the styles produced.

So if we know we have a `hasInput` style prop, we can return different styles depending on if that was true or not.

```js
(hasInput) => {
    icon: {
        background: hasInput ? 'green' : 'transparent'
    }
}
```

This is often handled by applying and removing classes from the root element, but this approach allows you to accept more complex props (colors, numbers, arrays), you can check for multiple conditions (hasInput but is not disabled), and you never have to worry about if the modifier class is on the actual element, or on a parent element `.hasInput .icon` vs `.hasInput.icon`. 

