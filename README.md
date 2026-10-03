# Shamsear Ebrahim · Portfolio

Personal site of Shamsear Ebrahim, full-stack engineer in Doha, Qatar.
Live at [shamseare.vercel.app](https://shamseare.vercel.app/).

## Stack

Static HTML, one CSS file and two small ES modules. No build step and no framework.

```
index.html               page markup (hero, work, method, index, experience, contact)
assets/css/styles.css    design tokens and all styles
assets/js/app.js         behaviour: nav, scroll spy, filters, case study dialog, contact form
assets/js/projects.js    case study content for all projects (single source of truth)
assets/images/work/      optimized WebP project screenshots
```

## Editing content

- **Case studies:** edit `assets/js/projects.js`. Each entry has `summary`, `context`, `built`, `hard`, `outcome`, `stack`, `live`, `repo`, `image`, `alt`.
- **Tiles and index rows:** edit `index.html`. Every `data-case="slug"` must match a key in `projects.js`.
- **Deep links:** `/#work/<slug>` opens a case study directly, for example `/#work/ssleague`.
- **Copy rules:** plain language, real numbers only, no em or en dashes, no emojis.

## Run locally

```
npx serve .
```

ES modules need an HTTP server, so opening `index.html` from the file system will not load the scripts.

## Contact form

Sent with EmailJS (loaded only when someone focuses the form). Service and template IDs live at the top of `assets/js/app.js`. In the EmailJS dashboard, restrict the public key to the production domain.

## Contact

- Email: shamsear@gmail.com
- GitHub: [github.com/Shamsear](https://github.com/Shamsear)
- LinkedIn: [linkedin.com/in/shamsear](https://www.linkedin.com/in/shamsear/)