
(function(){
'use strict';
var DUMMY=document.createElement('div');
var $=function(s,r){return (r||document).querySelector(s)||DUMMY};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var HAS_COUNTER=!!document.getElementById('tapBtn');
var NS='http://www.w3.org/2000/svg';
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}

/* ---------- storage ---------- */
var KEY='njs_v1';
var S={mantra:'radha',counts:{},days:{},life:0,target:108,sound:true,vib:true,goal:108,theme:'dark',custom:{deva:'',tr:'My mantra'},prad:[]};
try{var raw=localStorage.getItem(KEY);if(raw){var o=JSON.parse(raw);for(var k in o)S[k]=o[k]}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function ymd(d){var y=d.getFullYear(),m=('0'+(d.getMonth()+1)).slice(-2),dd=('0'+d.getDate()).slice(-2);return y+'-'+m+'-'+dd}
function today(){return ymd(new Date())}
function fmt(n){return Number(n).toLocaleString('en-IN')}

/* ---------- mantras ---------- */
var M=[
 {id:'radha',n:'Radha Naam',d:'राधे राधे',t:'Radhe Radhe',mean:'The beloved name of Shri Radha, queen of Vrindavan, dear to Krishna.',use:'Devotion, prem bhakti, daily naam jap.',slug:'radha-naam-jap-counter'},
 {id:'ram',n:'Ram Naam',d:'श्री राम जय राम जय जय राम',t:'Shri Ram Jai Ram Jai Jai Ram',mean:'The taraka mantra praising Lord Ram, the ideal of dharma.',use:'Courage, steadiness, protection and peace.',slug:'ram-naam-jap-counter'},
 {id:'shiva',n:'Om Namah Shivaya',d:'ॐ नमः शिवाय',t:'Om Namah Shivaya',mean:'"I bow to Shiva, the auspicious one" – the panchakshari mantra.',use:'Inner calm, surrender, Monday and Shivaratri sadhana.',slug:'om-namah-shivaya-counter'},
 {id:'hare',n:'Hare Krishna',d:'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे',t:'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare',mean:'The 16-name maha-mantra, calling upon Hari, Krishna and Rama.',use:'Kirtan, congregational chanting, joy.',slug:'hare-krishna-counter'},
 {id:'krishna',n:'Krishna Mantra',d:'ॐ नमो भगवते वासुदेवाय',t:'Om Namo Bhagavate Vasudevaya',mean:'Bowing to Bhagavan Vasudeva, the dwelling-place of all beings.',use:'Bhakti, surrender, Vishnu-Krishna sadhana.'},
 {id:'ganesh',n:'Ganesh Mantra',d:'ॐ गं गणपतये नमः',t:'Om Gam Ganapataye Namaha',mean:'Salutations to Ganapati, remover of obstacles.',use:'New beginnings, studies, Wednesday practice.',slug:'om-gam-ganapataye-namaha-counter'},
 {id:'hanuman',n:'Hanuman Mantra',d:'ॐ हनुमते नमः',t:'Om Hanumate Namah',mean:'Salutations to Hanuman, embodiment of strength and devotion.',use:'Courage, discipline, Tuesday and Saturday practice.',slug:'hanuman-mantra-counter'},
 {id:'gayatri',n:'Gayatri Mantra',d:'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',t:'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',mean:'A Rig Vedic prayer to the Sun-divinity for illumination of the intellect.',use:'Clarity, sandhya vandana at sunrise, noon and sunset.',slug:'gayatri-mantra-counter'},
 {id:'mrityunjaya',n:'Maha Mrityunjaya',d:'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',t:'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat',mean:'A prayer to the three-eyed Shiva for liberation from fear and bondage.',use:'Healing prayers, fearlessness, Shiva sadhana.',slug:'maha-mrityunjaya-mantra-counter'},
 {id:'om',n:'Om',d:'ॐ',t:'Om (Aum)',mean:'The primordial sound, the seed of all mantras.',use:'Meditation, pranayama, beginning and ending practice.',slug:'om-mantra-counter'},
 {id:'mani',n:'Om Mani Padme Hum',d:'ॐ मणि पद्मे हूँ',t:'Om Mani Padme Hum',mean:'The six-syllable mantra of compassion associated with Avalokiteshvara in Tibetan Buddhism.',use:'Compassion practice, Buddhist mala and prayer-wheel traditions.',slug:'om-mani-padme-hum-counter'},
 {id:'wahe',n:'Waheguru',d:'वाहेगुरु',t:'Waheguru',mean:'"Wonderful Lord" – the Sikh name for the Divine used in simran.',use:'Simran, gratitude and remembrance.',slug:'waheguru-simran-counter'},
 {id:'custom',n:'Custom ✎',d:'',t:'Your own name or mantra',mean:'Type any name or mantra you wish to chant.',use:'Any tradition, any name.'}
];
function mById(id){for(var i=0;i<M.length;i++)if(M[i].id===id)return M[i];return M[0]}

/* ---------- decorative svgs ---------- */
(function(){
  var a=$('#mandalaA'),b=$('#mandalaB'),i;
  for(i=0;i<16;i++){var g=el('g',{transform:'rotate('+(i*22.5)+' 200 200)'},a);el('path',{d:'M200 60C226 100 226 140 200 170C174 140 174 100 200 60Z'},g)}
  for(i=0;i<12;i++){var g2=el('g',{transform:'rotate('+(i*30+15)+' 200 200)'},b);el('path',{d:'M200 26C212 52 212 76 200 96C188 76 188 52 200 26Z'},g2);el('circle',{cx:200,cy:16,r:5},g2)}
  el('circle',{cx:200,cy:200,r:185},a);el('circle',{cx:200,cy:200,r:105},b);el('circle',{cx:200,cy:200,r:140},b)
  var mg=$('#malaImg');
  for(i=0;i<27;i++){var an=i/27*2*Math.PI;el('circle',{cx:120+86*Math.cos(an),cy:110+86*Math.sin(an),r:8,fill:i%3?'#c26a1d':'#e2933a'},mg)}
  el('circle',{cx:120,cy:196,r:13,fill:'#f6c453'},mg);
  el('path',{d:'M120 209v22',stroke:'#f6c453','stroke-width':4},mg);el('circle',{cx:120,cy:234,r:5,fill:'#e2476b'},mg);
  var lt=$('#lotusImg'),ang=[-64,-32,0,32,64,-90,90],cols=['#e2476b','#f0678a','#ff8aa5'];
  [-70,70,-40,40,0].forEach(function(r,idx){var gg=el('g',{transform:'translate(120 190) rotate('+r+')'},lt);el('path',{d:'M0 0C-34 -40 -26 -92 0 -128C26 -92 34 -40 0 0Z',fill:cols[idx%3],opacity:idx>3?1:.92},gg)});
  el('ellipse',{cx:120,cy:196,rx:62,ry:10,fill:'#2f7d4f',opacity:.8},lt);
})();

/* petals */
(function(){var p=$('#petals');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(var i=0;i<16;i++){var s=document.createElement('span');s.style.left=Math.random()*100+'%';s.style.animationDuration=(14+Math.random()*16)+'s';s.style.animationDelay=(-Math.random()*20)+'s';s.style.transform='scale('+(.6+Math.random()*.9)+')';p.appendChild(s)}})();

/* ---------- counter ---------- */
var beadsG=$('#beads'),beadEls=[],PROGC=2*Math.PI*132;
(function(){
  el('circle',{cx:200,cy:34,r:11,fill:'#f6c453',stroke:'#fff2c4','stroke-width':2},beadsG);
  for(var i=0;i<108;i++){var an=(-90+(i+1)*(360/109))*Math.PI/180;var c=el('circle',{cx:200+176*Math.cos(an),cy:200+176*Math.sin(an),r:5.2,'class':'bead'},beadsG);beadEls.push(c)}
})();
var chips=$('#chips');
M.forEach(function(m){var b=document.createElement('button');b.className='chip';b.textContent=m.n;b.dataset.id=m.id;b.setAttribute('role','tab');b.onclick=function(){setMantra(m.id,true)};chips.appendChild(b)});

function cnt(){return S.counts[S.mantra]||0}
function tgt(){return S.target>0?S.target:108}
var lastLit=-1;
function render(){
  var c=cnt(),pos=c%108,rounds=Math.floor(c/108),lit=(pos===0&&c>0)?108:pos;
  $('#num').textContent=fmt(c);
  $('#sRounds').textContent=fmt(rounds);$('#sPos').textContent=pos;
  var td=S.days[today()]||0;$('#sToday').textContent=fmt(td);$('#sLife').textContent=fmt(S.life);
  beadEls.forEach(function(b,i){b.classList.toggle('lit',i<lit)});
  if(lit>0&&lit!==lastLit&&lit>lastLit){var bd=beadEls[lit-1];if(bd){bd.classList.add('pop');setTimeout(function(){bd.classList.remove('pop')},180)}}
  lastLit=lit;
  $('#prog').style.strokeDashoffset=PROGC*(1-lit/108);
  var pct=Math.min(100,c/tgt()*100);$('#targetBar').style.width=pct+'%';
  $('#targetTxt').textContent=fmt(c)+' / '+fmt(tgt())+(c>=tgt()?'  ✅ sankalp complete':'');
  var gp=Math.min(100,td/Math.max(1,S.goal)*100);$('#goalBar').style.width=gp+'%';
  $('#goalTxt').textContent=fmt(td)+' of '+fmt(S.goal)+' chants today'+(td>=S.goal?' – goal reached 🙏':'');
  drawWeek();
}
function drawWeek(){
  var w=$('#week');w.innerHTML='';var max=1,days=[],i,d;
  for(i=6;i>=0;i--){d=new Date();d.setDate(d.getDate()-i);days.push({k:ymd(d),l:['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]})}
  days.forEach(function(x){x.v=S.days[x.k]||0;if(x.v>max)max=x.v});
  days.forEach(function(x){var c=document.createElement('div');var bar=document.createElement('i');bar.style.height=Math.max(4,x.v/max*110)+'px';bar.title=x.v+' chants';c.appendChild(bar);var t=document.createElement('span');t.textContent=x.l;c.insertBefore(document.createTextNode(x.v?fmt(x.v):''),bar);c.appendChild(t);w.appendChild(c)});
  var streak=0;d=new Date();if(!(S.days[ymd(d)]>0))d.setDate(d.getDate()-1);
  while(S.days[ymd(d)]>0){streak++;d.setDate(d.getDate()-1)}
  $('#streakTxt').textContent=streak>0?'🔥 '+streak+'-day streak. Keep the flame alive!':'Chant today to begin your streak.';
}
function setMantra(id,scroll){
  S.mantra=id;var m=mById(id);
  $$('.chip').forEach(function(c){var on=c.dataset.id===id;c.classList.toggle('on',on);c.setAttribute('aria-selected',on)});
  var deva=id==='custom'?S.custom.deva:m.d,tr=id==='custom'?S.custom.tr:m.t;
  $('#mDeva').textContent=deva;$('#mDeva').setAttribute('lang','hi');$('#mTr').textContent=tr;
  $('#sub').textContent='tap to chant';lastLit=-1;
  if(id==='custom'&&scroll){var v=prompt('Type your mantra or name to chant:',S.custom.tr==='My mantra'?'':S.custom.tr);if(v){S.custom={deva:'',tr:v};$('#mTr').textContent=v}}
  save();render();
}

/* sound */
var AC=null;
function ctx(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,dur,vol,type,t0){var a=ctx();if(!a)return;var o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.value=f;var t=a.currentTime+(t0||0);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}
function tick(){if(S.sound)tone(520,.09,.05,'triangle')}
function bell(){
  if(!S.sound)return;
  // Multi-harmonic sacred temple bell & conch overtone (432Hz base)
  [432, 864, 1296, 1728, 216].forEach(function(f,i){
    tone(f, 2.8 - i*0.4, 0.12 / (i + 1), i % 2 === 0 ? 'sine' : 'triangle');
  });
}
function vib(p){if(S.vib&&navigator.vibrate)try{navigator.vibrate(p)}catch(e){}}

/* toast + burst */
var toastT;function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show')},2800)}
function burst(n){var em=['🪷','🌸','✨','🕉️','🌼'];if(!HAS_COUNTER)return;var r=$('.tap').getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  for(var i=0;i<n;i++){var s=document.createElement('span');s.className='burst';s.textContent=em[i%em.length];s.style.left=cx+'px';s.style.top=cy+'px';var a=Math.random()*Math.PI*2,d=90+Math.random()*190;s.style.setProperty('--dx',Math.cos(a)*d+'px');s.style.setProperty('--dy',Math.sin(a)*d+'px');document.body.appendChild(s);(function(x){setTimeout(function(){x.remove()},1500)})(s)}}

function tap(ev){
  var c=(S.counts[S.mantra]||0)+1;S.counts[S.mantra]=c;var k=today();S.days[k]=(S.days[k]||0)+1;S.life++;
  tick();vib(12);
  if(c%108===0){bell();vib([60,40,60,40,120]);toast('🙏 Round '+(c/108)+' complete – '+fmt(c)+' chants');burst(14)}
  if(c===S.target){bell();toast('🪔 Sankalp of '+fmt(c)+' complete! Offer it with gratitude.');burst(26)}
  render();save();
}
var tb=$('#tapBtn');
tb.addEventListener('pointerdown',function(e){
  var r=tb.getBoundingClientRect(),d=Math.max(r.width,r.height)*.4,s=document.createElement('span');s.className='ripple';s.style.width=s.style.height=d+'px';s.style.left=(e.clientX-r.left-d/2)+'px';s.style.top=(e.clientY-r.top-d/2)+'px';tb.appendChild(s);setTimeout(function(){s.remove()},650);
  ctx();tap();e.preventDefault();
});
tb.addEventListener('keydown',function(e){e.stopPropagation()});
document.addEventListener('keydown',function(e){
  if(!HAS_COUNTER)return;
  var tn=(e.target.tagName||'').toLowerCase();if(tn==='input'||tn==='select'||tn==='textarea'||tn==='a'||tn==='summary'||(tn==='button'&&e.target!==tb))return;
  if(e.code==='Space'||e.code==='Enter'){e.preventDefault();ctx();tap()}
  else if(e.code==='Backspace'){e.preventDefault();undo()}
});
function undo(){var c=cnt();if(c<=0)return;S.counts[S.mantra]=c-1;var k=today();if(S.days[k]>0)S.days[k]--;if(S.life>0)S.life--;lastLit=-1;render();save()}
$('#undoBtn').onclick=undo;
$('#resetBtn').onclick=function(){if(cnt()===0)return;if(confirm('Reset the count for this mantra? Your daily history and lifetime total are kept.')){S.counts[S.mantra]=0;lastLit=-1;render();save()}};
$('#shareBtn').onclick=function(){var m=mById(S.mantra),t='I chanted '+fmt(cnt())+' '+(S.mantra==='custom'?S.custom.tr:m.n)+' today on Naam Japa Counter 🙏 '+location.href;if(navigator.share){navigator.share({title:'Naam Japa Counter',text:t}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){toast('Copied to clipboard')})}else{prompt('Copy:',t)}};

/* target */
var tsel=$('#target'),tcus=$('#customTarget');
(function(){var found=false;$$('option',tsel).forEach(function(o){if(o.value==S.target)found=true});if(!found&&S.target){tsel.value='custom';tcus.style.display='';tcus.value=S.target}else tsel.value=String(S.target)})();
tsel.onchange=function(){if(tsel.value==='custom'){tcus.style.display='';tcus.focus()}else{tcus.style.display='none';S.target=+tsel.value;render();save()}};
tcus.oninput=function(){var v=parseInt(tcus.value,10);if(v>0){S.target=v;render();save()}};

/* settings */
var oS=$('#optSound'),oV=$('#optVib'),oW=$('#optWake');oS.checked=!!S.sound;oV.checked=!!S.vib;
oS.onchange=function(){S.sound=oS.checked;save();if(S.sound)tone(660,.12,.05)};
oV.onchange=function(){S.vib=oV.checked;save();vib(30)};
var wl=null;oW.onchange=function(){if(oW.checked){if(navigator.wakeLock){navigator.wakeLock.request('screen').then(function(l){wl=l}).catch(function(){toast('Keep-screen-on is not supported here');oW.checked=false})}else{toast('Keep-screen-on is not supported on this browser');oW.checked=false}}else if(wl){wl.release();wl=null}};
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'&&oW.checked&&navigator.wakeLock)navigator.wakeLock.request('screen').then(function(l){wl=l}).catch(function(){})});
$('#goal').value=S.goal;$('#goal').oninput=function(){var v=parseInt(this.value,10);if(v>0){S.goal=v;render();save()}};

/* auto japa */
var autoT=null,aS=$('#autoSpeed');
aS.oninput=function(){$('#autoTxt').textContent=(+aS.value).toFixed(1)+' s / chant';if(autoT){stopAuto();startAuto()}};
function startAuto(){autoT=setInterval(function(){ctx();tap()},aS.value*1000);$('#autoBtn').textContent='⏸ Stop auto'}
function stopAuto(){clearInterval(autoT);autoT=null;$('#autoBtn').textContent='▶ Start auto'}
$('#autoBtn').onclick=function(){autoT?stopAuto():startAuto()};

/* focus mode */
$('#focusBtn').onclick=function(){var on=document.body.classList.toggle('focus');this.textContent=on?'✕ Exit focus':'⛶ Focus mode';if(on){window.scrollTo(0,0);var r=document.documentElement;if(r.requestFullscreen)r.requestFullscreen().catch(function(){})}else if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen()};
document.addEventListener('fullscreenchange',function(){if(!document.fullscreenElement&&document.body.classList.contains('focus')){document.body.classList.remove('focus');$('#focusBtn').textContent='⛶ Focus mode'}});

/* theme */
function applyTheme(){document.documentElement.setAttribute('data-theme',S.theme);$('#themeBtn').textContent=S.theme==='dark'?'🌙':'☀️'}
$('#themeBtn').onclick=function(){S.theme=S.theme==='dark'?'light':'dark';applyTheme();save()};
applyTheme();

/* ---------- tools ---------- */
function showTab(id){$$('.tab').forEach(function(t){t.classList.toggle('on',t.dataset.t===id)});$$('.tool').forEach(function(t){t.classList.toggle('on',t.id===id)})}
$$('.tab').forEach(function(t){t.onclick=function(){showTab(t.dataset.t)}});
$$('footer [data-tab]').forEach(function(a){a.addEventListener('click',function(){showTab(a.dataset.tab)})});
$$('footer [data-m]').forEach(function(a){a.addEventListener('click',function(){setMantra(a.dataset.m,false)})});

/* mantra calculator */
function fmtDur(sec){var h=Math.floor(sec/3600),m=Math.round((sec%3600)/60);if(m===60){h++;m=0}return (h?h+' h ':'')+m+' min'}
function calc(){
  var r=+$('#cRounds').value||0,b=+$('#cBeads').value||0,s=+$('#cSec').value||0,t=+$('#cTarget').value||0;
  var per=r*b,sec=per*s,days=per>0?Math.ceil(t/per):0,end=new Date();end.setDate(end.getDate()+days);
  $('#cOut').innerHTML='<p class="hint">Daily practice</p><div class="big">'+fmt(per)+' chants</div><p>⏱ About <strong>'+fmtDur(sec)+'</strong> per day ('+fmtDur(b*s)+' per round)</p><hr style="border:0;border-top:1px solid var(--card-b);margin:12px 0"><p class="hint">Sankalp of '+fmt(t)+' chants</p><div class="big">'+(per>0?fmt(days)+' days':'–')+'</div><p>'+(per>0?'📅 Finish around <strong>'+end.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})+'</strong> if you chant daily.':'Enter your daily malas.')+'</p>';
}
['cRounds','cBeads','cSec','cTarget'].forEach(function(i){$('#'+i).oninput=calc});calc();

/* Brahma muhurta */
function ymdIn(tz,add){var d=new Date(Date.now()+add*864e5);var p=new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'}).format(d).split('-');return {y:+p[0],m:+p[1],d:+p[2]}}
function sunrise(lat,lon,tz,add){
  var rad=Math.PI/180,p=ymdIn(tz,add),jd0=Date.UTC(p.y,p.m-1,p.d,12)/864e5+2440587.5;
  var n=Math.ceil(jd0-2451545+0.0008),Js=n-lon/360,Mm=(357.5291+0.98560028*Js)%360;
  var C=1.9148*Math.sin(Mm*rad)+0.02*Math.sin(2*Mm*rad)+0.0003*Math.sin(3*Mm*rad);
  var lam=(Mm+C+180+102.9372)%360,Jt=2451545+Js+0.0053*Math.sin(Mm*rad)-0.0069*Math.sin(2*lam*rad);
  var sd=Math.sin(lam*rad)*Math.sin(23.4397*rad),cd=Math.cos(Math.asin(sd));
  var cw=(Math.sin(-0.833*rad)-Math.sin(lat*rad)*sd)/(Math.cos(lat*rad)*cd);
  if(cw>1||cw<-1)return null;
  var w0=Math.acos(cw)/rad,Jr=Jt-w0/360;return (Jr-2440587.5)*864e5;
}
var geo=null;
function bmRender(){
  if($('#bmCity')===DUMMY)return;
  var add=+$('#bmDay').value,man=$('#bmManual').value,sr,tz,label;
  var out=$('#bmOut');
  function f(ms){return new Date(ms).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:tz})}
  if(man){var parts=man.split(':'),d=new Date();d.setDate(d.getDate()+add);d.setHours(+parts[0],+parts[1],0,0);sr=d.getTime();tz=undefined;label='your sunrise'}
  else if(geo){tz=undefined;sr=sunrise(geo.lat,geo.lon,undefined,add);label='your location'}
  else{var c=$('#bmCity').value.split(',');tz='Asia/Kolkata';sr=sunrise(+c[0],+c[1],tz,add);label=$('#bmCity').options[$('#bmCity').selectedIndex].text}
  if(!sr){out.innerHTML='<p>Sunrise could not be calculated for this location. Please enter sunrise manually.</p>';return}
  var s=sr-96*6e4,e=sr-48*6e4;
  var dname=add?'Tomorrow':'Today';
  out.innerHTML='<p class="hint">'+dname+' – '+label+'</p><div class="big">'+f(s)+' – '+f(e)+'</div><p>🌅 Brahma Muhurta window</p><hr style="border:0;border-top:1px solid var(--card-b);margin:12px 0"><p>Sunrise: <strong>'+f(sr)+'</strong></p><p class="hint">Brahma Muhurta = 96 to 48 minutes before sunrise. Timings are calculated approximations; check a local panchang for exact religious observances.</p>';
}
$('#bmCity').onchange=function(){geo=null;bmRender()};$('#bmDay').onchange=bmRender;$('#bmManual').oninput=bmRender;
$('#bmGeo').onclick=function(){if(!navigator.geolocation){toast('Location is not supported');return}navigator.geolocation.getCurrentPosition(function(p){geo={lat:p.coords.latitude,lon:p.coords.longitude};$('#bmManual').value='';bmRender();toast('Using your location')},function(){toast('Location permission denied')})};
bmRender();

/* breathing */
var bT=null,bPh=0,bLeft=0,names=['Inhale','Hold','Exhale','Hold'];
function bStep(){var sec=+$('#bSec').value,br=$('#breath');
  if(bLeft<=0){bPh=(bPh+1)%4;bLeft=sec;br.style.transitionDuration=sec+'s';if(bPh===0)br.style.transform='scale(1.45)';if(bPh===2)br.style.transform='scale(.8)'}
  br.textContent=names[bPh]+' '+bLeft;$('#bInfo').textContent='Phase: '+names[bPh]+' ('+sec+' s each).';bLeft--;
}
$('#bBtn').onclick=function(){var br=$('#breath');if(bT){clearInterval(bT);bT=null;br.textContent='Ready';br.style.transform='scale(1)';this.textContent='▶ Start';return}
  bPh=3;bLeft=0;this.textContent='⏹ Stop';bStep();bT=setInterval(bStep,1000)};

/* cards */
function makeCells(id,key,quarter,persist,chart){
  var box=$('#'+id);var arr=chart?[]:(S.prad||[]);
  for(var i=1;i<=108;i++){(function(i){var c=document.createElement('button');c.className='cell'+(i%27===0?' q':'');c.textContent=i;c.setAttribute('aria-label',(chart?'Number ':'Pradakshina ')+i);
    if(!chart&&arr.indexOf(i)>-1)c.classList.add('on');
    c.onclick=function(){if(chart){$$('#'+id+' .cell').forEach(function(x,j){x.classList.toggle('on',j<i)});return}
      var idx=arr.indexOf(i);if(idx>-1){arr.splice(idx,1);c.classList.remove('on')}else{arr.push(i);c.classList.add('on')}S.prad=arr;save();pradTxt();if(arr.length===108){toast('🛕 108 pradakshinas complete! Jai Shri Radhe');burst(18)}};
    box.appendChild(c)})(i)}
}
function pradTxt(){$('#pradTxt').textContent=(S.prad||[]).length+' / 108 pradakshinas marked'}
if($('#pradCells')!==DUMMY){makeCells('pradCells','prad',true,true,false);pradTxt()}
if($('#chartCells')!==DUMMY){makeCells('chartCells','chart',true,false,true);var cc=$$('#chartCells .cell');var dn=['०','१','२','३','४','५','६','७','८','९'];cc.forEach(function(c,i){var n=String(i+1),dv='';for(var q=0;q<n.length;q++)dv+=dn[+n[q]];c.title=dv})}
$('#pradReset').onclick=function(){if(confirm('Reset your pradakshina card?')){S.prad=[];$$('#pradCells .cell').forEach(function(c){c.classList.remove('on')});save();pradTxt()}};

/* mantra cards */
(function(){var box=$('#mantraCards');M.filter(function(m){return m.id!=='custom'}).forEach(function(m){var d=document.createElement('div');d.className='card mcard reveal';d.innerHTML='<h3>'+m.n+'</h3><div class="deva" lang="hi">'+m.d+'</div><p><em>'+m.t+'</em></p><p><strong>Meaning:</strong> '+m.mean+'</p><p><strong>Often chanted for:</strong> '+m.use+'</p>';var b=document.createElement('button');b.className='small-btn';b.textContent='Use in counter →';b.onclick=function(){setMantra(m.id,false);document.getElementById('counter-sec').scrollIntoView({behavior:'smooth'})};d.appendChild(b);if(m.slug){var l=document.createElement('a');l.href='/'+m.slug+'/';l.textContent='Full guide →';l.style.cssText='margin-left:12px;font-size:.88rem';d.appendChild(l)}box.appendChild(d)})})();

/* reveal + count-up */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
$$('.reveal').forEach(function(r){io.observe(r)});
$$('.count').forEach(function(c){var to=+c.dataset.to,i=0,st=Math.max(1,Math.round(to/50));var t=setInterval(function(){i+=st;if(i>=to){i=to;clearInterval(t)}c.textContent=i},30)});
$('#yr').textContent=new Date().getFullYear();

/* init from hash e.g. #radha */
var pre=document.body.getAttribute('data-mantra'),h=location.hash.replace('#','');var init=M.some(function(m){return m.id===pre})?pre:(M.some(function(m){return m.id===h})?h:S.mantra);if(HAS_COUNTER||$('#mantraCards')!==DUMMY)setMantra(init,false);

/* ---------- site chrome ---------- */
var mb=document.getElementById('menuBtn'),nv=document.getElementById('mainNav');
if(mb&&nv){mb.addEventListener('click',function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o)})}
$$('.dd>button').forEach(function(b){b.addEventListener('click',function(){var p=b.parentNode;p.classList.toggle('open');b.setAttribute('aria-expanded',p.classList.contains('open'))})});

/* repeat writer (likhit japa sheet) */
$$('.repbox').forEach(function(box){
  var txt=box.getAttribute('data-text'),n=+box.getAttribute('data-n')||108,g=box.querySelector('.repgrid'),i;
  for(i=1;i<=n;i++){var s=document.createElement('span');s.innerHTML='<b>'+i+'</b>';s.appendChild(document.createTextNode(txt));g.appendChild(s)}
  var cp=box.querySelector('[data-act=copy]'),pr=box.querySelector('[data-act=print]');
  if(cp)cp.onclick=function(){var all=[];for(var k=0;k<n;k++)all.push(txt);var t=all.join(' ');if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){toast('Copied '+n+' times')});else prompt('Copy:',t)};
  if(pr)pr.onclick=function(){window.print()};
});

/* Brahma muhurta city table */
var bt=document.getElementById('bmTable');
if(bt){
  var rows=$$('tbody tr',bt),dd=document.getElementById('bmDate');
  function fillTable(){
    var p=ymdIn('Asia/Kolkata',1);
    if(dd)dd.textContent=new Date(Date.UTC(p.y,p.m-1,p.d)).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
    rows.forEach(function(r){
      var la=+r.getAttribute('data-lat'),lo=+r.getAttribute('data-lon'),sr=sunrise(la,lo,'Asia/Kolkata',1);
      if(!sr)return;
      function f(ms){return new Date(ms).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:'Asia/Kolkata'})}
      var c=r.children;c[1].textContent=f(sr-96*6e4);c[2].textContent=f(sr-48*6e4);c[3].textContent=f(sr);
    });
  }
  fillTable();
}
/* service worker */
if('serviceWorker' in navigator&&location.protocol==='https:'){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}

/* Full-screen tap for Zen chanting */
document.addEventListener('pointerdown', function(e) {
  if (!HAS_COUNTER) return;
  // Ignore clicks on buttons, inputs, links, chips, modals, controls
  if (e.target.closest('button, a, input, select, textarea, label, .chips, .menu, nav, footer, .controls, .stat')) return;
  // If in focus mode or anywhere on dial/counter background
  if (document.body.classList.contains('focus') || e.target.closest('.dial')) {
    ctx();
    tap();
  }
});

/* (install banner removed – see /naam-japa-counter-app/ for install steps) */

/* ---------- Meditative Audio Chanting Loop (Dwell Time Hook) ---------- */
var droneActive = false;
var droneNodes = null;
var loopActive = false;
var loopTimer = null;
var loopCount = 0;
var loopMax = 108;
var sessionSeconds = 0;
var sessionTimer = null;

function startDrone() {
  var a = ctx();
  if (!a) return;
  stopDrone();
  try {
    var osc1 = a.createOscillator();
    var osc2 = a.createOscillator();
    var osc3 = a.createOscillator();
    var masterGain = a.createGain();
    var filter = a.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(136.1, a.currentTime); // 136.1 Hz Cosmic Om / Tanpura root

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(204.15, a.currentTime); // 5th Harmonic resonance

    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(68.05, a.currentTime); // Sub-bass warmth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, a.currentTime);

    masterGain.gain.setValueAtTime(0.001, a.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.09, a.currentTime + 2.5);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(a.destination);

    osc1.start();
    osc2.start();
    osc3.start();

    droneNodes = { osc1: osc1, osc2: osc2, osc3: osc3, gain: masterGain };
    droneActive = true;
    updateAudioUI();
  } catch(e) {}
}

function stopDrone() {
  if (droneNodes) {
    try {
      var a = ctx();
      if (a && droneNodes.gain) {
        droneNodes.gain.gain.setValueAtTime(droneNodes.gain.gain.value, a.currentTime);
        droneNodes.gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 1.0);
        setTimeout(function() {
          try {
            if (droneNodes) {
              droneNodes.osc1.stop();
              droneNodes.osc2.stop();
              droneNodes.osc3.stop();
              droneNodes = null;
            }
          } catch(e) {}
        }, 1100);
      }
    } catch(e) { droneNodes = null; }
  }
  droneActive = false;
  updateAudioUI();
}

function speakMantra(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    var ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'hi-IN';
    ut.rate = 0.88;
    ut.pitch = 0.95;
    window.speechSynthesis.speak(ut);
  } catch(e) {}
}

window.toggleChantLoop = function() {
  if (loopActive) {
    stopChantLoop();
  } else {
    var modeSelect = document.getElementById('audioLoopMode');
    startChantLoop(modeSelect ? modeSelect.value : '108');
  }
};

window.toggleDroneOnly = function() {
  if (droneActive && !loopActive) {
    stopDrone();
  } else {
    startDrone();
  }
  updateAudioUI();
};

function startChantLoop(mode) {
  ctx();
  stopChantLoop();
  loopActive = true;
  loopCount = 0;
  
  if (mode === '108') loopMax = 108;
  else if (mode === '540') loopMax = 540;
  else if (mode === '1008') loopMax = 1008;
  else loopMax = 999999;

  // Auto screen lock prevent
  if (navigator.wakeLock && !wl) {
    navigator.wakeLock.request('screen').then(function(l){ wl = l; if(oW) oW.checked = true; }).catch(function(){});
  }

  // Start Om Drone
  var tanpuraCheck = document.getElementById('optTanpura');
  if (!tanpuraCheck || tanpuraCheck.checked) {
    startDrone();
  }

  // Session duration timer
  sessionSeconds = 0;
  if (sessionTimer) clearInterval(sessionTimer);
  sessionTimer = setInterval(function() {
    sessionSeconds++;
    var m = Math.floor(sessionSeconds / 60);
    var s = sessionSeconds % 60;
    var el = document.getElementById('audioSessionTime');
    if (el) el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }, 1000);

  function loopTick() {
    if (!loopActive) return;
    tap();
    loopCount++;

    var voiceCheck = document.getElementById('optChantVoice');
    if (voiceCheck && voiceCheck.checked) {
      var m = mById(S.mantra);
      var chantPhrase = (S.mantra === 'custom' ? S.custom.tr : (m.d || m.t));
      speakMantra(chantPhrase);
    }

    if (loopCount >= loopMax) {
      stopChantLoop();
      toast('🙏 Guided ' + fmt(loopMax) + ' chant loop complete!');
      return;
    }

    var speed = (aS && +aS.value) ? +aS.value : 3.0;
    loopTimer = setTimeout(loopTick, speed * 1000);
  }

  loopTick();
  updateAudioUI();
}

function stopChantLoop() {
  loopActive = false;
  if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
  if (sessionTimer) { clearInterval(sessionTimer); sessionTimer = null; }
  if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch(e) {} }
  stopDrone();
  updateAudioUI();
}

function updateAudioUI() {
  var btn = document.getElementById('chantLoopBtn');
  var eq = document.getElementById('audioEq');
  var status = document.getElementById('audioLoopStatus');
  var dBtn = document.getElementById('ambientDroneBtn');
  if (btn) {
    btn.innerHTML = loopActive ? '⏹ Stop Chant Loop' : '▶ Start 108 Chant Loop';
    btn.classList.toggle('active', loopActive);
  }
  if (dBtn) {
    dBtn.textContent = (droneActive && !loopActive) ? '⏹ Stop Drone' : '🪕 Om Drone Only';
  }
  if (eq) {
    eq.classList.toggle('playing', loopActive || droneActive);
  }
  if (status) {
    if (loopActive) {
      status.textContent = 'Loop running • ' + loopCount + ' / ' + (loopMax > 10000 ? '∞' : loopMax);
    } else if (droneActive) {
      status.textContent = 'Meditative Om drone active';
    } else {
      status.textContent = 'Audio loop ready';
    }
  }
}


/* ---------- Multi-Language Toggle (Default: English) ---------- */
var currentLang = 'en';
var PAGE_HI = (document.documentElement.getAttribute('lang') === 'hi');
try {
  var savedLang = localStorage.getItem('njs_lang');
  if (savedLang === 'hi' || savedLang === 'en') {
    currentLang = savedLang;
  }
} catch(e) {}
if (PAGE_HI) currentLang = 'hi';

var T_DICT = {
  hi: {
    langBtn: 'A / अ English',
    subTap: 'जाप के लिए दबाएं',
    sRounds: 'पूरी हुई मालाएं',
    sPos: 'इस माला में गिने गए',
    sToday: 'आज का कुल जाप',
    sLife: 'आजीवन कुल जाप',
    pTarget: '🎯 संकल्प (माला लक्ष्य)',
    pSettings: '⚙️ सेटिंग्स',
    pAudio: '🎧 ऑडियो जाप लूप व ध्यान',
    pGoal: '📅 दैनिक लक्ष्य व स्ट्रीक',
    swSound: '🔔 ध्वनि (Sound)',
    swVib: '📳 कंपन (Vibration)',
    swWake: '💡 स्क्रीन चालू रखें',
    swVoice: '🎙️ मंत्र ध्वनि',
    swDrone: '🪕 ॐ तानपुरा',
    btnUndo: '↶ पूर्ववत (Undo)',
    btnReset: '⟲ रीसेट (Reset)',
    btnFocus: '⛶ शांत ध्यान मोड',
    btnFocusExit: '✕ ध्यान मोड बंद करें',
    btnShare: '📤 शेयर करें',
    btnLoopStart: '▶ १०८ जाप लूप शुरू करें',
    btnLoopStop: '⏹ जाप लूप रोकें',
    btnDroneOnly: '🪕 केवल ॐ ध्वनि',
    btnDroneStop: '⏹ ॐ ध्वनि रोकें',
    audioReady: 'ऑडियो लूप तैयार है',
    tabCalc: '🧮 मंत्र कैलकुलेटर',
    tabBm: '🌅 ब्रह्म मुहूर्त समय',
    tabBreath: '🌬️ प्राणायाम (श्वास)',
    tabPrad: '🛕 १०८ परिक्रमा कार्ड',
    tab108: '🔢 १ से १०८ गिनती'
  },
  en: {
    langBtn: 'अ / A हिंदी',
    subTap: 'tap to chant',
    sRounds: 'Rounds of 108',
    sPos: 'In this round',
    sToday: 'Today (all)',
    sLife: 'Lifetime',
    pTarget: '🎯 Sankalp (target)',
    pSettings: '⚙️ Settings',
    pAudio: '🎧 Audio Chanting Loop & Auto Japa',
    pGoal: '📅 Daily goal & streak',
    swSound: '🔔 Sound',
    swVib: '📳 Vibration',
    swWake: '💡 Keep screen on',
    swVoice: '🎙️ Mantra voice',
    swDrone: '🪕 Om drone',
    btnUndo: '↶ Undo',
    btnReset: '⟲ Reset',
    btnFocus: '⛶ Focus mode',
    btnFocusExit: '✕ Exit focus',
    btnShare: '📤 Share',
    btnLoopStart: '▶ Start 108 Chant Loop',
    btnLoopStop: '⏹ Stop Chant Loop',
    btnDroneOnly: '🪕 Om drone only',
    btnDroneStop: '⏹ Stop Drone',
    audioReady: 'Audio loop ready',
    tabCalc: '🧮 Mantra Calculator',
    tabBm: '🌅 Brahma Muhurta',
    tabBreath: '🌬️ Sama Vritti Pranayama',
    tabPrad: '🛕 108 Pradakshina Card',
    tab108: '🔢 1 to 108 Counting'
  }
};


var EXTRA_HI = {
  opt: {'27':'२७ – पाव माला','54':'५४ – आधी माला','108':'१०८ – एक पूरी माला','216':'२१६ – दो माला','540':'५४० – पाँच माला','1008':'१००८ – दस माला','custom':'अपनी संख्या…'},
  loop: {'108':'१०८ जाप (१ माला)','540':'५४० जाप (५ माला)','1008':'१००८ जाप (१० माला)','infinite':'लगातार जाप लूप'},
  goal: 'दैनिक लक्ष्य (जाप)',
  priv: '🔒 आपकी गिनती सिर्फ़ आपके इस डिवाइस के ब्राउज़र में सेव होती है। कोई खाता या सर्वर नहीं।',
  audio: 'लगातार १०८ जाप का लूप और ध्यान के लिए ॐ ध्वनि। जाप के समय स्क्रीन चालू रहती है।',
  ph: 'अपनी संख्या'
};
function applyExtra(lang) {
  var hi = (lang === 'hi');
  function sv(el, key, val) { if (!el) return; if (el.getAttribute('data-en-' + key) === null) el.setAttribute('data-en-' + key, el.textContent); el.textContent = hi ? val : el.getAttribute('data-en-' + key); }
  $$('#target option').forEach(function(o) { var v = EXTRA_HI.opt[o.value]; if (v) sv(o, 'o', v); });
  $$('#audioLoopMode option').forEach(function(o) { var v = EXTRA_HI.loop[o.value]; if (v) sv(o, 'o', v); });
  $$('label.hint').forEach(function(l) { if (l.getAttribute('for') === 'goal') sv(l, 'g', EXTRA_HI.goal); });
  $$('.hint').forEach(function(h) {
    var t0 = h.getAttribute('data-en-h') || h.textContent;
    if (t0.indexOf('Your counts are saved only') !== -1) sv(h, 'h', EXTRA_HI.priv);
    else if (t0.indexOf('Continuous 108-chant loop') !== -1) sv(h, 'h', EXTRA_HI.audio);
  });
}
function applyLanguage(lang) {
  currentLang = lang;
  try { localStorage.setItem('njs_lang', lang); } catch(e) {}
  var t = T_DICT[lang] || T_DICT.en;

  var lb = document.getElementById('langBtn');
  if (lb) lb.textContent = t.langBtn;

  var sub = document.getElementById('sub');
  if (sub && !loopActive) sub.textContent = t.subTap;

  var u = document.getElementById('undoBtn');
  if (u) u.textContent = t.btnUndo;

  var r = document.getElementById('resetBtn');
  if (r) r.textContent = t.btnReset;

  var f = document.getElementById('focusBtn');
  if (f) {
    var isFocus = document.body.classList.contains('focus');
    f.textContent = isFocus ? t.btnFocusExit : t.btnFocus;
  }

  var sh = document.getElementById('shareBtn');
  if (sh) sh.textContent = t.btnShare;

  var clb = document.getElementById('chantLoopBtn');
  if (clb) clb.textContent = loopActive ? t.btnLoopStop : t.btnLoopStart;

  var adb = document.getElementById('ambientDroneBtn');
  if (adb) adb.textContent = (droneActive && !loopActive) ? t.btnDroneStop : t.btnDroneOnly;

  var asr = document.getElementById('audioLoopStatus');
  if (asr && !loopActive && !droneActive) asr.textContent = t.audioReady;

  var rSpan = document.querySelector('#sRounds + span');
  if (rSpan) rSpan.textContent = t.sRounds;

  var pSpan = document.querySelector('#sPos + span');
  if (pSpan) pSpan.textContent = t.sPos;

  var tSpan = document.querySelector('#sToday + span');
  if (tSpan) tSpan.textContent = t.sToday;

  var lSpan = document.querySelector('#sLife + span');
  if (lSpan) lSpan.textContent = t.sLife;

  // Switches
  var sw1 = document.querySelector('label[for="optSound"], label:has(#optSound)');
  if (sw1) {
    var ch1 = sw1.querySelector('input');
    sw1.innerHTML = '';
    if (ch1) sw1.appendChild(ch1);
    sw1.appendChild(document.createTextNode(' ' + t.swSound));
  }
  var sw2 = document.querySelector('label[for="optVib"], label:has(#optVib)');
  if (sw2) {
    var ch2 = sw2.querySelector('input');
    sw2.innerHTML = '';
    if (ch2) sw2.appendChild(ch2);
    sw2.appendChild(document.createTextNode(' ' + t.swVib));
  }
  var sw3 = document.querySelector('label[for="optWake"], label:has(#optWake)');
  if (sw3) {
    var ch3 = sw3.querySelector('input');
    sw3.innerHTML = '';
    if (ch3) sw3.appendChild(ch3);
    sw3.appendChild(document.createTextNode(' ' + t.swWake));
  }
  var sw4 = document.querySelector('label:has(#optChantVoice)');
  if (sw4) {
    var ch4 = sw4.querySelector('input');
    sw4.innerHTML = '';
    if (ch4) sw4.appendChild(ch4);
    sw4.appendChild(document.createTextNode(' ' + t.swVoice));
  }
  var sw5 = document.querySelector('label:has(#optTanpura)');
  if (sw5) {
    var ch5 = sw5.querySelector('input');
    sw5.innerHTML = '';
    if (ch5) sw5.appendChild(ch5);
    sw5.appendChild(document.createTextNode(' ' + t.swDrone));
  }

  // Panel titles
  $$('.panel-title').forEach(function(pt) {
    var txt = pt.textContent;
    if (txt.indexOf('Sankalp') !== -1 || txt.indexOf('संकल्प') !== -1) pt.textContent = t.pTarget;
    else if (txt.indexOf('Settings') !== -1 || txt.indexOf('सेटिंग्स') !== -1) pt.textContent = t.pSettings;
    else if (txt.indexOf('Audio') !== -1 || txt.indexOf('ऑडियो') !== -1) pt.textContent = t.pAudio;
    else if (txt.indexOf('Daily goal') !== -1 || txt.indexOf('दैनिक लक्ष्य') !== -1) pt.textContent = t.pGoal;
  });

  applyExtra(lang);

  // Tab buttons
  $$('.tab').forEach(function(tb) {
    var dt = tb.getAttribute('data-t');
    if (dt === 't-calc') tb.textContent = t.tabCalc;
    else if (dt === 't-bm') tb.textContent = t.tabBm;
    else if (dt === 't-breath') tb.textContent = t.tabBreath;
    else if (dt === 't-prad') tb.textContent = t.tabPrad;
    else if (dt === 't-108') tb.textContent = t.tab108;
  });
}

// Attach click listener to langBtn
document.addEventListener('click', function(e) {
  var b = e.target.closest('#langBtn');
  if (b) {
    var next = (currentLang === 'en') ? 'hi' : 'en';
    applyLanguage(next);
    toast(next === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है 🙏' : 'Switched to English');
  }
});

// Run once on init
setTimeout(function() {
  applyLanguage(currentLang);
}, 10);

})();