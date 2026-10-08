# Nob End Run Club website

Static site (plain HTML/CSS/JS, no build step) hosted on Netlify, auto-deployed from GitHub.

## Weekly update (from your phone)
1. GitHub app or github.com → this repo → `data/runs.json` → ✏️ edit
2. Change day / date / time / title / where / map for this week's runs
3. Commit → Netlify redeploys in ~30 seconds

## Swap in real photos
Upload photos into `images/` with **exactly these names** (overwrite the placeholders):

| File | Where it shows | Ideal size |
|---|---|---|
| hero.jpg | Big homepage banner | 1800×1000 landscape |
| group.jpg | "Never run with a club?" section | 800×600 |
| about.jpg | About page | 800×600 |
| gallery-1.jpg … gallery-5.jpg | Homepage gallery (1 = big tile) | 800×800 square |
| og.jpg | Preview image when the link is shared on Facebook/WhatsApp | 1200×630 |
| logo.png | Google/schema logo | 512×512 |

Keep each under ~400 KB (squoosh.app shrinks them).

## Add Instagram / Strava
Search all files for `class="social"` and copy the Facebook link line, changing the URL and label. Also add the URL to the `"sameAs"` list in the JSON-LD block at the top of each page.

## Join form
Sign-ups land in Netlify → Project → **Forms → join**. Add an email notification under Forms → Form notifications.

## Custom domain (123Reg)
Netlify → Domain management → Add domain (e.g. nobendrunclub.co.uk). In 123Reg DNS set:
- `A` record `@` → `75.2.60.5`
- `CNAME` `www` → `nob-end-run-club.netlify.app`
Then find/replace `https://nob-end-run-club.netlify.app` with the new domain across all files (canonical tags, schema, sitemap, robots, llms.txt).

## SEO checklist after launch
- Google Search Console: add the site, submit `/sitemap.xml`
- Bing Webmaster Tools: import from Search Console
- Create a **Google Business Profile** (category "Running club" / "Sports club") — biggest local-search win
- Link the website from the Facebook page "About" section
