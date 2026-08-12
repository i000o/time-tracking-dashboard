# Time Tracking Dashboard

[Live Site URL](https://i000o.github.io/time-tracking-dashboard/)  
![Outcome](/images/mobile-screenshot.png)

---

## Table of contents

- [Purpose & Scope](#purpose-and-scope)
- [Decisions](#decisions)
- [Debugging](#debugging)
- [Future](#future)

---

## Purpose & Scope.

A dashboard that reports a user's tracked hours across categories (Work, Play, Social, etc.), switchable between Daily, Weekly, and Monthly views. The design brief belongs to [Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Its features include:

- Fetches category and timeframe data from local JSON and renders it into a set of cards.
- A single set of Daily/Weekly/Monthly controls updates every card simultaneously, showing current and previous period values.
- Defaults to the Daily view on page load, with the corresponding control shown in an active state.

`#javascript` `#tailwind` `#vite`

---

## Decisions

**One shared handler instead of per-element branches**  
A single function reads the clicked element's `data-path` attribute to determine which value to pull from the fetched data object, and matches it against each card's own `data-path`. One function handles every button/card combination without repeating conditionals for every element.

**Considered `data-*` attributes to abstract the current/previous spans, decided against it**  
Both spans always render together, so not necessary in this iteration. Could change if future if a feature was built to compare current/previous values.

**Opted for plain buttons over radio inputs with `:checked`**  
The daily/weekly/monthly control is a single-select group, which `:checked` is built for and would have removed the need for manual class toggling. Went with plain buttons instead, since the rendering logic depends on reading `data-path` off the clicked element, and it wasn't clear this would carry over as cleanly onto radio/label markup.

**Extra listener to populate the default Daily view on load**  
Added a listener that fires a real click on the Daily button once data has loaded.

---

## Debugging

**Used `forEach()` on the button listener**  
`querySelectorAll` returns a NodeList, which listeners can't be attached to directly — used `.forEach()` on it to attach a listener to each individual button.

**Active class not visually updating despite toggling correctly**  
The `active` class was only applied while the click handler ran, not persisted afterward. Targeted the state from within the function, applying it to the `<h3>` rather than the button, since that's where the visible content lives. This led me to consider the use of radio buttons in a future PR potentially, as mentioned earlier.

**Programmatic click silently doing nothing**  
Had an extra `showHours(hours)` call inside the async data-fetch function, which was undefined and threw an unhandled rejection, blocking execution of the `.click()` call further down. Removed it — the function wasn't needed since rendering is already handled by `updateDisplay`.

---

## Future

- Compare current and previous values directly (e.g. swap in "Same as last week" when they're equal).
