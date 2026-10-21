const fs=require('fs'),assert=require('node:assert/strict'),vm=require('vm');
const origin='http://localhost:'+(process.env.PORT||4180);
(async()=>{
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('js/data.js','utf8')+';this.expected=1+PRODUCTS.length+CATEGORIES.length-1+BRANDS.length-1;',ctx);assert.equal(urls.length,ctx.expected);assert.equal(new Set(urls).size,urls.length);
for(const url of urls){
 const response=await fetch(origin+url);assert.equal(response.status,200,url);
 const html=await response.text();assert.equal((html.match(/<h1\b/g)||[]).length,1,url);
 if(url.startsWith('/products/')){assert.match(html,/class="product-story"/);assert.match(html,/Where it fits/);}
 assert.doesNotMatch(html,/[€£$]\s*\d/);assert.doesNotMatch(html,/undefined/);assert.match(html,/<link rel="canonical"/);assert.match(html,/<meta name="description"/);
 assert.doesNotMatch(html,/AI-generated|Available to source|Illustrative sourcing|Example variant/);
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(m[1]);
 for(const m of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)){
  const asset=await fetch(origin+m[1],{method:'HEAD'});assert.equal(asset.status,200,`${url}: ${m[1]}`);
 }
}
assert.equal((await fetch(origin+'/package.json')).status,404);
assert.equal((await fetch(origin+'/.git/config')).status,404);
console.log(`Passed: ${urls.length} pages, internal links, assets, metadata, JSON-LD and source-file protection.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
