(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const back=document.createElement('button');back.className='back-top';back.type='button';back.setAttribute('aria-label','Back to top');back.textContent='↑';back.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}));document.body.append(back);
  const journey=document.querySelector('.collection-journey'),track=document.querySelector('.collection-track'),hero=document.querySelector('.hero-shelf');
  const desktop=matchMedia('(min-width: 901px)');
  let queued=false,pinned=false;
  function setup(){pinned=!!journey&&desktop.matches&&!reduced.matches;journey?.classList.toggle('is-pinned',pinned);if(!pinned&&track)track.style.transform='';update();}
  function update(){
    const distance=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${distance>0?scrollY/distance:0})`;back.classList.toggle('visible',scrollY>650);document.body.classList.toggle('has-scrolled',scrollY>30);
    if(hero&&!reduced.matches){const y=Math.min(scrollY,850);hero.style.setProperty('--pack-one-y',`${-y*.09}px`);hero.style.setProperty('--pack-two-y',`${y*.08}px`);hero.style.setProperty('--pack-three-y',`${-y*.045}px`);}
    if(pinned){const rect=journey.getBoundingClientRect(),range=journey.offsetHeight-innerHeight,p=Math.max(0,Math.min(1,-rect.top/range));track.style.transform=`translate3d(${-p*(track.scrollWidth-track.clientWidth)}px,0,0)`;journey.style.setProperty('--journey-progress',p);journey.style.setProperty('--collection-image-rotate',`${-6+p*12}deg`);journey.querySelectorAll('.collection-step').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===Math.round(p*2))));}
    const band=document.querySelector('.editorial-band img');if(band&&!reduced.matches&&desktop.matches){const rect=band.getBoundingClientRect();band.style.transform=`translateY(${Math.max(-25,Math.min(25,(innerHeight/2-rect.top)*.035))}px)`;}
    queued=false;
  }
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});update();
  desktop.addEventListener('change',setup);reduced.addEventListener('change',setup);addEventListener('resize',setup,{passive:true});setup();
  journey?.querySelectorAll('.collection-step').forEach((button,i)=>button.addEventListener('click',()=>{if(pinned)window.scrollTo({top:journey.getBoundingClientRect().top+scrollY+(journey.offsetHeight-innerHeight)*i/2,behavior:'smooth'});}));
  track?.addEventListener('focusin',e=>{if(!pinned)return;const panels=Array.from(track.children),index=panels.indexOf(e.target.closest('.collection-panel'));if(index>=0)window.scrollTo({top:journey.getBoundingClientRect().top+scrollY+(journey.offsetHeight-innerHeight)*index/2,behavior:'instant'});});
  if(reduced.matches||!('IntersectionObserver'in window))return;
  document.body.classList.add('motion-enabled');
  const title=document.querySelector('.hero-title');if(title){const lines=['The brands.','The choice.','Your shelf.'];title.replaceChildren(...lines.map((line,i)=>{const row=document.createElement('span');row.className='title-line';line.split(' ').forEach((word,j)=>{const mask=document.createElement('span');mask.className='title-word';const inside=document.createElement('span');inside.textContent=word+'\u00a0';inside.style.setProperty('--word-delay',`${i*120+j*70}ms`);mask.append(inside);row.append(mask);});return row;}));}
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:0.06,rootMargin:'0px 0px -24px 0px'});
  function watch(root){const els=root.querySelectorAll('.product-card,.detail-card,.category-tile,.section-title-wrap,.detail-intro,.product-story,.editorial-band,.brand-choice');els.forEach((el,i)=>{if(!el.dataset.motion){el.dataset.motion='true';el.style.setProperty('--reveal-delay',`${i%4*55}ms`);el.classList.add('reveal');observer.observe(el);}});}
  watch(document);new MutationObserver(()=>watch(document)).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
})();
