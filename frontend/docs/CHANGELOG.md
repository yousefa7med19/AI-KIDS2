# Changelog

## 2026-07-15 — Source package initialized

- Converted the standalone home page into a modular source structure.
- Extracted CSS to `assets/css/styles.css`.
- Extracted JavaScript to `assets/js/main.js`.
- Preserved the original standalone HTML as a reference.
- Linked the Home Page Login button to `pages/login.html`.
- Added `pages/signup.html`.
- Linked age paths and pricing plans to signup with query parameters.
- Added documentation for routes, components, and folder responsibilities.


## 2026-07-15 — Courses catalog added

- Added `pages/courses.html` based on the approved courses design.
- Added responsive age and category filters, sorting, favorites, progress and course actions.
- Added demo-video modal placeholders. Actual videos will be uploaded later through the backend control panel.
- Added `assets/css/courses.css` and `assets/js/courses.js`.
- Linked the home-page Courses navigation item to the new courses page.
- Saved the supplied visual reference in `assets/images/courses-design-reference.png`.

## 2026-07-15 — Course detail and Continue flow
- Added `pages/global-thinkers.html` from the approved course-detail template.
- Linked Courses page Start/Continue controls to the course detail page.
- Added responsive lesson list, tabs, progress, favorites, certificate panel and demo-video modal.
- Documented that final videos will be uploaded and managed through the backend/admin control panel.

## 2026-07-15 — Games page added
- Added responsive `pages/games.html`, `assets/css/games.css`, and `assets/js/games.js`.
- Added filters, search, sorting, favorites, load more, player stats, daily bonus and demo game modal.
- Linked Games from the Home, Courses and Course Detail pages.
- Final game builds, scores, XP, coins and analytics will connect to the backend/admin panel.

## 2026-07-15 — Habit Builder page added

- Added `pages/habit-builder.html` based on the approved Habit Tracker design.
- Added responsive `assets/css/habit-builder.css` and interactive `assets/js/habit-builder.js`.
- Added daily habit toggles, points, coins, progress summary, streak calendar, badges and parent guidance.
- Added a front-end Customize Habits demo.
- Linked Habit Builder from Home, Courses, Course Detail and Games navigation.
- Saved the approved design as `assets/images/habit-builder-design-reference.png`.
- Permanent habits, streak history, points, badges and parent customization remain backend/admin-control-panel integrations.

## 2026-07-15 — Parents page added

- Added `pages/parents.html` based on the approved Parents design.
- Added responsive `assets/css/parents.css` and interactive `assets/js/parents.js`.
- Added parent-focused hero, trust indicators, progress preview, vision, goals and trust cards.
- Added a Parent Dashboard preview modal and language-selector placeholder.
- Linked Parents navigation from Home, Courses, Course Detail, Games and Habit Builder pages.
- Saved the approved design as `assets/images/parents-design-reference.png`.
- Live child reports, recommendations, notifications and account data remain backend/parent-control-panel integrations.
