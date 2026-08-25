# MSBA Portfolio — Vanshika Srivastava

A personal portfolio site for Vanshika Srivastava — MSBA Candidate at the Rady School of
Management, UC San Diego, focused on **Business**, **Analytics**, and **AI Applications**.

Live sections: Hero, About, Experience, Skills, Projects (placeholders — case studies coming
soon), Education & Achievements, and Contact.

## Stack

Plain HTML / CSS / vanilla JS — no build step, no dependencies. Fonts are loaded from Google
Fonts (Fraunces for display type, Inter for body text).

```
index.html
css/style.css     — theme tokens (light + dark), layout, components
js/main.js        — scroll reveals, active-nav highlighting, theme toggle, hero word rotator,
                    copy-to-clipboard contact, mobile nav
assets/           — résumé PDF
```

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying with GitHub Pages

1. Push this repo to `main` (or your default branch).
2. In the repo settings, go to **Pages** → **Build and deployment** → Source: **Deploy from a
   branch** → Branch: `main` / `(root)`.
3. The site will publish at `https://vanshika1302.github.io/MSBA-Portfolio/`.

## Updating content

- **Résumé**: replace `assets/Vanshika_Srivastava_Resume.pdf` with an updated file (keep the
  same filename, or update the links in `index.html`).
- **Projects**: each project lives in a `.project-card` block inside the `#projects` section of
  `index.html` — duplicate a card and edit the tag, title, description, and status line as case
  studies are written up.
- **Colors**: all theme colors are CSS custom properties at the top of `css/style.css`
  (`:root` for light mode, `:root[data-theme="dark"]` / the dark media query for dark mode).
