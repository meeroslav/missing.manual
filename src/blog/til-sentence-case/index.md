---
title: Today I learned - Sentence case in CSS
date: "2020-06-26T09:00:00.121Z"
published: true
cover: "./patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
coverInfo: "Cover photo by <a href='https://unsplash.com/@impatrickt' target='_blank'>Patrick Tomasso</a> on Unsplash"
description: CSS provides an amazing toolset for style manipulation, but when it comes to text manipulation you often need to resort to JavaScript for additional help. However, CSS has many tricks up his sleeve you might not be aware of.
---

**CSS** provides an amazing toolset for style manipulation, but when it comes to text manipulation you often need
to resort to JavaScript for additional help. However, CSS has many tricks up his sleeve you might not be aware of.

One thing that can be irritating is when backend API (over which you might not have full control) responds with
different casing than expected. It might not even be your backend's fault - perhaps the user forgot
to switch off **caps lock** before submitting that message.

CSS has two builtin options to change the case:
* text-transform: lowercase
* text-transform: uppercase
But what if we need to change the casing to **sentence case** (first letter uppercase, rest lowercase).
Turns out, CSS provides `pseudo selectors` that can target the first letter.

```css
.sentence-case {
  text-transform: lowercase;
}
.sentence-case::first-letter {
  text-transform: uppercase;
}
```

Which renders this:

```html
<p>THIS TEXT IS ALL CAPITAL</p>
<p>this one is all lowercase</p>
<p>aNd THiS oNE iS MIXeD</p>
```

Into this:

```html
This text is all capital
This one is all lowercase
And this one is mixed
```

One important thing to know is that `first-letter` pseudo selector **ONLY** works on block elements (p, div, li, etc.).
If you need to use it on inline elements (e.g. span, b) you will have to set `display: inline-block`:

```css
span.sentence-case {
  display: inline-block;
}
```
