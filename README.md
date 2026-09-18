# Tau Mafia Hubsite — Overview Page Prototype

Live Blade/PHP/SCSS/JS prototype of **Figma → Latest Designs → Overview Page**  
File: [WF-2026 - Tau Mafia Hubsite](https://www.figma.com/design/2Js8vBxRjLMLAQg4feEEXr/WF-2026---Tau-Mafia-Hubsite?node-id=3566-19444)

## Stack

- PHP + Blade-style views (Laravel-shaped layout)
- SCSS → compiled CSS
- Vanilla JS + GSAP (CDN)
- Figma assets under `public/assets/overview/`

## Run

```bash
npm install
npm run serve
```

Then open http://localhost:8080/

Requires portable PHP at `tools/php/php.exe` (downloaded into this project).

Or with PHP on PATH:

```bash
npm run build
php -S localhost:8080 -t public
```

## Structure

```
app/Http/Controllers/OverviewController.php
routes/web.php
resources/views/overview.blade.php
resources/views/components/*
resources/scss/overview.scss
resources/js/overview.js
public/index.php
```
