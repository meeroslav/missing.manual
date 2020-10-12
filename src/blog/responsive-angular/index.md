---
title: Responsive Angular Components
date: '2020-08-13T09:00:00.121Z'
published: false
tags: Angular, Responsive design, Media Query
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

The following example is from a popular web tutorials website. On the page we have two menus: `main-nav` and `secondary-nav`. Both of them contain the same 11 navigation items. The page uses the grid to position the items and menus. This is an obvious example of the mobile-first approach. While all the menu items are hidden in the main menu, in secondary navigation (which is toggled with the burger-like button), all navigation items are visible.

However, once we pass the 800px limit suddenly the first five items in the main menu are shown, while the first five items in the secondary menu are always hidden.

```CSS
.main-header {
  display: grid;
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
.main-nav {
  /* some grid relevant styles */
}
.secondary-nav {
  display: none;
}
.show-secondary .secondary-nav {
  display: flex;
}
.secondary-nav .nav-item-1, 
.secondary-nav .nav-item-2, 
.secondary-nav .nav-item-3, 
.secondary-nav .nav-item-4, 
.secondary-nav .nav-item-5, 
.secondary-nav .nav-item-6, 
.secondary-nav .nav-item-7, 
.secondary-nav .nav-item-8, 
.secondary-nav .nav-item-9,
.secondary-nav .nav-item-10, 
.secondary-nav .nav-item-11 {
  display: flex;
}
@media (min-width: 800px) {
  .nav-item-1, 
  .nav-item-2, 
  .nav-item-3, 
  .nav-item-4, 
  .nav-item-5 {
    display: flex;
  }
  .main-nav {
    /* some grid relevant styles */
  }
  .show-secondary .secondary-nav {
    display: block;
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

The splitting of the menus is allowing the website to play with shapes and positions and achieve more than the previous example which was only changing the rendering of the menu items. Unfortunately, the price was keeping duplicates in the DOM.

## Performance first

As the application grows the price of keeping elements in the DOM that are only visible on certain devices/resolutions can become too expensive. While images on the desktop are usually in the full quality, small screens require less pixels. Playing a video in the background of your webpage is a popular thing to do. But you wouldn't want to do this on the mobile for several reasons:
- Video would probably not be visible nicely
- Page scrolling which happens often on small screens would interfere with video
- It is an unnecessary impact on the battery and bandwidth

Not only do we want to change the looks of the UI to make it more accessible on the small devices, but we also want to remove some heavy elements. While desktop versions get opened mostly on stable networks, mobile versions get opened in situations where the internet connection might be weak or breaking. We want the user to have the same fast experience on mobile as they have on the desktop.

To achieve this, we need to be able to detect devices and remove/add DOM elements depending on the device.

## Meet `MediaQueryList` and `MediaQueryListener`

## Service driven approach

## Component and directive

## Conclusion