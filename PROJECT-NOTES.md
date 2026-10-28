# Project review and launch notes

## Permanent domain

The owner selected **https://www.nexusdustribution.com/**. The build now uses this domain consistently for canonicals, structured data, social metadata, sitemap URLs and robots.txt. An explicit `SITE_URL` override applies consistently to all pages. Vercel domain/DNS connection and Search Console ownership verification must be completed in the owner's accounts. Existing contact mailboxes remain unchanged until a replacement is confirmed.

## Latest revision — 21 October

Removed generated category artwork and sourcing-example labels from the public site. Added fourteen Merkandi listing photos with private provenance in `product-photo-sources.json`. The owner confirmed purchasing through Merkandi; no public supplier partnership claims were added. The homepage now has a product-card hero, animated typography, a moving brand strip and a pinned scroll-controlled collection gallery. Mobile uses a vertical collection layout. Prices remain removed. `DESIGN-NOTES.md` describes the design and research sources.

## Current catalog-only update

The catalog has been expanded to 29 products/options, 8 categories and 11 brand pages (49 pages total). Fifteen new sourcing ranges use generated, labelled typography tiles instead of unrelated product photos. Detailed pack sizes, case quantities, origins and current availability are confirmed on enquiry. The sitemap includes all brand pages, and product pages link to their brand and category.

The site now focuses on products. Public prices and currency controls have been removed, including values in the browser data. The container planner, RFQ cart, invoices, Incoterms, strategic hubs, accreditations and supporting logistics sections have been removed. Product/category pages and similar-product links remain. Enquiries open email drafts; no message is sent automatically. The older improvement notes below describe the previous iteration where they conflict with this update.

The application is a dependency-free Node static server with a browser-side wholesale catalog and RFQ estimator. It has no inventory integration, customer accounts, payment processing, or email delivery service.

## Improvements

- New green and warm neutral visual palette, larger hero typography, category discovery cards, responsive product layouts, keyboard focus indicators and reduced-motion support.
- Four illustrative sourcing variants, two additional categories, dynamic counts, synchronized filters, clear filters and related products.
- Eight static category pages and fourteen static product pages with unique metadata, canonical URLs and structured data. The homepage catalog and category links remain accessible without JavaScript.
- Replaced fragment sitemap entries with actual pages; removed language alternate tags for translations that do not exist. Structured data no longer asserts unverified certifications, stock or fixed future price validity.
- Contact enquiries open a populated email draft instead of reporting an unsent message as delivered. RFQ additions respect MOQ, and generated container mixes fill the selected pallet capacity.
- Static server restricts file access to public assets and pages and supports directory indexes and HEAD requests.

## Local use

Run `npm run build` after catalog changes, then `npm start`. The default address is http://localhost:4180. Run `node verify.cjs` while the server is running to check generated pages, metadata, JSON-LD and internal URLs.

## Before launch

- Confirm the production domain (https://www.nexusdustribution.com). `SITE_URL` controls generated page URLs and the sitemap.
- Confirm existing company identity, contact information, brand relationships, logistics claims, certifications, product specifications, prices and stock. Existing commercial content has not been independently verified.
- New variants explicitly use product-family reference images and are sourcing examples; replace them with verified specifications and correct photography before treating them as stock.
- The form requires an email application. Connect a real mail service if server-side delivery is needed. RFQ state currently lasts for the browser session only and currency conversion uses fixed illustrative rates.
- Deploy the generated category and product directories alongside the homepage, CSS, JavaScript and assets. Configure the public host, HTTPS and domain, then submit `/sitemap.xml` through Search Console. Local preparation does not submit the site or guarantee indexing/rankings.

Reference: https://developers.google.com/search/docs/specialty/international/localized-versions
