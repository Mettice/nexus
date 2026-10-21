# Deploying Nexus on Vercel

The repository contains a static website and a small Node server used for local previews. Vercel must publish the static build output rather than run the local preview server.

`vercel.json` sets the framework to **Other**, runs `npm run build`, publishes **dist**, and keeps trailing slashes on directory pages. The build includes all 49 pages, stylesheets, browser scripts, images, sitemap, robots file and manifest. Server code, private source records and project notes are excluded from that output.

## Publish the fix

Commit and push the updated files, including `vercel.json`, `build.cjs`, `package.json` and `.gitignore`. The connected Vercel project should rebuild automatically. If automatic deployments are disabled, redeploy the latest commit from Vercel.

The project root must be the repository root. Remove any old custom routing configuration that sends asset requests to `server.js`; the repository configuration uses static hosting and requires no catch-all rewrite.

## Verify the exact output locally

```powershell
npm run build
$env:PORT = '4182'
npm run preview
```

In another terminal:

```powershell
$env:PORT = '4182'
node verify.cjs
```

This checks all pages and their relative and absolute asset URLs, including CSS and JavaScript content types. Open http://localhost:4182/ to inspect the build.

## Production smoke checks

These paths must return 200 after deployment:

- `/css/styles.css` (Content-Type: text/css)
- `/css/motion-design.css`
- `/js/catalog.js`
- `/assets/kinder_bueno.jpg`
- `/products/kitkat/`

The permanent domain is **https://www.nexusdustribution.com/**. It is the build default for all canonical URLs, structured data, social URLs, robots.txt and the sitemap. Remove any outdated `SITE_URL` environment variable in Vercel or set it to `https://www.nexusdustribution.com`.

Add `www.nexusdustribution.com` to the Vercel project's Domains settings and apply the DNS records Vercel shows. Add the non-www domain as a redirect to the www domain. After deployment, verify that the canonical URL on both the homepage and product pages uses the permanent domain, then submit `https://www.nexusdustribution.com/sitemap.xml` in Google Search Console.

Checked on 21 October 2026: the www domain serves the site, and the non-www domain returns a 308 redirect to www. Domain connection is already working; the pending step is deploying the updated SEO URLs.

Contact email addresses were not changed: a website domain does not establish that a mailbox exists.

Reference: https://vercel.com/docs/project-configuration/vercel-json
