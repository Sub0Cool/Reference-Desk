(() => {
"use strict";
const input=document.querySelector("#mt-query"),form=document.querySelector("#mt-form");
const matches=document.querySelector("#mt-suggestions"),result=document.querySelector("#mt-result");
const copy=document.querySelector("#mt-copy");
const known=window.REFERENCE_DESK_MORAL_TURPITUDE||[];
const cases=window.REFERENCE_DESK_MT_AUTHORITIES||{};
if(!input||!form||!matches||!result)return;
let selected=null,copyText="";
const normalize=s=>String(s||"").toLowerCase().replace(/§/g,"").replace(/[^a-z0-9]/g,"");
const offenseKey=o=>normalize(o.code+o.section);
function candidates(q){
 const n=normalize(q);
 if(n.length<2)return [];
 const fromLegal=(window.EXPEDITER_OFFENSE_DATA||[]).map(o=>({code:o.code,section:o.section,name:o.name,aliases:o.aliases||[]}));
 const map=new Map();
 [...known,...fromLegal].forEach(o=>{
   if(!o.code||!o.section)return;
   const key=offenseKey(o);if(!map.has(key)||known.includes(o))map.set(key,o);
 });
 return [...map.values()].filter(o=>{
   const names=[o.code+" "+o.section,o.section,o.name,...(o.aliases||[])];
   return names.some(v=>normalize(v).includes(n));
 }).slice(0,35);
}
function hideSuggestions(){matches.hidden=true;matches.replaceChildren();input.setAttribute("aria-expanded","false");}
function choose(o){input.value=o.code+" "+o.section;hideSuggestions();render(o);}
function updateSuggestions(){
 const items=candidates(input.value);matches.replaceChildren();
 if(!items.length){hideSuggestions();return;}
 items.forEach((o,i)=>{
  const b=document.createElement("button");b.type="button";b.className="mt-suggestion";b.setAttribute("role","option");
  b.textContent=o.code+" § "+o.section+" — "+o.name+(known.some(k=>offenseKey(k)===offenseKey(o))?" · researched":" · not yet researched");
  b.addEventListener("click",()=>choose(o));matches.append(b);
 });
 matches.hidden=false;input.setAttribute("aria-expanded","true");
}
function append(tag,parent,content,cls){
 const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;parent.append(n);return n;
}
function authorityLinks(ids,parent){
 for(const id of ids||[]){const a=cases[id];if(!a)continue;const link=append("a",parent,a.name+" "+a.citation,"mt-authority");
 link.href=a.url;link.target="_blank";link.rel="noopener noreferrer";}
}
function section(parent,title,analysis){
 const block=append("section",parent,undefined,"mt-analysis");
 append("h3",block,title);append("strong",block,analysis.status==="no"?"Not necessarily":analysis.status==="yes"?"Yes":analysis.status==="fact-dependent"?"Fact-dependent":analysis.status==="conditional"?"Conditional":"Not researched","mt-classification");
 append("p",block,analysis.summary);
 authorityLinks(analysis.authority,block);
}
function render(o){
 const entry=known.find(k=>offenseKey(k)===offenseKey(o));
 result.replaceChildren();result.hidden=false;selected=entry||null;
 append("h3",result,o.code+" § "+o.section+" — "+o.name);
 if(!entry){
  append("p",result,"Not yet researched. Reference Desk has no independently reviewed moral-turpitude classification for this section. Absence of a record does not mean the offense does not involve moral turpitude.");
  copy.hidden=true;return;
 }
 section(result,"Felony-conviction analysis · Castro",entry.conviction);
 append("p",result,entry.caveat,"mt-caveat");
 append("p",result,"Separate underlying conduct may support impeachment if independently shown to involve moral turpitude. A knowingly false statement, for example, may matter even when the charged offense does not qualify. Admissibility remains subject to Evidence Code § 352 and applicable proof rules; a misdemeanor conviction alone generally cannot prove the underlying misconduct under Wheeler.","mt-caveat");
 append("p",result,"Research snapshot: "+entry.reviewed+". Verify current law, statutory amendments, and subsequent judicial treatment before citing.","mt-review");
 authorityLinks(["castro","wheeler"],result);
 const fmt=(analysis)=>analysis.summary+" "+(analysis.authority||[]).map(id=>cases[id]?.name+" "+cases[id]?.citation).filter(Boolean).join("; ");
 copyText=[o.code+" § "+o.section+" — "+o.name,"Felony conviction: "+fmt(entry.conviction),entry.caveat,"Evidence Code § 352 applies. Under Wheeler, the fact of a misdemeanor conviction alone generally is not admissible to prove misconduct.","Research date: "+entry.reviewed].join("\n\n");
 copy.hidden=false;
}
input.addEventListener("input",()=>{selected=null;result.hidden=true;copy.hidden=true;updateSuggestions();});
input.addEventListener("keydown",e=>{
 if(e.key==="Escape")hideSuggestions();
 if(e.key==="ArrowDown"&&!matches.hidden){e.preventDefault();matches.querySelector("button")?.focus();}
});
matches.addEventListener("keydown",e=>{
 const buttons=[...matches.querySelectorAll("button")],i=buttons.indexOf(document.activeElement);
 if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();(buttons[(i+(e.key==="ArrowDown"?1:buttons.length-1))%buttons.length])?.focus();}
 if(e.key==="Escape"){hideSuggestions();input.focus();}
});
form.addEventListener("submit",e=>{
 e.preventDefault();hideSuggestions();
 const q=normalize(input.value);
 const match=[...known,...(window.EXPEDITER_OFFENSE_DATA||[])].find(o=>offenseKey(o)===q||normalize(o.section)===q||normalize(o.name)===q);
 if(match)render(match);else{
 result.replaceChildren();result.hidden=false;copy.hidden=true;
 append("p",result,"No exact match found. Select an autocomplete suggestion or enter a complete code section. No moral-turpitude determination has been made.");
 }
});
copy.addEventListener("click",async()=>{if(!copyText)return;try{await navigator.clipboard.writeText(copyText);copy.textContent="Copied";setTimeout(()=>copy.textContent="Copy legal analysis",1800);}catch{copy.textContent="Copy unavailable";}});
document.addEventListener("click",e=>{if(!form.contains(e.target))hideSuggestions();});
document.querySelector("#master-reset")?.addEventListener("click",()=>{hideSuggestions();result.hidden=true;copy.hidden=true;});
})();
