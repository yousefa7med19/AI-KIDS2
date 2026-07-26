# AI Kids Website Source

This folder is the maintained source package for the AI Kids website. It was initialized from `ai-kids-homepage-standalone.html`.

## Run the website

For reliable links, do not open the files through an XML preview. Start a local server from this folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Main pages

- `index.html` — responsive Home Page 3.
- `pages/courses.html` — responsive course catalog with demo-video placeholders.
- `pages/login.html` — login interface linked from the home navigation.
- `pages/signup.html` — registration interface linked from the home CTA, age paths, and pricing plans.
- `ai-kids-homepage-standalone.html` — unchanged original reference file.

## Update rule

Every new website requirement should be:
1. Added to the correct source file or page.
2. Linked from `index.html` when it belongs in the main visitor journey.
3. Tested on desktop, tablet, and mobile.
4. Recorded in `docs/CHANGELOG.md`.
5. Reflected in `docs/ROUTES.md` when a route or navigation link changes.

## Backend note

The login and signup forms currently demonstrate front-end behavior only. Authentication, databases, payments, email verification, and parent dashboards require backend services.


## Courses backend integration

The courses page currently uses sample front-end data. Replace the static card data with API responses when the backend is ready. Demo video buttons intentionally open placeholders; administrators will later upload and publish videos from the control panel.

- `pages/global-thinkers.html` — responsive course lesson/progress template linked from course Continue buttons.

- `pages/games.html` — responsive game library with demo game actions and backend-ready placeholders.

- `pages/habit-builder.html` — responsive daily Habit Builder with streaks, rewards and backend-ready progress placeholders.

- `pages/parents.html` — responsive parent information and dashboard-preview page with backend-ready reporting placeholders.
