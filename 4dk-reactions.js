(() => {
  const articleMeta=document.querySelector('meta[property="og:type"][content="article"]');
  if(!articleMeta || document.querySelector('.reader-reactions')) return;

  const article=(location.pathname.split('/').pop() || 'index')
    .replace(/\.html$/i,'')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g,'-')
    .replace(/-+/g,'-')
    .replace(/^-|-$/g,'')
    .slice(0,100);

  if(!article) return;

  const reactionTypes=[
    {key:'fire',emoji:'🔥',label:'FIRE'},
    {key:'facts',emoji:'💯',label:'FACTS'},
    {key:'debatable',emoji:'🤔',label:'DEBATABLE'},
    {key:'more',emoji:'👀',label:'MORE LIKE THIS'}
  ];

  const storageKey=`4dk-reaction:${article}`;
  const visitorKey='4dk-reader-id';

  function readerId(){
    try{
      let id=localStorage.getItem(visitorKey);
      if(!id){
        id=(crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,64);
        localStorage.setItem(visitorKey,id);
      }
      return id;
    }catch{
      return `session-${Math.random().toString(36).slice(2)}`.slice(0,64);
    }
  }

  function savedReaction(){
    try{return localStorage.getItem(storageKey) || '';}catch{return '';}
  }

  function saveReaction(value){
    try{
      if(value) localStorage.setItem(storageKey,value);
      else localStorage.removeItem(storageKey);
    }catch{}
  }

  const section=document.createElement('section');
  section.className='reader-reactions';
  section.setAttribute('aria-label','Reader reactions');
  section.innerHTML=`
    <div class="reader-reactions-inner">
      <div class="reaction-heading">
        <span>4DK READERS</span>
        <h2>HOW DID THIS ONE HIT?</h2>
        <p>Tap one. See how the culture is reacting.</p>
      </div>
      <div class="reaction-grid" role="group" aria-label="Choose a reaction">
        ${reactionTypes.map(item=>`
          <button class="reaction-btn" type="button" data-reaction="${item.key}" aria-pressed="false">
            <span class="reaction-emoji" aria-hidden="true">${item.emoji}</span>
            <span class="reaction-label">${item.label}</span>
            <span class="reaction-count" data-count="${item.key}">0</span>
          </button>
        `).join('')}
      </div>
      <div class="reaction-status" aria-live="polite">Loading reader reactions…</div>
    </div>
  `;

  const storyRoot=
    document.querySelector('.article-story') ||
    document.querySelector('.final-article') ||
    document.querySelector('main article');

  if(storyRoot && storyRoot.parentElement){
    storyRoot.insertAdjacentElement('afterend',section);
  }else{
    document.querySelector('main')?.appendChild(section);
  }

  const status=section.querySelector('.reaction-status');
  const buttons=[...section.querySelectorAll('.reaction-btn')];

  function setSelected(selected){
    buttons.forEach(btn=>{
      const active=btn.dataset.reaction===selected;
      btn.classList.toggle('is-selected',active);
      btn.setAttribute('aria-pressed',String(active));
    });
  }

  function renderCounts(counts={}){
    reactionTypes.forEach(item=>{
      const el=section.querySelector(`[data-count="${item.key}"]`);
      if(el) el.textContent=String(Math.max(0,Number(counts[item.key] || 0)));
    });
  }

  async function load(){
    setSelected(savedReaction());
    try{
      const response=await fetch(`/api/reactions?article=${encodeURIComponent(article)}`,{headers:{Accept:'application/json'}});
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error || 'Reader reactions unavailable');
      renderCounts(data.counts);
      status.textContent=data.setup===false
        ? 'Reader reactions are ready visually — storage still needs its Cloudflare binding.'
        : 'Pick your reaction.';
    }catch{
      status.textContent='Pick your reaction.';
    }
  }

  async function vote(next){
    const previous=savedReaction();
    if(previous===next){
      status.textContent='You already picked that one 💯';
      return;
    }

    buttons.forEach(btn=>btn.disabled=true);
    status.textContent='Locking in your reaction…';

    try{
      const response=await fetch('/api/reactions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          article,
          reaction:next,
          visitorId:readerId()
        })
      });

      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error || 'Could not save reaction');

      saveReaction(next);
      setSelected(next);
      renderCounts(data.counts);
      status.textContent=previous ? 'Reaction updated 💯' : 'Reaction locked in 💯';
    }catch(error){
      status.textContent=error.message || 'Could not save that reaction. Try again.';
      status.classList.add('is-error');
      setTimeout(()=>status.classList.remove('is-error'),1800);
    }finally{
      buttons.forEach(btn=>btn.disabled=false);
    }
  }

  buttons.forEach(btn=>btn.addEventListener('click',()=>vote(btn.dataset.reaction)));
  load();
})();