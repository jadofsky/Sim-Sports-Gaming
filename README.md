# SSG ESPN-Style (Animated)

This is a static ESPN-style landing page for SimSportsGaming using SSG colors.

## Structure
- `index.html` — Home with scores bar, hero, sticky nav, feeds, and league cards
- `apply.html` — Application hub with anchors for each league
- `league-*.html` — Placeholders for each league
- `sliders-*.html` — Placeholders for sliders & apps
- `styles.css` — Theme (navy/gold), animations, responsive grid
- `ssg.js` — Dropdown logic + scores note refresh
- `assets/` — `ssg-logo.png`, `favicon.png`

## Embeds
- **Scores:** Replace the top strip with an actual StatsPlus embed or keep as a link.
- **Discord Headlines:** Enable Discord Server Widget and paste the iframe in `index.html` replacing the placeholder card.
- **YouTube:** The channel uploads playlist is embedded; you can swap this for direct video IDs or a YouTube Data API list.

## GitHub Pages
1. Create a new repo (e.g., `ssg-modern-site`).
2. Upload these files (or drag-and-drop the ZIP).
3. In Settings → Pages, choose **Deploy from branch**, branch `main`, folder `/root`.
4. Visit the URL GitHub provides.

## WordPress.com
- Add a new page → insert a **Custom HTML** block.
- Paste the contents of `index.html`. For CSS and JS, either:
  - Add a **Code Snippet** plugin (if available) and enqueue files, or
  - Inline the CSS/JS into the page (quickest), or
  - Use the **Additional CSS** panel (Appearance → Editor → Styles → 3-dots → Additional CSS).
- Replace placeholders with your live embeds.

## Colors
- Navy: `#0e2740`
- Navy 2: `#1a3a5f`
- Gold: `#c6a664`
- Background: `#f5f7fb`
