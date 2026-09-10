import core from './worker.js';

const REACTION_KEYS=['fire','facts','debatable','more'];
const ARTICLE_RE=/^[a-z0-9-]{1,100}$/;
const VISITOR_RE=/^[a-zA-Z0-9_-]{8,80}$/;

function reactionJSON(data,init={}){
  const headers=new Headers(init.headers || {});
  headers.set('Content-Type','application/json; charset=utf-8');
  headers.set('Cache-Control','no-store');
  return new Response(JSON.stringify(data),{...init,headers});
}

function blankCounts(){
  return {fire:0,facts:0,debatable:0,more:0};
}

function safeCounts(value){
  const out=blankCounts();
  if(value && typeof value==='object'){
    for(const key of REACTION_KEYS){
      out[key]=Math.max(0,Number.parseInt(value[key],10) || 0);
    }
  }
  return out;
}

async function readCounts(env,article){
  if(!env.REACTIONS) return blankCounts();
  try{
    const raw=await env.REACTIONS.get(`counts:${article}`);
    return safeCounts(raw ? JSON.parse(raw) : null);
  }catch{
    return blankCounts();
  }
}

function sameOrigin(request){
  const origin=request.headers.get('Origin');
  if(!origin) return true;
  try{
    return new URL(origin).hostname===new URL(request.url).hostname;
  }catch{
    return false;
  }
}

async function reactionAPI(request,env){
  const url=new URL(request.url);
  const article=(url.searchParams.get('article') || '').toLowerCase();

  if(request.method==='GET'){
    if(!ARTICLE_RE.test(article)){
      return reactionJSON({error:'Invalid article'}, {status:400});
    }

    const counts=await readCounts(env,article);
    return reactionJSON({
      article,
      counts,
      total:Object.values(counts).reduce((a,b)=>a+b,0),
      setup:Boolean(env.REACTIONS)
    });
  }

  if(request.method!=='POST'){
    return reactionJSON({error:'Method not allowed'}, {status:405,headers:{Allow:'GET, POST'}});
  }

  if(!sameOrigin(request)){
    return reactionJSON({error:'Invalid origin'}, {status:403});
  }

  if(!env.REACTIONS){
    return reactionJSON({
      error:'Reader reaction storage is not configured yet.',
      code:'REACTIONS_STORAGE_NOT_READY'
    }, {status:503});
  }

  let body;
  try{
    body=await request.json();
  }catch{
    return reactionJSON({error:'Invalid request'}, {status:400});
  }

  const bodyArticle=String(body.article || '').toLowerCase();
  const reaction=String(body.reaction || '').toLowerCase();
  const visitorId=String(body.visitorId || '');

  if(!ARTICLE_RE.test(bodyArticle) || !REACTION_KEYS.includes(reaction) || !VISITOR_RE.test(visitorId)){
    return reactionJSON({error:'Invalid reaction'}, {status:400});
  }

  const countsKey=`counts:${bodyArticle}`;
  const voteKey=`vote:${bodyArticle}:${visitorId}`;

  let previous='';
  try{
    previous=await env.REACTIONS.get(voteKey) || '';
  }catch{}

  const counts=await readCounts(env,bodyArticle);

  if(previous===reaction){
    return reactionJSON({
      ok:true,
      article:bodyArticle,
      reaction,
      counts,
      total:Object.values(counts).reduce((a,b)=>a+b,0)
    });
  }

  if(REACTION_KEYS.includes(previous)){
    counts[previous]=Math.max(0,counts[previous]-1);
  }
  counts[reaction]+=1;

  await Promise.all([
    env.REACTIONS.put(countsKey,JSON.stringify(counts)),
    env.REACTIONS.put(voteKey,reaction)
  ]);

  return reactionJSON({
    ok:true,
    article:bodyArticle,
    reaction,
    changedFrom:previous || null,
    counts,
    total:Object.values(counts).reduce((a,b)=>a+b,0)
  });
}

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);

    if(url.pathname==='/api/reactions'){
      return reactionAPI(request,env);
    }

    return core.fetch(request,env,ctx);
  }
};