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
        id=(crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
          .replace(/[^a-zA-Z0-9_-]/g,'')
          .slice(0,64);
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
      <div class="reaction-copy">
        <span class="reaction-kicker">4DK READER PULSE</span>
        <h2>WHAT'D YOU THINK?</h2>
        <p>One tap. Let the culture know where you stand.</p>
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

      <div class="reaction-status" aria-live="polite">Loading reader pulse…</div>
    </div>
  `;

  const storyRoot=
    document.querySelector('.article-story') ||
    document.querySelector('.final-article') ||
    document.querySelector('.story-body') ||
    document.querySelector('.article-body');

  const main=document.querySelector('main');

  if(storyRoot && storyRoot.parentElement && !storyRoot.closest('.annual-coverlines,.team-question-grid,.story-grid,.card-grid')){
    storyRoot.insertAdjacentElement('afterend',section);
  }else if(main){
    main.appendChild(section);
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
      const response=await fetch(`/api/reactions?article=${encodeURIComponent(article)}`,{
        headers:{Accept:'application/json'}
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error || 'Reader reactions unavailable');

      renderCounts(data.counts);
      status.textContent=data.setup===false
        ? 'Reader pulse is ready visually — storage still needs its Cloudflare binding.'
        : 'Tap a reaction.';
    }catch{
      status.textContent='Tap a reaction.';
    }
  }

  async function vote(next){
    const previous=savedReaction();

    if(previous===next){
      status.textContent='You already picked that one 💯';
      return;
    }

    buttons.forEach(btn=>btn.disabled=true);
    status.textContent='Locking it in…';

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
      status.textContent=previous ? 'Reaction updated 💯' : 'Locked in 💯';
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