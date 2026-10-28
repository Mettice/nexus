document.addEventListener('DOMContentLoaded', () => {
  const params=new URLSearchParams(location.search);
  let category=CATEGORIES.some(c=>c.id===params.get('category'))?params.get('category'):'all',brand=BRANDS.some(b=>b.id===params.get('brand'))?params.get('brand'):'all';
  const search=document.getElementById('global-search-input'), select=document.getElementById('search-category-select'), sort=document.getElementById('catalog-sort'),pills=document.getElementById('category-pills'),grid=document.getElementById('product-grid'),brands=document.getElementById('brands-grid');
  search.value=params.get('search')||'';
  search.setAttribute('aria-label','Search products, brands or SKU');
  select.innerHTML=CATEGORIES.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('category-discovery').innerHTML=CATEGORIES.filter(c=>c.id!=='all').map((c,i)=>`<a class="category-tile" href="/categories/${c.id}/"><span class="category-number">0${i+1}</span><strong>${c.name}</strong><span>${PRODUCTS.filter(p=>p.category===c.id).length} products ↗</span></a>`).join('');
  function render(){
    select.value=category;
    pills.innerHTML=CATEGORIES.map(c=>`<button type="button" class="pill-btn ${category===c.id?'active':''}" aria-pressed="${category===c.id}" data-category="${c.id}">${c.name}</button>`).join('');
    brands.innerHTML=BRANDS.map(b=>`<div class="brand-choice"><button type="button" class="brand-badge-card" aria-pressed="${brand===b.id}" data-brand="${b.id}"><span class="brand-badge-title">${b.name}</span><span class="brand-badge-count">${b.count} products</span></button>${b.id!=='all'?`<a class="brand-page-link" href="/brands/${b.id}/">Explore ${b.name} →</a>`:''}</div>`).join('');
    const q=search.value.trim().toLowerCase();
    const products=PRODUCTS.filter(p=>(category==='all'||p.category===category)&&(brand==='all'||p.brand===brand)&&(!q||[p.name,p.sku,p.brandName,p.categoryName].some(v=>v.toLowerCase().includes(q))));
    if(sort.value==='name')products.sort((a,b)=>a.name.localeCompare(b.name));
    document.getElementById('catalog-result-count').textContent=`${products.length} of ${PRODUCTS.length} products`;
    grid.innerHTML=products.length?products.map(p=>`<article class="product-card"><a class="product-thumb-wrap" href="/products/${p.id}/"><img src="/${p.image}" alt="${p.name}" class="product-thumb" width="300" height="210" loading="lazy"></a><div class="product-brand-tag">${p.brandName}</div><h3 class="product-title"><a href="/products/${p.id}/">${p.name}</a></h3><p class="product-pack-note">${p.packaging}</p><div class="product-card-actions"><a class="btn btn-primary" href="/products/${p.id}/">View product →</a><a class="btn btn-outline" href="mailto:trade@nexusdustribution.com?subject=${encodeURIComponent('Product enquiry: '+p.name)}">Enquire</a></div></article>`).join(''):'<p>No matching products. Try another search or clear your filters.</p>';
  }
  pills.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;render();}});
  brands.addEventListener('click',e=>{const b=e.target.closest('[data-brand]');if(b){brand=b.dataset.brand;render();document.getElementById('wholesale-catalog').scrollIntoView({behavior:'smooth'});}});
  select.addEventListener('change',()=>{category=select.value;render();});search.addEventListener('input',render);sort.addEventListener('change',render);
  document.querySelector('.search-input-group').addEventListener('submit',e=>{e.preventDefault();document.getElementById('wholesale-catalog').scrollIntoView({behavior:'smooth'});});
  document.querySelector('.search-submit-btn').addEventListener('click',()=>document.getElementById('wholesale-catalog').scrollIntoView({behavior:'smooth'}));
  document.getElementById('clear-filters').addEventListener('click',()=>{category='all';brand='all';search.value='';sort.value='featured';render();});
  document.getElementById('b2b-contact-form').addEventListener('submit',e=>{e.preventDefault();const body=Array.from(e.target.querySelectorAll('input,textarea')).map(el=>`${el.id.replace('contact-','')}: ${el.value}`).join('\n');location.href='mailto:trade@nexusdustribution.com?subject='+encodeURIComponent('Product enquiry: '+document.getElementById('contact-company').value)+'&body='+encodeURIComponent(body);});
  document.querySelector('#b2b-contact-form').insertAdjacentHTML('beforeend','<p class="enquiry-note">Opens a draft in your email application. Send the email to submit your enquiry.</p>');
  render();
});
