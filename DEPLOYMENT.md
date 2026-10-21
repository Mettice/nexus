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

Set `SITE_URL` to the final production domain when configuring canonical URLs and the sitemap. The catalog currently defaults to the original configured domain, https://nexus-distro.com.

Reference: https://vercel.com/docs/project-configuration/vercel-json
