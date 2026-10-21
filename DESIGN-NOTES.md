# Editorial catalog redesign

## 21 October revision

The site now uses a product-led motion design. The generated category artwork and sourcing-example disclaimers have been removed from the public site. Fourteen new product photographs were retrieved from public Merkandi listings; `product-photo-sources.json` records each listing, image URL and retrieval date. The supplier relationship comes from the owner; it is not presented as a public partnership or stock verification claim. Oreo Mini retains a neutral text tile because its listing did not provide a usable product photograph.

Motion now includes masked hero typography, a three-product parallax shelf, a continuously moving brand strip, a pinned collection gallery whose horizontal position is controlled by scrolling, collection step buttons, image parallax, card reveals, reading progress and back-to-top. Mobile and reduced-motion layouts show the collection as ordinary vertical content. The gallery remains readable without JavaScript.

Additional research:
- https://scroll-driven-animations.style/ — scroll-linked galleries, parallax and image reveals.
- https://github.com/Kafoor-Nimas/gsap-awwwards-website — beverage-oriented motion design and hero composition.

The notes below document the superseded artwork iteration.

The design uses the subject matter—chocolate, coffee and snacks—as its main visual focus. Large food photography anchors the homepage, with dark green navigation, olive accents, warm backgrounds, Manrope headings and DM Sans body copy. The catalog remains the primary destination. There are no public prices or container-planning controls.

## Research

- Pinterest wholesale-layout reference: https://in.pinterest.com/pin/wholesale-website-design-for-marketplace-and-retail--251146116717247460/ (discovered in search; direct access returned 403).
- Pinterest food-distribution reference: https://in.pinterest.com/pin/create-an-ecommerce-website-for-a-food-service-supply-distributor-web-page-design-contest-designwebpagesimpleen--611856299365260791/
- GitHub storefront patterns: https://github.com/elfahl52/ecommerce-Js
- Frontend design skill reviewed and applied as design guidance: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md

No third-party template or executable was installed. The implementation stays in the existing static Node/JavaScript project.

## Motion and accessibility

IntersectionObserver reveals catalog cards and editorial sections as they enter the viewport. A passive, requestAnimationFrame-throttled listener drives the reading-progress bar, navigation shadow and back-to-top control. Hover treatments respond to user interaction. Reduced-motion preferences disable the reveals and smooth scrolling. Content is visible when JavaScript is unavailable.

## Product content

All 29 product pages include an expanded product story, suggested retail uses and enquiry guidance. The 15 new ranges have individual editorial descriptions. Exact market-specific specifications, ingredients, allergens, pack configurations and availability require confirmation rather than invented values.

## Generated artwork

Created with the built-in image generation tool. PNG originals are preserved in `assets`; WebP copies are used on the site (approximately 149–254 KB each). Images are generic category/lifestyle artwork, not verified photographs of specific branded products. New range pages and cards identify this distinction.

### Confectionery prompt

Use case: ads-marketing. Create one premium photorealistic editorial food photograph for a European wholesale confectionery website hero, landscape 1536x1024. Art-directed still life on warm pale butter yellow studio background with a rich forest green plinth: layered chocolate wafer fingers, broken milk chocolate showing crisp wafer layers, golden foil wrapped chocolate pralines, hazelnuts, a few cream filled cocoa sandwich biscuits, one soft ivory paper snack pouch with no label. Beautiful realistic food textures, elegant sculptural arrangement in right two thirds, sunlight from upper left casting long deliberate shadows, sophisticated contemporary food magazine aesthetic, medium camera angle not top down, a few crumbs but tidy. Warm cocoa, cream, pistachio and dark green tones. No text, no logos, no watermarks, no invented packaging labels. This is generic category/lifestyle artwork, not a photograph of branded products.

### Coffee prompt

Use case: photorealistic-natural. A premium editorial coffee and breakfast still life for a wholesale food website, landscape 1536x1024. Warm ivory and terracotta surfaces, cup of espresso with rich crema, glossy roasted coffee beans tumbling from a plain unbranded kraft bag, a glass jar of chocolate hazelnut spread with no label, golden breakfast biscuits on a small ceramic plate, elegant linen napkin. Sculptural studio composition, elevated contemporary food magazine photography, warm morning sun and long shadows, tactile beautiful real food, earthy cream, chocolate, rust and olive palette. No text, no logos, no invented branded packaging, no watermark. Generic lifestyle category artwork, not specific product photography.

### Snacks prompt

Use case: photorealistic-natural. Landscape 1536x1024 editorial studio food photo for a premium wholesale savoury snack category. Curved golden potato crisps stacked in a small sculptural pile and spilling from an unlabelled cream cylindrical paper snack can, terracotta ceramic bowl of crisps dusted with paprika, a small dish of white creamy dip with chives. Warm burnt-orange and pale apricot background with strong soft sunlight and long shadows, elegant contemporary food magazine styling, tactile real textures, clean composition, appetizing but restrained. No chocolate, no sweets, no text, no brands, no logos, no watermark. Generic category lifestyle artwork, not exact product photography.
