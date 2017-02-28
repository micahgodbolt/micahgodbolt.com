---
title: Make Composable, not Customizable Components
view: post.twig
date: 2017-02-27
---

One of the challenges of developing for an open source design system like [Fabric React](https://github.com/OfficeDev/office-ui-fabric-react) is that, as a system used across our entire organization, developers will have unique requirements for various components. We might create a dropdown menu, but a developer might have a use case for icons added to the left side, or the ride side, or on both sides, or image thumbnails, or multi line, or..or..or..or..... until we've got a dropdown component that has a hundred different possible properties, tons of custom CSS to cover each use case, and dozens of tests to make sure that each possible variation doesn't break.

It turns out, this approach is neither maintainable, nor sustainable. We quickly found oursleves duplicating styles and functionality as each component gets more complex and capable. We'd even gotten to the point where we were needing to add color abstractions so that we can keep all of these duplicated UI elements in sync.

A better approach to this problem is to stop trying to make components so customizable, __and start making them composable__.

A composable solution to the dropdown problem above would be to allow developers to compose content into each list item. This means users could override the function that creates the dropdown content, and pass in any other component or custom markup they wished.

## Real life example

Recently I was working on a component called [Facepile](https://dev.office.com/fabric#/components/facepile) which is a list of [Persona](https://dev.office.com/fabric#/components/persona) components. Personas can contain either an image or the person's initials, if no image is available. This worked great until we wanted to add "Personas like buttons" to our Facepile that contained Icons, or custom text. 


<img style="display: block; max-width: 100%;" src="/assets/img/facepile_icon.png">

One option would be to go into the persona and create an Icon property that'd let us pass in an icon name, as well as another string property for passing in custom text. Then we'd need to write a bunch of logic to only print the correct markup given the data pass in, and then write tests to support each variation. 

The other option would be to make the contents of that Persona customizable so that a user could override a single instance of a Persona and pass in any component that they like. This meant that we could pass in an icon, or string of text, or superset text, or literally any other component, all without having to modify the Persona again.

In this case, we're using React, and have replaced the initials string with a function that we can override when rendering the component.

```
<Persona
  onRenderInitials= { () => <MyIconCode> }
>
```

### Considerations with Composability

_To default or not default, that is the question._

With some components it makes sense to include default content, and let a user override it when necessary. Othertimes you might want to leave any default content out of the component and treat it as nothing but a container. Examples of these containers are things like modals, callouts, panels, cards etc.

When deciding if you should include any default content think about how often it will be used vs overriden, and the weight of that extra code needed to support the default content. If you have a close button on 95% of your modals, go ahead and include that by default in the component. But if the cancel and submit buttons only appear in some of your modal designs, consider making a dialog component instead, which uses the modal, but has those buttons included by default.

Composability also encourages smaller reusable pieces of content. If you decided to break the close button out of the modal into its own component (possibly with the abiliity to include multiple icons), you now have an Icon based UI component that could be used to close Panels, or minimize cards etc.

## Further Reading

Once you have a system of containers and components that you can compose together, you'll find that you start to make many of your new components without ever introducing new markup or styles. By abstracting into components everything your visual language is ["needs to say"](https://twitter.com/micahgodbolt/status/717565115919237120), you can start to build an infinate number of "patterns" that are nothing more than custom interfaces into more complex designs. 

I wrote about this style of composition in a previous post called ["A New Design System Architecture"](a-new-design-system-architecture).

I also spoke about it at Generate London in a talk called [Road Runner Rules](https://www.youtube.com/watch?v=CnspEEQqb3w)