---
title: Parsing ISO 8601 duration 
date: "2020-07-10T09:00:00.121Z"
published: false
cover: "nick-hillier-yD5rv8_WzxA-unsplash.jpg"
description: In progress...
---
ISO 8601 is the international standard document covering date and time related data. It's commonly used 
in code to represent dates and times 
(e.g. [Date.toIsoString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)).   
There is one less known specification in this standard related to duration.

### What is duration standard

Duration defines the interval in time and is represented by following format:

```
P{n}Y{n}M{n}W{n}DT{n}H{n}M{n}S
```

The capitals letters Y, M, W, D, H, M, S represent the following in order: 
years, months, weeks, days, hours, minutes and seconds. The `{n}` represents a number. Each of the duration's
segments is optional. Letter T is used to separate date part of the interval from the time part.

The following are all valid durations:

```
P3Y - 3 years
P24W6D - 24 weeks, 6 days
P5MT7M - 5 months, 7 minutes
PT3H5S - 3 hours, 5 seconds
```

### Human readable form

Using the specification it's easy to implement parser that would parse ISO standard into human readable form.
First, we need the regex that would extract the necessary segments:

```jsregexp
/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
```

Let's dissect this regex to understand what it does: 
* First character `P` matches P literally
* Group `(?:(\d+)Y)?` is **non-capturing** group (due to `?:` modifier)
    * The group can 0 or 1 appearances (due to `?` at the end)
    * The inner part `(\d+)Y` matches 1 to many digits followed by `Y`
    * The digits part `(\d+)` is a capturing group (due to surrounding brackets)    
* Same logic applies for `(?:(\d+)M)?`, `(?:(\d+)W)?` and `(?:(\d+)D)?`
* Group `(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?` is also **non-capturing** group
    * Group starts with `T` literal
    * The group is optional (due to `?` at the end)
    * Group consist on sub-groups `(?:(\d+)H)?`, `(?:(\d+)M)?` and `(?:(\d+)S)?` to which the above mentioned logic applies
    
If we run this regex on arbitrary string it will try to match `P` at the beginning and then extract numbers for
years, months, weeks, days, hours, minutes and seconds. For those that are not available, it will return undefined.
We can use array destructuring in ES6 to extract those values:

```typescript
const REGEX = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;

function parseDuration(input: string) {
  const [, years, months, weeks, days, hours, minutes, secs ] = input.match(REGEX);

  // combine the values into output
}
```

We can use those values to export something like `3 years 5 days 23:11:05`. We will first 
create an array of parsed segments:

```
  [3, undefined, 12, undefined, 5, 13, undefined] -> ['3 years', '12 weeks', '05:13:00']
```

And then simply flatten the array with whitespace. Parsing time has an additional logic:
* we return time segment only if at least one of hours, minutes or seconds is specified
* we map every time part into two digits signature

Here is the full parser function:

```typescript
const REGEX = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;

function parseDuration(input: string) {
    const [, years, months, weeks, days, hours, mins, secs ] = input.match(REGEX) || [];

    return [
      ...years ? [`${years} years`] : [],
      ...months ? [`${months} months`] : [],
      ...weeks ? [`${weeks} weeks`] : [],
      ...days ? [`${days} days`] : [],
      ...(hours || mins || secs)
        ? [[hours || '00', mins || '00', secs || '00'].map(num => num.length < 2 ? `0${num}` : num).join(':')]
        : []
    ].join(' ');
}
```

Using the above logic it's easy to construct your own parser that would map duration into 
different output string or add localization and internationalization.