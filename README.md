# Ritu Raj — Portfolio

Computer Science Graduate / Software Engineer.

Live site: https://rituhx.github.io/Ritu-Raj-Portfolio/

## How to run

This site loads HTML components with `fetch`, so it needs a local server (opening `index.html` as a file will fail).

```bash
python -m http.server 5500
```

Then open http://localhost:5500

## Edit content (single source of truth)

| What to change | File |
| --- | --- |
| Name, role, contact, resume path, photo | `data/profile.js` |
| Projects | `data/projects.js` |
| Experience / education | `data/experience.js` |
| Skills | `data/skills.js` |
| Certifications | `data/certifications.js` |
| Graduation photos | `data/graduation.js` and `assets/images/graduation/01.jpg`–`50.jpg` |

Theme tokens (colors, radius, fonts) live in `css/variables.css`.

Replace graduation photographs by swapping files in `assets/images/graduation/` while keeping the same names (`01.jpg` … `50.jpg`).

## Contact

The contact form still posts to FormSubmit (`https://formsubmit.co/ritu2903raj@gmail.com`). Do not remove that endpoint unless you intentionally change providers.
