---
title: Responsive Angular
date: '2020-08-13T09:00:00.121Z'
published: false
cover: './domenico-loia-EhTcC9sYXsw-unsplash.jpg'
description: Ever since mobile devices became capable of accessing the web and showing web pages, it became obvious that not all web pages are usable on a small screen. Today most websites implement responsive design, but often at a cost of extra DOM. This post will show you how to solve that last step in Angular.
---
Mobile phones used to be simple devices used for phone calls, short messages and simple games. As network protocols and screens progressed, new devices were capable of showing webpages. However, due to limited screen real estate and controls they could only open pages written in [WML language](https://en.wikipedia.org/wiki/Wireless_Markup_Language) specially made for the [WAP protocol](https://en.wikipedia.org/wiki/Wireless_Application_Protocol). The iPhone was the first phone truly capable of opening HTML pages. Ever since mobile devices became capable of accessing the web and showing web pages, it became obvious that not all web pages could work on a small screen. The most obvious was the UI.

## Responsive web design

The early websites were build with the computer screen in mind. The images were big, the buttons were small. It looked nice on a big screen and was easy to click on using a mouse. But it was horror on a small screen. As a solution to this the responsive web design was born. Using [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) in CSS developers could now define styles that would be applied for different devices:

Take a look at the following CSS snippet:
```CSS
.myStyle {
  color: red;
}

@media screen and (max-width: 768px) {
  .myStyle {
    color: blue;
  }
}
@media screen and (orientation: landscape) {
  .myStyle {
    color: green;
  }
}
```

A DOM element having `myStyle` class would have red text. Unless the screen was smaller than 769px (typical mobile resolution), in which case it would be blue. Unless, the screen is in landscape mode (width greater than height), in which case it would be green.

Media query gives us the possibility to target various parameters including width and height (both with min and max prefixes), orientation, type of presentation (screen, reader, print), available colors, aspect ratio, resolution, availability of JavaScript parser etc.

## Mobile-first design

As computers and browsers became more capable, so did static websites became replaced by full-blown web applications. Those applications reminded more to desktop applications than websites. Changing bits and pieces to accommodate mobile devices was not enough anymore. The applications had to be redesigned from a scratch for smaller screens. 

That's how the `mobile-first approach` was born. In contrast to desktop-first, where web application simplified for the mobile view, we now had web applications that were developed with the mobile view in mind, and later enriched for the desktop view. This allowed developers to target special small screen limitations early on.

Due to different limitations of the screen estate and accessibility (minimal clickable area, higher contrast) it's not seldom that mobile view and desktop view look completely different.

Such large differences usually require big parts of DOM to be visually modified or hidden. This snippet is from a popular angular course website. As you can see, on the desktop (wide screen) view the navigation is horizontal with items inline aligned to right. On the mobile view, suddenly there are a bunch of styles that position navigation fixed, with fixed size and initially out of the screen. The inner list is vertically oriented. When the `opened` modifier class is applied, the navigation slides in from the left side. Additionally, you can see that some styles had to be overriden (`float`, `display`) for our magic to work.

```CSS
nav {
  display: block;
}
nav ul {
  float: right;
}
nav ul li {
  display: inline-block;
}
@media screen and (max-width: 768px) {
  nav {
    display: flex;
    position: fixed;
    z-index: 999;
    width: 73vw;
    height: 100%;
    background: #fff;
    top: 0;
    left: -100vw;
    float: none;
    transition: .25s ease-in-out;
  }
  nav ul {
    float: none;
    width: 100%;
  }
  nav ul li {
    display: block;
  }
  nav.opened {
    left: 0;
  }
}
```

The following example is from a popular angular UI component library.

```CSS
.main-header {
  display: grid;
  grid-template-columns: min-content min-content 1fr;
}
.main-nav {
  grid-column: span 2;
}
.secondary-nav {
  grid-row-start: 2;
  grid-column: 1/5;
}
.nav-item-1, 
.nav-item-2, 
.nav-item-3, 
.nav-item-4, 
.nav-item-5, 
.nav-item-6, 
.nav-item-7, 
.nav-item-8, 
.nav-item-9,
.nav-item-10, 
.nav-item-11 {
  display: none;
}
@media (min-width: 700px) {
  .main-header {
    grid-template-columns: min-content minmax(140px, 2fr) 0 minmax(100px, 350px);
  }
}
@media (min-width: 800px) {
  .main-nav {
    grid-column: auto;
  }
  .secondary-nav {
    grid-row: auto;
    grid-column: auto;
  }
  .secondary-nav .nav-item-1,
  .secondary-nav .nav-item-2,
  .secondary-nav .nav-item-3,
  .secondary-nav .nav-item-4,
  .secondary-nav .nav-item-5 {
    display: none;
  }
}
```