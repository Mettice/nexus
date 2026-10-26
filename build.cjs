const fs=require('fs'),vm=require('vm'),path=require('path');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync('js/data.js','utf8')+';this.catalog={PRODUCTS,CATEGORIES};',context);
vm.runInContext(fs.readFileSync('js/product-details.js','utf8'),context);
vm.runInContext(fs.readFileSync('js/product-photos.js','utf8'),context);
const {PRODUCTS,CATEGORIES,BRANDS}=vm.runInContext('({PRODUCTS,CATEGORIES,BRANDS})',context);
const origin=(process.env.SITE_URL||'https://www.nexusdustribution.com').replace(/\/$/,'');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const productUrl=p=>`/products/${p.id}/`;
const story=p=>`<section class="product-story" aria-label="Product description"><div><span class="eyebrow">THE PRODUCT / ${escape(p.categoryName)}</span><h2>${escape(p.storyTitle)}</h2>${p.fullDescription.map(t=>`<p>${escape(t)}</p>`).join('')}</div><div><h3>Where it fits</h3><ul>${p.bestFor.map(t=>`<li>${escape(t)}</li>`).join('')}</ul><h3>Make your enquiry specific</h3><ul>${p.enquiryChecklist.map(t=>`<li>${escape(t)}</li>`).join('')}</ul><p>For ingredient, allergen, nutrition and storage information, request the label and specification for the exact product format.</p></div></section>`;
const card=p=>`<article class="detail-card"><a href="${productUrl(p)}"><img src="/${p.image}" alt="${escape(p.name)}" width="300" height="200" loading="lazy"><h2>${escape(p.name)}</h2></a><p>${escape(p.packaging)}</p><a href="${productUrl(p)}">Explore product →</a></article>`;
function page(title,description,url,body,schema){return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | Nexus Wholesale</title><meta name="description" content="${escape(description)}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"><link rel="canonical" href="${origin}${url}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${origin}${url}"><meta property="og:type" content="website"><meta property="og:image" content="${origin}/assets/hero_logistics.jpg"><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/css/styles.css"><link rel="stylesheet" href="/css/enhancements.css"><link rel="stylesheet" href="/css/editorial.css"><link rel="stylesheet" href="/css/motion-design.css"><script src="/js/motion.js" defer></script><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head><body><main class="detail-shell"><nav class="detail-nav" aria-label="Main navigation"><a href="/">NEXUS / WHOLESALE</a><a href="/#wholesale-catalog">Browse catalog ↗</a></nav>${body}<footer class="detail-footer">Nexus Wholesale · <a href="/#contact">Contact the trade desk</a> · Contact us for product information and availability.</footer></main></body></html>`;}
const urls=['/'];
for(const brand of BRANDS.filter(b=>b.id!=='all')){
 const products=PRODUCTS.filter(p=>p.brand===brand.id);
 const url=`/brands/${brand.id}/`;
 const desc=`Explore ${brand.name} wholesale products from Nexus. Compare available ranges and enquire about formats, case quantities and sourcing for your market.`;
 save(url,page(brand.name+' Wholesale Products',desc,url,`<div class="detail-intro"><a href="/">Home</a> / <a href="/#brands">Brands</a><h1>${escape(brand.name)} wholesale products</h1><p>${escape(desc)}</p><p>${products.length} products. Explore our selection and talk to our team about your order.</p><a class="btn btn-primary" href="/?brand=${brand.id}#wholesale-catalog">Browse this brand →</a></div><div class="product-grid">${products.map(card).join('')}</div>`,{'@context':'https://schema.org','@type':'CollectionPage',name:brand.name+' Wholesale Products',url:origin+url,description:desc,mainEntity:{'@type':'ItemList',itemListElement:products.map((p,i)=>({'@type':'ListItem',position:i+1,url:origin+productUrl(p),name:p.name}))}}));
}

function save(url,content){const dir=path.join(__dirname,url);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),content.replace(/ — product range illustration| — family reference image/g,''));urls.push(url);}
for(const c of CATEGORIES.filter(c=>c.id!=='all')){
 const products=PRODUCTS.filter(p=>p.category===c.id),url=`/categories/${c.id}/`,desc=`Explore ${c.name.toLowerCase()} for wholesale sourcing. Compare brands and formats in the Nexus wholesale product range.`;
 save(url,page(`${c.name} Wholesale`,desc,url,`<div class="detail-intro"><a href="/">Home</a> / Wholesale categories<h1>${escape(c.name)}</h1><p>${escape(desc)}</p><p>${products.length} products</p><a class="btn btn-primary" href="/?category=${c.id}#wholesale-catalog">Build your wholesale enquiry →</a></div><div class="product-grid">${products.map(card).join('')}</div>`,{'@context':'https://schema.org','@type':'CollectionPage',name:c.name,url:origin+url,description:desc,mainEntity:{'@type':'ItemList',itemListElement:products.map((p,i)=>({'@type':'ListItem',position:i+1,url:origin+productUrl(p),name:p.name}))}}));
}
for(const p of PRODUCTS){
 const url=productUrl(p),related=PRODUCTS.filter(q=>q.id!==p.id&&(q.category===p.category||q.brand===p.brand)).slice(0,3);
 save(url,page(p.name+' Wholesale',p.description,url,`<div class="detail-intro"><a href="/">Home</a> / <a href="/categories/${p.category}/">${escape(p.categoryName)}</a><h1>${escape(p.name)}</h1><p><a href="/brands/${p.brand}/">Explore the brand →</a></p></div><div class="detail-product"><img src="/${p.image}" alt="${escape(p.name)}" width="600" height="400" fetchpriority="high"><div><p>${escape(p.description)}</p><dl><dt>Brand</dt><dd><a href="/brands/${p.brand}/">${escape(p.brandName)}</a></dd><dt>Product range</dt><dd>${escape(p.categoryName)}</dd><dt>Format</dt><dd>${escape(p.packaging)}</dd></dl><a class="btn btn-primary" href="mailto:trade@nexus-distro.com?subject=${encodeURIComponent('Wholesale inquiry: '+p.name)}">Enquire about this product ↗</a><p>Confirm product information and availability with the trade desk.</p></div></div>${story(p)}<h2>More to discover</h2><div class="product-grid">${related.length?related.map(card).join(''):'<p>Explore more products in the <a href="/#wholesale-catalog">wholesale catalog</a>.</p>'}</div>`,{'@context':'https://schema.org','@type':'Product',name:p.name,sku:p.sku,description:p.description,image:origin+'/'+p.image,brand:{'@type':'Brand',name:p.brandName},url:origin+url}));
}
let home=fs.readFileSync('index.html','utf8');
// Keep homepage SEO URLs consistent with generated pages and SITE_URL overrides.
home=home.replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="${origin}/">`);
home=home.replace(/<meta property="og:url"[^>]*>/,`<meta property="og:url" content="${origin}/">`);
home=home.replace(/<meta property="og:image"[^>]*>/,`<meta property="og:image" content="${origin}/assets/hero_logistics.jpg">`);
home=home.replace(/<meta name="twitter:image"[^>]*>/,`<meta name="twitter:image" content="${origin}/assets/hero_logistics.jpg">`);
home=home.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':origin+'/#organization',name:'Nexus Wholesale & Global Distribution',url:origin,logo:origin+'/assets/favicon.svg'},{'@type':'WebSite',url:origin,name:'Nexus Wholesale & Global Distribution'}]})}</script>`);
home=home.replace(/<div class="product-grid" id="product-grid">[\s\S]*?<\/div>/,`<div class="product-grid" id="product-grid">${PRODUCTS.map(card).join('')}</div>`);
home=home.replace(/<div id="category-discovery" class="category-discovery">[\s\S]*?<\/div>/,`<div id="category-discovery" class="category-discovery">${CATEGORIES.filter(c=>c.id!=='all').map(c=>`<a class="category-tile" href="/categories/${c.id}/">${escape(c.name)}</a>`).join('')}</div>`);
home=home.replace(/<div class="brands-grid" id="brands-grid">[\s\S]*?<\/div>/, '<div class="brands-grid" id="brands-grid">'+BRANDS.filter(b=>b.id!=='all').map(b=>`<a class="brand-badge-card" href="/brands/${b.id}/">${escape(b.name)} wholesale →</a>`).join('')+'</div>');
fs.writeFileSync('index.html',home);
const today = new Date().toISOString().split('T')[0];
const sitemapEntries = urls.map(url => {
  let priority = '0.7';
  let changefreq = 'weekly';
  if (url === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (url.startsWith('/categories/') || url.startsWith('/brands/')) {
    priority = '0.8';
    changefreq = 'weekly';
  }
  return `  <url>\n    <loc>${escape(origin + url)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);
fs.writeFileSync('robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built ${urls.length} indexable pages.`);

// Deploy the complete public site as static files. Do not deploy the local Node
// server: its filesystem is not Vercel's static asset directory.
const outputDir=path.join(__dirname,'dist');
fs.mkdirSync(outputDir,{recursive:true});
for(const name of ['assets','css','js'])fs.cpSync(path.join(__dirname,name),path.join(outputDir,name),{recursive:true});
for(const name of ['robots.txt','sitemap.xml','site.webmanifest'])fs.copyFileSync(path.join(__dirname,name),path.join(outputDir,name));
for(const url of urls){
 const relative=url==='/'?'index.html':path.join(url.slice(1),'index.html');
 const destination=path.join(outputDir,relative);
 fs.mkdirSync(path.dirname(destination),{recursive:true});
 fs.copyFileSync(path.join(__dirname,relative),destination);
}
console.log('Deployment output: dist/ (HTML, CSS, JavaScript, images and discovery files).');
