# Gather — Event Discovery

A responsive event discovery and registration website built with HTML, CSS, and vanilla JavaScript.

## Run locally

On Windows, double-click `preview.bat`. It starts a local preview and opens it in your default browser. Close the server window when you are finished.

Or open `index.html` directly, or start a local server from this folder:

```sh
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Features

- Search events by title, category, venue, date, and description.
- Filter events by Music, Art & Culture, Food, and Outdoors.
- Open event details and save favorites.
- Register with name, email, and optional phone validation.
- Store registrations, favorites, newsletter signup, and theme choice in browser local storage.
- Responsive layouts, mobile navigation, and light/dark themes.

## Notes

This is a front-end demo. Event data is sample content for Bengaluru. Event registrations and newsletter signups are stored only in the current browser; they do not contact organizers or add people to an external mailing list. The site uses remote Unsplash photos and Google Fonts when internet access is available; CSS colors and system fonts provide fallbacks.
