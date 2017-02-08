---
view: post.twig
title: Developing a Mobile First Website
date: 2012-10-11
teaser: Over the past week I've been putting the finishing touches on my first round of html comps for our new responsive, mobile first layout. True to the mobile first nature, I started with no media queries, reduced the width of my browser and started to design away. I've been really happy with the results and wanted to share a few thoughts I had after finishing the process.
---
Over the past week I've been putting the finishing touches on my first round of html comps for our new responsive, mobile first layout. True to the mobile first nature, I started with no media queries, reduced the width of my browser and started to design away. I've been really happy with the results and wanted to share a few thoughts I had after finishing the process.

<h2>Discovery</h2>
Our team had spent several weeks talking goals and direction, but as this was the first redesign done within the marketing department, the process was pretty new, and I was given quite a bit of freedom on how to approach the project. Our first dilemma was determining our first deliverable. As I was working with people with more traditional print backgrounds, there was a natural tendency towards fully fleshed out comps rather than wireframes.

<h3>Lesson 1 - Always start with wireframes</h3>
I was pretty lucky that this didn't come back to bite me really hard, but I certainly learned my lesson on the importance of getting some buy in for the basic layout of your app. Little things like the location of the logo being left or right aligned might completely change your UI choices.

For example, an early commit had our navigation icon on the left hand side, and the logo on the right. Upon clicking the nav icon, the full navigation would slide in from the left hand side. This ended up changing in later commits as I moved all of the secondary items to slide down from the top, but had it not I would have had some real issues after we decided to move the logo from the right to the left side of the header. Now what do I do, accept the disconnect I have with the nav icon in the middle of the header, or move the entire slider to the right hand side? These are basic UI decisions that can be solved with a simple wireframe.

But as I said, I got pretty lucky and we got through the process going straight to html/css/js. What was my setup to design and test? Well that’s up next.

<h2>Coding Environment</h2>
This could be a blog series in itself, so I will just hit the major points. I code on a mac, using Sublime Text 2, Sass/Compass, Live Reload, git and the Chrome browser. I’ve become a huge fan of doing all my file traversing through command line. This lets me open files in Sublime, start up my “compass watch”, and commit my changes to git all within the same window.

<h3>Lesson 2 - There is a short list of tools that you must be rabid about.</h3>

For mobile development it is obviously helpful to be able to view your work on mobile devices, and this is where MAMP Pro stepped up and proved it’s worth. Sure I could upload the files to a remote server, but this added in quite a few steps just to see a few small changes. One of the big features of the paid version of MAMP is the ability to serve up files on your local network. So whether it’s a static html comp, or a full CMS, you can develop locally and see your changes as soon as they compile. This is also great because it allows you quickly demonstrate your progress to coworkers on their own devices from anywhere on your network.

A second essential tool is mobile remote debugging. One of the best features of the new Android Chrome browser is the ability to use the desktop browser inspect tool to see the code your mobile device is rendering and to do all of your normal css editing and js debugging. So the code goes round trip, hosted on your laptop, received over wifi on your mobile, debugged on your laptop via USB. It’s a beautiful thing.

<h2>Jumping Off Point</h2>
One thing that tripped me up when I first got started was “where do I start”? There were a number of choices I had, ranging from the standard HTML5 Boilerplate, to the Drupal theme that I was eventually going to be porting this design into. On one hand I needed something that had all of the components I typically start with: The index.html from HTML5 Boilerplate, my compass config.rb along with the proper folders, modernizr.js and normalize.css. But I also wanted something really lean, where I could start to build my own scss structure as the project grew.

<h3>Lesson 3 - DRY(Don’t Repeat Yourself)</h3>
If this is the setup I always start with, I should make it easy to update and access. And that's just what I did with my <a href="https://github.com/micahgodbolt/base-install" target="_blank">custom base install</a>. With Sublime Text, a package called “Fetch” and github, this is a piece of cake. With a few keystrokes I can download all the files and entire folder structure right into my project folder, hit “compass watch” and start writing sass.

<blockquote>One quick note about normalize.css. If you are still using a full CSS reset stop and ask yourself why. One of the greatest things about HTML is that browsers do a great job of applying some really solid basic styles. For example, this blog post has VERY few styles applied to it. Paragraphs, headings, lists, they are all proportionate and flow quite nicely. Yes, not all browsers style HTML in the exact same way, but that is why normalize.css is so great. It focuses only on those inconsistencies, making sure that font sizes, margings and paddings for all of the HTML elements render consistently. </blockquote>

<h2>Plan your HTML patterns carefully</h2>
List based navigations are great, love them, but they can drive me crazy at times. The crux of my frustration came from a lack of planning. When you want a background color behind each menu item, on which element should you apply that background? Well you could style the entire 'nav' element, the 'ul', the 'li', the 'a' or maybe even the 'span' that you wrap around each item. That’s a lot of choices! And each choice might be right...or wrong given the situation, and each one will require specific margin and padding choices to make sure the background displays properly. I was in a situation where I wanted a gradient behind each primary list item. Putting it on the 'li' seemed logical, but once I started to style the secondary navigation I realized that the parent 'li' stretches around the entire secondary nav, stretching the background gradient with it.

The other example I have is much more practical. One of the great joys of object oriented Sass is that you can make large sweeping changes across multiple components with just a few small code changes. So when creating my navigation, ATM locator and member login area I knew I wanted them to reuse all of the same UI elements. To make this as easy as possible (without resorting to applying style related classes to every HTML element), I made sure that they had nearly identical HTML markup. A classed container with a single 'ul' which contained all of the other elements, wrapped in their own 'li'. This decision wasn't just one of semantics (which would have been enough on it’s own), but it allowed me to write a Sass function which, when fed the containers class, extended several selectors, and then created just the unique css needed to style it properly, and hook it into the jQuery I was using to expose each section when it's icon was pressed.

<h2>Icon fonts are your friend</h2>
One key to a good mobile first design is having UI elements that will scale to your device needs. Icon fonts are one of the best ways to do this. With a single request you can call a custom built icon font, use them at any resolutions you want, in any color, and even toss on some font drop shadow for good measure. With the smaller display resolutions of mobile devices, recognizable icons can portray a great deal of meaning in a small place.

Next up is a tablet-ish layout. To do this I'll simply stretch the view-port until it looks like crap, back up a bit, and re-imagine how users would want to interact. But this time, I'm starting with a wireframe!
