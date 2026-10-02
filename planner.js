// Illustrative research profiles. These are NOT measured FPS benchmarks.
// Profiles use desktop hardware; a laptop part with a similar name may differ.
const gameProfiles = {
  roblox: {name:'Roblox',base:0,settings:'Standard · uden tunge effekter',note:'Ydelsen afhænger af den konkrete Roblox-oplevelse. Et let obby og en stor verden kan kræve meget forskelligt.',url:'https://en.help.roblox.com/hc/en-us/articles/203312800-Computer-Hardware-Operating-System-Requirements'},
  minecraft: {name:'Minecraft Java',base:2,settings:'Vanilla · 12 chunks · ingen shaders',note:'CPU og render distance betyder meget. Mods, shaders og store verdener kræver en anden vurdering.',url:'https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc'},
  valorant: {name:'VALORANT',base:0,settings:'Lav grafik · konkurrence',note:'Ved høj FPS bliver processoren vigtig. Kontrollér også Riots krav til operativsystem og Vanguard.',url:'https://playvalorant.com/en-us/specs/'},
  cs2: {name:'Counter-Strike 2',base:1,settings:'Lav grafik · konkurrence',note:'Røg, store kampe og serverforhold påvirker oplevelsen. Se både gennemsnits-FPS og 1% lows i tests.',url:'https://store.steampowered.com/app/730/CounterStrike_2/'},
  fortnite: {name:'Fortnite',base:1,settings:'Performance Mode · lav grafik',note:'Performance Mode er valgt her. Epic-grafik, Nanite og Lumen kræver væsentligt mere hardware.',url:'https://www.epicgames.com/help/c-34254770/c-38015632/a16548002?lang=en-US'},
  forza: {name:'Forza Horizon 5',base:2,settings:'Høj grafik · ray tracing fra',note:'Dette er en researchprofil. Find en test af dit grafikkort med samme grafikindstillinger og opløsning.',url:'https://store.steampowered.com/app/1551360/Forza_Horizon_5/'},
  cyberpunk: {name:'Cyberpunk 2077',base:3,settings:'Medium/høj · ray tracing fra',note:'Path tracing er ikke med i denne profil. Selv meget kraftig hardware garanterer ikke et højt FPS-mål.',url:'https://support.cdprojektred.com/en/cyberpunk/pc/sp-technical/issue/1556/cyberpunk-2077-system-requirements'},
  wukong: {name:'Black Myth: Wukong',base:3,settings:'Medium · ray tracing fra',note:'Et krævende spil. De officielle PC-krav er testet med opskalering; vores profiler er ikke en oversættelse til native FPS.',url:'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/'}
};
const hardwareProfiles = [
 {gpu:'Radeon Vega 7 · integreret',cpu:'AMD Ryzen 5 5600G',ram:'16 GB · dual channel',tier:'En enkel start'},
 {gpu:'AMD Radeon RX 6600 · 8 GB',cpu:'AMD Ryzen 5 5600',ram:'16 GB · dual channel',tier:'Low-end / dedikeret grafik'},
 {gpu:'NVIDIA RTX 4060 · 8 GB',cpu:'AMD Ryzen 5 7600',ram:'16–32 GB',tier:'Mellemklasse'},
 {gpu:'AMD Radeon RX 7700 XT · 12 GB',cpu:'AMD Ryzen 5 7600',ram:'32 GB',tier:'Mellemklasse / mere grafik'},
 {gpu:'NVIDIA RTX 4070 Super · 12 GB',cpu:'AMD Ryzen 7 7800X3D',ram:'32 GB',tier:'High-end til research'},
 {gpu:'NVIDIA RTX 4080 Super · 16 GB',cpu:'AMD Ryzen 7 7800X3D',ram:'32 GB',tier:'High-end / krævende mål'}
];
// Broad budgets for a complete new tower in this market segment, incl. VAT.
// Retail references and exclusions are shown alongside the estimate.
const towerBudgets=['4.000–6.000 kr.','6.000–9.000 kr.','8.000–11.000 kr.','10.000–14.000 kr.','13.000–18.000 kr.','18.000–25.000 kr.'];
const planner=document.querySelector('.planner');
if(planner){
 const slider=document.querySelector('#fps-range');
 const buttons=[...document.querySelectorAll('[data-game]')];
 let selected='roblox';
 const put=(id,value)=>{document.getElementById(id).textContent=value;};
 function updatePlanner(){
  const fps=Number(slider.value);
  const game=gameProfiles[selected];
  const increment=fps<=60?0:fps<=120?1:fps<=180?2:3;
  const index=Math.min(hardwareProfiles.length-1,game.base+increment);
  const build=hardwareProfiles[index];
  put('build-price',towerBudgets[index]);
  put('fps-value',fps);put('selected-game',game.name);
  put('result-summary',game.name+' · '+fps+' FPS-mål');
  put('build-gpu',build.gpu);put('build-cpu',build.cpu);put('build-ram',build.ram);
  put('build-display',fps<=60?'60–75 Hz':fps<=120?'120–144 Hz':fps<=180?'165–180 Hz':'240 Hz');
  put('build-settings',game.settings);put('build-tier',build.tier);
  put('budget-direction',index===0?'Start med at undersøge din nuværende PC.':index<=2?'En enkel PC med dedikeret grafik kan være et sted at starte.':'Et mere krævende setup. Sammenlign tests, før du vælger dele.');
  document.querySelector('#game-select').value=selected;
  document.querySelectorAll('[data-fps]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.fps)===fps)));
  planner.dataset.level=String(index);
  const demanding=game.base>=2&&fps>120;
  put('build-note',demanding?'Ambitiøst mål: Denne profil lover ikke '+fps+' FPS. Undersøg lavere grafik eller et mål på 60–120 FPS. '+game.note:game.note);
  const source=document.querySelector('#game-source');source.href=game.url;source.textContent=game.name+' · officielle krav ↗';
  slider.style.setProperty('--fill',((fps-30)/210*100)+'%');
  slider.setAttribute('aria-valuetext',fps+' billeder pr. sekund som mål');
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.game===selected)));
  put('planner-status',game.name+', '+fps+' FPS-mål. Researchprofil: '+build.gpu+', '+build.cpu+', '+build.ram+'. Cirka budget for samlet PC: '+towerBudgets[index]+'. Ingen FPS-garanti.');
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.game;updatePlanner();}));
 document.querySelector('#game-select').addEventListener('change',event=>{selected=event.target.value;updatePlanner();});
 document.querySelectorAll('[data-fps]').forEach(button=>button.addEventListener('click',()=>{slider.value=button.dataset.fps;updatePlanner();}));
 document.querySelector('.price-card a').addEventListener('click',()=>{document.querySelector('#prisgrundlag').open=true;});
 slider.addEventListener('input',updatePlanner);
 updatePlanner();planner.hidden=false;
}
