---
title: Parsing ISO 8601 duration
date: '2020-07-10T09:00:00.121Z'
published: true
tags: ISO 8601, Duration, Regex
cover: 'nick-hillier-yD5rv8_WzxA-unsplash.jpg'
coverInfo: "Cover photo by <a href='https://unsplash.com/@nhillier' target='_blank'>Nick Hillier</a> on Unsplash"
description: One of the lesser-known parts of the ISO 8601 standard is the duration specification. In this post we will learn how to parse it and construct a simple Angular pipe for template automation.
---

ISO 8601 is the international standard document covering date and time-related data. It is commonly used
to represent dates and times in code
(e.g. [Date.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)). There is one less known specification in this standard related to duration.

## What is duration standard?

Duration defines the interval in time and is represented by the following format:

```
P{n}Y{n}M{n}W{n}DT{n}H{n}M{n}S
```

Letters P and T represent, respectively, makers for period and time blocks. The capitals letters Y, M, W, D, H, M, S represent the segments in order:
years, months, weeks, days, hours, minutes, and seconds. The `{n}` represents a number. Each of the duration
segments are optional.

The following are all valid durations:

```
P3Y - 3 years
P24W6D - 24 weeks, 6 days
P5MT7M - 5 months, 7 minutes
PT3H5S - 3 hours, 5 seconds
```

## Human-readable format

Using the specification it's easy to implement a parser that would parse ISO standard into human-readable form.
First, we need the regex that would extract the necessary segments:

```jsregexp
/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
```

Let's dissect this regex to understand what it does:

- First character `P` matches P literally
- Group `(?:(\d+)Y)?` is **non-capturing** group (due to `?:` modifier)
  - The group can 0 or 1 appearances (due to `?` at the end)
  - The inner part `(\d+)Y` matches 1 to many digits followed by `Y`
  - The digits part `(\d+)` is a capturing group (due to surrounding brackets)
- Same logic applies for `(?:(\d+)M)?`, `(?:(\d+)W)?` and `(?:(\d+)D)?`
- Group `(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?` is also **non-capturing** group
  - Group starts with `T` literal
  - The group is optional (due to `?` at the end)
  - Group consist on sub-groups `(?:(\d+)H)?`, `(?:(\d+)M)?` and `(?:(\d+)S)?` to which the above mentioned logic applies

If we run this regex on an arbitrary string it will try to match `P` at the beginning and then extract numbers for
years, months, weeks, days, hours, minutes, and seconds. For those that are not available, it will return undefined.
We can use array destructuring in ES6 to extract those values:

```typescript
const REGEX = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;

function parseDuration(input: string) {
  const [, years, months, weeks, days, hours, minutes, secs] = input.match(
    REGEX
  );

  // combine the values into output
}
```

We can use those values to export something like `3 years 5 days 23:11:05`. We will first
create an array of parsed segments:

```
  [3, undefined, undefined, 5, 23, 11, 5] -> ['3 years', '5 days', '23:11:05']
```

And then simply flatten/join the array using whitespace. Parsing time has an additional logic:

- we return the time segment only if at least one of hours, minutes or seconds is specified (and different than 0)
- we map every time subsection into two digits signature

Here is the full parser function:

```typescript
const REGEX = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;

export function parseDuration(input: string) {
  const [, years, months, weeks, days, hours, mins, secs] =
    input.match(REGEX) || [];

  return [
    ...(years ? [`${years} years`] : []),
    ...(months ? [`${months} months`] : []),
    ...(weeks ? [`${weeks} weeks`] : []),
    ...(days ? [`${days} days`] : []),
    ...(hours || mins || secs
      ? [
          [hours || '00', mins || '00', secs || '00']
            .map((num) => (num.length < 2 ? `0${num}` : num))
            .join(':'),
        ]
      : []),
  ].join(' ');
}

// usage
parseDuration('P2Y'); // -> 2 years
parseDuration('PT12H34M'); // -> 12:34:00
parseDuration('P4WT5M'); // -> 4 weeks 00:05:00
```

## Extra: Angular Pipe

Wrapping the above function into an angular pipe is straight forward:

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { parseDuration } from './parse-duration'; // our parser function

@Pipe({
  name: 'duration',
  pure: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    return parseDuration(value);
  }
}
```

We can now use our pipe in the template:

```html
{{ input | duration }}
```

---

Understanding the structure of the ISO 8601 standard allowed us to easily parse the segments and then construct the
mapper that would map the segments into a desired format. With minimal changes, it's easy to construct
a parser that would map duration into different output string or add localization and internationalization.
