# Source Folder Structure

```text
ai-kids-website-source/
├── index.html
├── ai-kids-homepage-standalone.html
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── README.md
├── pages/
│   ├── login.html
│   └── signup.html
└── docs/
    ├── CHANGELOG.md
    ├── COMPONENTS.md
    ├── ROUTES.md
    └── SOURCE-STRUCTURE.md
```

## Folder responsibilities

- `assets/css/`: global design system, responsive layout, sections, cards, buttons, and breakpoints.
- `assets/js/`: mobile menu, notifications, age selection, pricing toggle, and habit interactions.
- `assets/images/`: future exported image assets. The initial source still contains embedded image data in CSS.
- `pages/`: secondary visitor-facing pages.
- `docs/`: project decisions, routes, components, and update history.

## Naming rules

- Use lowercase kebab-case for filenames.
- Keep shared styles in `assets/css/styles.css`.
- Keep shared interactions in `assets/js/main.js`.
- Use relative links so the package works on standard static hosting.

### Course detail files
- `pages/global-thinkers.html`
- `assets/css/course-detail.css`
- `assets/js/course-detail.js`
- `assets/images/course-detail-design-reference.png`

### Games files
- `pages/games.html`
- `assets/css/games.css`
- `assets/js/games.js`
- `assets/images/games-design-reference.png`

### Habit Builder files

- `pages/habit-builder.html`
- `assets/css/habit-builder.css`
- `assets/js/habit-builder.js`
- `assets/images/habit-builder-design-reference.png`

### Parents page files

- `pages/parents.html`
- `assets/css/parents.css`
- `assets/js/parents.js`
- `assets/images/parents-design-reference.png`
