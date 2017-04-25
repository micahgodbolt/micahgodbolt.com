---
title: From Minimum Wage to Senior Developer - Part 3
view: post.twig
date: 2017-04-04
---

Having entered 2014 with a pink slip in my inbox, there's no way I could have imagined where I'd be today. How does one go from losing a junior position (64k/year) to landing a senior position at Microsoft ([level 64](https://www.glassdoor.com/Salary/Microsoft-Level-64-Salaries-E1651_D_KO10,18.htm)) in 2 1/2 years? There's part of me that wants to say the answer is "a ton of luck", but I think a better expression is "several great opportunities and the willingness to seize them". The first of those opportunities did not require much deliberation as, after 3 weeks of job hunting, I was offered an amazing position with a DC based Drupal agency. The next opportunity though, came much quicker than I expected. My first hour of employment was spent at a sprint retro meeting with the client who's website I'd be spending the next 2 1/2 years building, and it was my willingness to seize _that_ opportunity that opened every other door.

> Miss the first entries of this series? Catch up with [Part 1](/blog/from-minimum-wage-to-senior-developer-part-1/) and [Part 2](/blog/from-minimum-wage-to-senior-developer-part-2/)

## 2014 100k/Year

It was a pinch of being in the right place at the right time, and a dash of knowing the right people, but a few weeks before I was let go, my next job was already set in motion around me. It all started when a DC based company called [Phase2](https://www.phase2technology.com/) bought a small Portland agency in order to start a branch in the middle of this growing tech scene. As it happened, I was good friends with one of the developers in that newly aquired team, and had been recording several of my [SassBites](https://www.youtube.com/watch?v=FC-1xSCBCIY) podcasts with his co-workers as the audience. So when they looked to expand their team at the start of 2014, I seemed to be a natural choice.

Typically at an agency of this type, a front-end developer like myself would be dropped into the latter half of a project and have around 6 weeks to take a stack of photoshop docs and turn them into a Drupal theme. This process would be rinsed and repeated until you either burn out, or get promoted to even more soul crushing work. Somehow I managed to avoid this cycle altogether and landed with one off the longest client engagements this company had ever seen. So there I was, day one of my employment at Phase2, and starting up my contract with [RedHat.com](http://www.redhat.com/). Little did I know that this would be day one out of 800 with the Red Fedoras.

## From Hired Help to Principal Developer 

I came into the RedHat project to help them launch a redesign of [RedHat.com](https://www.redhat.com). In the beginning, I was one of the dozens of Phase2 employees who worked on that codebase. But by the time the site launched in the fall, most of my co-workers had rolled off the project and I was the sole front-end developer on the project. I'm not sure if this meant I was Red Hat's most valuable front-end contractor, or Phase2's least valuable, but whatever the reason was, it opened up an amazing opportunity that I almost passed up.

Having established myself as a knowledgeable front-end developer, one of the principle PMs asked me how modular our front-end codebase was, and how hard it would be to share parts of our design with other teams. I informed him that all they'd need to do is import all of bootstrap CSS/JS, all of our CSS/JS, then they could pull in a single band of content from our site...that is as long as they didn't want to modify the contents of the band, in which case, they were on their own. I was certainly aware of how laughably 'un modular' our code base was and it seemed that this PM was probably confirming what he already knew, as the rest of the conversation went on like this.

Him: So what would it take to make our site more sharable?

Me: I'd literally have to rewrite each component with new HTML and CSS.

Him: Okay, how long will that take and when can you start?

Me: /jawdrop

Him: By the way, how many times have you done a project like this?

Me: After this one is done? One.

There has to be a first time for everything, and tackling a project of this scope and scale was not someting that I or my previous project, Martha Stewart was even ready for. On top of that, it wasn't until recently that the tooling and techniques necessary for this type of project had even come into the mainstream. 

Fortunately for me, he didn't mind that this __was__ my first rodeo, so after picking my jaw off the floor I got to work breaking down the site's design into a series of modular components. This was the start of a multi year process where I lead the creation of a new design system, new deployment and automation workflows, a custom prototyping environment using JSON Schemas, and a major effort to reinvent Drupal's authoring and rendering engines. 



## Next Up

This design system was my professional focus for the next couple of years, but it wasn't the only opportunities that crossed my path, nor was it all that I wanted to accomplish. The next phase of growth started when I was asked to speak at [2014's Sass Summit](http://environmentsforhumans.com/2014/sass-summit/), which happened to be sponsored by [O'Reilly Media](https://www.oreilly.com/). What happened next consumed my free time for the entire next year.