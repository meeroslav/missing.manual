### 2015 Update

Chrome 35+ and Firefox 41+ implement the **CSS font loading API** ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSSFontLoading_API), [W3C](http://www.w3.org/TR/css-font-loading/)). Call `document.fonts` to get a [FontFaceSet](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet) object, which has a few useful APIs for detecting the load status of fonts:

* [`check(fontSpec)`](https://drafts.csswg.org/css-font-loading/#font-face-set-check) - returns whether all fonts in the given font list have been loaded and are available. The `fontSpec` uses the [CSS shorthand syntax for fonts](https://stackoverflow.com/questions/4218549/one-css-declaration-for-all-css-font-properties).<br/>Example: `document.fonts.check('bold 16px Roboto');  // true or false`
* [`document.fonts.ready`](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready) - returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) indicating that font loading and layout operations are done.<br/>Example: `document.fonts.ready.then(function () { /*... all fonts loaded...*/ });`

Here's a snippet showing these APIs, plus `document.fonts.onloadingdone`, which offers extra information about the font faces.

```js
alert('Roboto loaded? ' + document.fonts.check('1em Roboto'));  // false

document.fonts.ready.then(function () {
  alert('All fonts in use by visible text have loaded.');
   alert('Roboto loaded? ' + document.fonts.check('1em Roboto'));  // true
});

document.fonts.onloadingdone = function (fontFaceSetEvent) {
   alert('onloadingdone we have ' + fontFaceSetEvent.fontfaces.length + ' font faces loaded');
};
```

```html
<link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
<p style="font-family: Roboto">
  We need some text using the font, for the font to be loaded.
  So far one font face was loaded.
  Let's add some <strong>strong</strong> text to trigger loading the second one,
        with weight: 700.
</p>
```

IE 11 doesn't support the API. Look at available polyfills or support libraries  if you need to support IE:

* [Web Font Loader](https://github.com/typekit/webfontloader#readme) - developed by Google and Adobe
* [FontFaceOnload](https://github.com/zachleat/fontfaceonload) - lighter, similar approach to Web Font Loader
* [FontLoader](https://github.com/bramstein/fontloader) - polyfill
