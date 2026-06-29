// ── DATA: Municipalities ──
const MUNICIPALITIES=[ {name:"Malolos",type:"City",district:"1st",population:282428,icon:"🏙"},
{name:"Meycauayan",type:"City",district:"2nd",population:366493,icon:"🏙"}, {name:"San Jose del Monte",type:"City",district:"5th",population:651813,icon:"🏙"},
{name:"Angat",type:"Municipality",district:"4th",population:53699,icon:"🏘"}, {name:"Balagtas",type:"Municipality",district:"2nd",population:128064,icon:"🏘"},
{name:"Baliuag",type:"Municipality",district:"3rd",population:203510,icon:"🏘"}, {name:"Bocaue",type:"Municipality",district:"2nd",population:131666,icon:"🏘"},
{name:"Bulacan",type:"Municipality",district:"2nd",population:80478,icon:"🏘"}, {name:"Calumpit",type:"Municipality",district:"1st",population:134052,icon:"🏘"},
{name:"Doña Remedios Trinidad",type:"Municipality",district:"4th",population:11907,icon:"🏘"}, {name:"Guiguinto",type:"Municipality",district:"2nd",population:115829,icon:"🏘"},
{name:"Hagonoy",type:"Municipality",district:"1st",population:130709,icon:"🏘"}, {name:"Marilao",type:"Municipality",district:"2nd",population:218898,icon:"🏘"},
{name:"Norzagaray",type:"Municipality",district:"4th",population:126342,icon:"🏘"}, {name:"Obando",type:"Municipality",district:"2nd",population:75455,icon:"🏘"},
{name:"Pandi",type:"Municipality",district:"5th",population:100042,icon:"🏘"}, {name:"Paombong",type:"Municipality",district:"1st",population:60534,icon:"🏘"},
{name:"Plaridel",type:"Municipality",district:"3rd",population:133217,icon:"🏘"}, {name:"Pulilan",type:"Municipality",district:"3rd",population:130501,icon:"🏘"},
{name:"San Ildefonso",type:"Municipality",district:"3rd",population:128421,icon:"🏘"}, {name:"San Miguel",type:"Municipality",district:"4th",population:151624,icon:"🏘"},
{name:"San Rafael",type:"Municipality",district:"4th",population:112890,icon:"🏘"}, {name:"Sta. Maria",type:"Municipality",district:"5th",population:251478,icon:"🏘"},
]; const MUNIS_UNIQUE=MUNICIPALITIES.filter((m,i,a)=>a.findIndex(x=>x.name===m.name)===i);

// ── AUTH ──
let users=[{id:1,fname:"Admin",lname:"SaKay",email:"admin@sakay.ph",password:"bulacan2025",municipality:"Malolos",role:"admin"}]; let currentUser=null;
function hashPw(pw){return btoa(pw+"sakay_bulacan_2025");} function switchAuthTab(tab){
["login","signup"].forEach(t=>{document.getElementById("at-"+t).classList.toggle("active",t===tab);document.getElementById("panel-"+t).classList.toggle("active",t===tab);}); ["le-email","le-password","le-global","se-fname","se-lname","se-email","se-muni","se-password","se-confirm","se-global"].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent="";});
} function goToAuth(tab){showScreen("screen-auth");switchAuthTab(tab||"login");}
function doLogin(){ const email=document.getElementById("l-email").value.trim().toLowerCase();
const pw=document.getElementById("l-password").value; let v=true;const e=(id,m)=>{document.getElementById(id).textContent=m;v=false;};const c=id=>document.getElementById(id).textContent="";
email?c("le-email"):e("le-email","Email is required"); pw?c("le-password"):e("le-password","Password is required");
if(!v)return; const user=users.find(u=>u.email.toLowerCase()===email&&(u.password===pw||u.password===hashPw(pw)));
if(!user){document.getElementById("le-global").textContent="❌ Incorrect email or password.";return;} currentUser=user;launchApp();
} function doSignup(){
const fname=document.getElementById("s-fname").value.trim(),lname=document.getElementById("s-lname").value.trim(); const email=document.getElementById("s-email").value.trim().toLowerCase(),muni=document.getElementById("s-muni").value;
const pw=document.getElementById("s-password").value,conf=document.getElementById("s-confirm").value; let v=true;const e=(id,m)=>{document.getElementById(id).textContent=m;v=false;};const c=id=>document.getElementById(id).textContent="";
fname?c("se-fname"):e("se-fname","Required"); lname?c("se-lname"):e("se-lname","Required");
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?c("se-email"):e("se-email","Valid email required"); muni?c("se-muni"):e("se-muni","Please select your municipality");
pw.length>=6?c("se-password"):e("se-password","Min. 6 characters"); pw===conf?c("se-confirm"):e("se-confirm","Passwords do not match");
if(!v)return; if(users.find(u=>u.email.toLowerCase()===email)){document.getElementById("se-global").textContent="❌ Email already registered.";return;}
const nu={id:users.length+1,fname,lname,email,password:hashPw(pw),municipality:muni,role:"user"}; users.push(nu);currentUser=nu;launchApp();
} function doLogout(){
currentUser=null;closeProfile();showScreen("screen-splash"); document.getElementById("l-email").value="";document.getElementById("l-password").value="";
showToast("👋 Signed out"); }
function launchApp(){ populateMunicipalityDropdowns();showScreen("screen-app");
const initials=(currentUser.fname[0]+(currentUser.lname||"")[0]||"").toUpperCase(); document.getElementById("user-av").textContent=initials;
document.getElementById("user-name-display").textContent=currentUser.fname; renderDashboard();renderMunicipalities();updateHeaderStats();
}

// ── SCREEN ROUTING ──
function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");}

// ── DATA: Routes & Bookings ──
let routes=[ {id:1,code:"BUL-001",name:"Malolos → EDSA Monumento",type:"Bus",fare:55,duration:75,stops:["Malolos City Hall","Calumpit","Meycauayan","Valenzuela","EDSA Monumento"],status:"Active",createdAt:"2025-01-05"},
{id:2,code:"BUL-002",name:"San Jose del Monte → Trinoma (via NLEX)",type:"Bus",fare:130,duration:90,stops:["San Jose del Monte","Bocaue","Marilao","Meycauayan","NLEX","Trinoma"],status:"Active",createdAt:"2025-01-08"}, {id:3,code:"BUL-003",name:"Malolos → Bocaue",type:"Jeepney",fare:18,duration:35,stops:["Malolos Supermarket","Calumpit Junction","Hagonoy Road","Bocaue Palengke"],status:"Active",createdAt:"2025-01-10"},
{id:4,code:"BUL-004",name:"San Jose del Monte → Fairview",type:"UV Express",fare:65,duration:50,stops:["SJDM City Hall","Muzon","Sta. Maria","Fairview"],status:"Active",createdAt:"2025-01-12"}, {id:5,code:"BUL-005",name:"Balagtas → Cubao",type:"FX / AUV",fare:80,duration:65,stops:["Balagtas","Guiguinto","Marilao","Meycauayan","Cubao"],status:"Active",createdAt:"2025-01-15"},
{id:6,code:"BUL-006",name:"Plaridel → Malolos",type:"Tricycle",fare:12,duration:20,stops:["Plaridel Town Center","Pulilan","Calumpit","Malolos"],status:"Active",createdAt:"2025-01-18"}, {id:7,code:"BUL-007",name:"Bulacan E-Jeep (Malolos Loop)",type:"E-Jeep",fare:10,duration:25,stops:["Malolos Station","Barasoain","Paseo de Malolos","City Hall","Malolos Station"],status:"Inactive",createdAt:"2025-02-01"},
{id:8,code:"BUL-008",name:"Baliuag → Cubao",type:"Bus",fare:95,duration:80,stops:["Baliuag","San Ildefonso","Plaridel","Bocaue","NLEX","Cubao"],status:"Active",createdAt:"2025-02-10"}, {id:9,code:"BUL-009",name:"Norzagaray → Fairview",type:"UV Express",fare:70,duration:55,stops:["Norzagaray","Angat","San Rafael","Fairview"],status:"Active",createdAt:"2025-03-01"},
{id:10,code:"BUL-010",name:"Obando → Navotas",type:"Jeepney",fare:22,duration:30,stops:["Obando","Paombong","Hagonoy","Navotas Fish Port"],status:"Active",createdAt:"2025-03-15"}, ];
let bookings=[ {id:1,ref:"SK-2025-001",passenger:"Maria Clara Santos",routeId:1,route:"Malolos → EDSA Monumento",date:"2025-06-28",time:"06:00",seats:1,fare:55,status:"Confirmed"},
{id:2,ref:"SK-2025-002",passenger:"Jose Rizal dela Cruz",routeId:2,route:"San Jose del Monte → Trinoma (via NLEX)",date:"2025-06-28",time:"07:30",seats:2,fare:260,status:"Pending"}, {id:3,ref:"SK-2025-003",passenger:"Ana Reyes Bulacan",routeId:4,route:"San Jose del Monte → Fairview",date:"2025-06-29",time:"08:00",seats:1,fare:65,status:"Confirmed"},
{id:4,ref:"SK-2025-004",passenger:"Pedro Mabini Garcia",routeId:3,route:"Malolos → Bocaue",date:"2025-06-29",time:"09:15",seats:3,fare:54,status:"Pending"}, ];
let bookingFilter="All",editingRouteId=null,editingBookingId=null,muniFilter="all"; let nextRouteId=11,nextBookingId=5,nextRefNum=5;

// ── DROPDOWNS ──
function populateMunicipalityDropdowns(){ const sel=document.getElementById("s-muni");if(!sel)return;
sel.innerHTML='<option value="">— Select your municipality —</option>'; const cities=MUNIS_UNIQUE.filter(m=>m.type==="City"),munis=MUNIS_UNIQUE.filter(m=>m.type==="Municipality");
const og1=document.createElement("optgroup");og1.label="🏙 Cities"; cities.forEach(m=>{const o=document.createElement("option");o.value=m.name;o.textContent=m.name+" (City)";og1.appendChild(o);});
const og2=document.createElement("optgroup");og2.label="🏘 Municipalities"; munis.forEach(m=>{const o=document.createElement("option");o.value=m.name;o.textContent=m.name;og2.appendChild(o);});
sel.appendChild(og1);sel.appendChild(og2); }
populateMunicipalityDropdowns();

// ── TAB SWITCHING ──
function switchTab(tab){ ["dashboard","routes","bookings","planner","municipalities"].forEach(t=>{
document.getElementById("view-"+t).classList.toggle("active",t===tab); document.getElementById("tab-"+t).classList.toggle("active",t===tab);
}); if(tab==="dashboard")renderDashboard();
if(tab==="routes")renderRoutes(); if(tab==="bookings")renderBookings();
if(tab==="planner")document.getElementById("trip-results").innerHTML=""; if(tab==="municipalities")renderMunicipalities();
}

// ── DASHBOARD ──
function renderDashboard(){ if(!currentUser)return;
const activeR=routes.filter(r=>r.status==="Active").length; const confirmedB=bookings.filter(b=>b.status==="Confirmed").length;
const revenue=bookings.filter(b=>b.status==="Confirmed").reduce((s,b)=>s+b.fare,0); const pending=bookings.filter(b=>b.status==="Pending").length;
document.getElementById("d-routes").textContent=routes.length; document.getElementById("d-routes-sub").textContent=activeR+" active";
document.getElementById("d-bookings").textContent=bookings.length; document.getElementById("d-bookings-sub").textContent=confirmedB+" confirmed";
document.getElementById("d-revenue").textContent="₱"+revenue.toLocaleString(); document.getElementById("d-pending").textContent=pending;
updateHeaderStats(); document.getElementById("welcome-banner-wrap").innerHTML=`<div class="welcome-banner"><div class="wb-icon">👋</div><div class="wb-text"><h3>Welcome, ${escH(currentUser.fname)}!</h3><p>📍 ${escH(currentUser.municipality)} · ${currentUser.role==="admin"?"Admin":"Passenger"}</p></div></div>`;
const types={};routes.forEach(r=>types[r.type]=(types[r.type]||0)+1); document.getElementById("fleet-chart").innerHTML=Object.entries(types).map(([t,c])=>`<div class="prog-row"><div class="prog-label">${t}</div><div class="prog-bar"><div class="prog-fill" style="width:${Math.round(c/routes.length*100)}%"></div></div><div class="prog-count">${c}</div></div>`).join("")||"<p style='color:var(--muted);font-size:12px'>No routes yet.</p>";
const allStops=[...new Set(routes.flatMap(r=>r.stops))]; const towns=[...new Set(allStops.map(s=>s.split(" ")[0]))].slice(0,20);
document.getElementById("coverage-areas").innerHTML=towns.map(t=>`<span class="stop-chip">${escH(t)}</span>`).join(""); }

// ── MUNICIPALITIES ──
function setMuniFilter(f,el){muniFilter=f;document.querySelectorAll("#view-municipalities .pill").forEach(p=>p.classList.remove("active"));el.classList.add("active");renderMunicipalities();} function renderMunicipalities(){
const q=(document.getElementById("muni-search")?.value||"").toLowerCase(); const filtered=MUNIS_UNIQUE.filter(m=>{
const mq=m.name.toLowerCase().includes(q)||m.district.toLowerCase().includes(q); const mt=muniFilter==="all"||m.type===muniFilter;
return mq&&mt; });
const el=document.getElementById("muni-count-badge");if(el)el.textContent=filtered.length; const g=document.getElementById("muni-grid");if(!g)return;
g.innerHTML=filtered.map(m=>`<div class="muni-card" style="border-left:3px solid ${m.type==="City"?"#0d2b4e":"#1a4a7a"}"> <div class="muni-name">${m.icon} ${escH(m.name)}</div>
<div class="muni-type-row"><span class="badge ${m.type==="City"?"bg-blue":"bg-gray"}" style="font-size:9px;padding:1px 7px">${m.type}</span><span style="font-size:10px;color:var(--muted)">${m.district} Dist.</span></div> <div class="muni-pop">Pop. ~${m.population.toLocaleString()}</div></div>`).join("");
}

// ── TRIP PLANNER ──
function allStopNames(){return[...new Set(routes.flatMap(r=>r.stops))].sort();} function acSuggest(inputId,listId){
const q=document.getElementById(inputId).value.trim().toLowerCase(); const list=document.getElementById(listId);
if(!q||q.length<2){list.style.display="none";return;} const all=[...new Set([...MUNIS_UNIQUE.map(m=>m.name),...allStopNames()])];
const matches=all.filter(s=>s.toLowerCase().includes(q)).slice(0,7); if(!matches.length){list.style.display="none";return;}
list.innerHTML=matches.map(s=>`<div class="ac-item" onmousedown="pickAc('${inputId}','${listId}','${s.replace(/'/g,"\\'")}')">📍 ${escH(s)}</div>`).join(""); list.style.display="";
} function pickAc(inputId,listId,val){document.getElementById(inputId).value=val;document.getElementById(listId).style.display="none";}
function bookingAcSuggest(inputId,listId){ const q=document.getElementById(inputId).value.trim().toLowerCase();
const list=document.getElementById(listId); if(!q||q.length<2){list.style.display="none";return;}
const all=[...new Set([...MUNIS_UNIQUE.map(m=>m.name),...allStopNames()])]; const matches=all.filter(s=>s.toLowerCase().includes(q)).slice(0,6);
if(!matches.length){list.style.display="none";return;} list.innerHTML=matches.map(s=>`<div class="ac-item" onmousedown="pickAc('${inputId}','${listId}','${s.replace(/'/g,"\\'")}')">📍 ${escH(s)}</div>`).join("");
list.style.display=""; }
function swapLocations(){const f=document.getElementById("trip-from"),t=document.getElementById("trip-to");[f.value,t.value]=[t.value,f.value];} function searchTrip(){
["ac-from","ac-to"].forEach(id=>document.getElementById(id).style.display="none"); const fromRaw=document.getElementById("trip-from").value.trim().toLowerCase();
const toRaw=document.getElementById("trip-to").value.trim().toLowerCase(); const resultsEl=document.getElementById("trip-results");
if(!fromRaw&&!toRaw){resultsEl.innerHTML=`<div class="no-results"><div class="nr-icon">📍</div><p>Enter your location and destination to find routes.</p></div>`;return;} const typeIcons={Bus:"🚌",Jeepney:"🚐","UV Express":"🚖",Tricycle:"🛺","FX / AUV":"🚗","E-Jeep":"⚡"};
const typeBg={Bus:"#0d2b4e",Jeepney:"#065f46","UV Express":"#7c3aed",Tricycle:"#b45309","FX / AUV":"#0e7490","E-Jeep":"#065f46"}; const matched=[];
routes.filter(r=>r.status==="Active").forEach(r=>{ const stops=r.stops;let fromIdx=-1,toIdx=-1;
if(fromRaw)fromIdx=stops.findIndex(s=>s.toLowerCase().includes(fromRaw)); if(toRaw){const sf=fromIdx>=0?fromIdx+1:0;for(let i=sf;i<stops.length;i++){if(stops[i].toLowerCase().includes(toRaw)){toIdx=i;break;}}if(toIdx<0&&fromIdx<0)toIdx=stops.findIndex(s=>s.toLowerCase().includes(toRaw));}
if(fromRaw&&toRaw&&fromIdx>=0&&toIdx>fromIdx)matched.push({route:r,fromIdx,toIdx,fromStop:stops[fromIdx],toStop:stops[toIdx]}); else if(fromRaw&&!toRaw&&fromIdx>=0)matched.push({route:r,fromIdx,toIdx:stops.length-1,fromStop:stops[fromIdx],toStop:stops[stops.length-1]});
else if(!fromRaw&&toRaw&&toIdx>=0)matched.push({route:r,fromIdx:0,toIdx,fromStop:stops[0],toStop:stops[toIdx]}); });
if(!matched.length){resultsEl.innerHTML=`<div class="no-results"><div class="nr-icon">🔍</div><p>No routes found from <strong>"${escH(fromRaw||"—")}"</strong> to <strong>"${escH(toRaw||"—")}"</strong>.<br><br>Try broader terms or check the Routes tab.</p></div>`;return;} resultsEl.innerHTML=`<p style="font-size:11px;color:var(--muted);margin-bottom:10px;font-weight:700">${matched.length} route${matched.length>1?"s":""} found</p>`+
matched.map(({route:r,fromIdx,toIdx})=>{ const sIT=r.stops.slice(fromIdx,toIdx+1);
const stH=sIT.map((s,i)=>{ const dc=i===0?"origin":i===sIT.length-1?"dest":"stop";
const num=i===0?"A":i===sIT.length-1?"B":i; return `<div class="journey-step"><div class="step-dot ${dc}">${num}</div><div class="step-label"><strong>${escH(s)}</strong><span class="step-tag">${i===0?"Your location":i===sIT.length-1?"Your destination":"Stop"}</span></div></div>`;
}).join(""); const td=Math.round(r.duration*(sIT.length-1)/Math.max(r.stops.length-1,1));
return `<div class="trip-result-card"><div class="trh"><div class="tr-icon" style="background:${typeBg[r.type]||"#0d2b4e"}">${typeIcons[r.type]||"🚌"}</div><div><div class="tr-name">${escH(r.name)}</div><div class="tr-code">${escH(r.code)} · ${escH(r.type)}</div></div><span class="badge bg-green" style="margin-left:auto">Active</span></div><div class="trip-journey">${stH}</div><div class="trip-footer"><span>⏱ ~${td}min</span><span>📍 ${sIT.length} stops</span><span>₱${r.fare}</span><button class="book-this-btn" onclick="bookFromPlanner(${r.id},'${escH(sIT[0]).replace(/'/g,"\\'")}','${escH(sIT[sIT.length-1]).replace(/'/g,"\\'")}')">Book →</button></div></div>`; }).join("");
} function bookFromPlanner(routeId,from,to){switchTab("bookings");setTimeout(()=>openBookingModal(null,routeId,from,to),80);}
document.addEventListener("click",()=>{["ac-from","ac-to","bac-from","bac-to"].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display="none";});});

// ── ROUTES CRUD ──
function renderRoutes(){ const q=(document.getElementById("route-search")?.value||"").toLowerCase();
const filtered=routes.filter(r=>r.name.toLowerCase().includes(q)||r.code.toLowerCase().includes(q)); const tI={Bus:"🚌",Jeepney:"🚐","UV Express":"🚖",Tricycle:"🛺","FX / AUV":"🚗","E-Jeep":"⚡"};
const tB={Bus:"#0d2b4e",Jeepney:"#065f46","UV Express":"#7c3aed",Tricycle:"#b45309","FX / AUV":"#0e7490","E-Jeep":"#065f46"}; if(!filtered.length){document.getElementById("routes-list").innerHTML=`<div class="empty"><div class="empty-icon">🗺</div><p>No routes found.</p></div>`;return;}
document.getElementById("routes-list").innerHTML=filtered.map(r=>`<div class="item-card"> <div class="iico" style="background:${tB[r.type]||"#0d2b4e"}">${tI[r.type]||"🚌"}</div>
<div class="ibody"> <div class="ititle">${escH(r.name)}<span class="badge ${r.status==="Active"?"bg-green":"bg-red"}">${r.status}</span></div>
<div class="isub">${escH(r.code)} · ${escH(r.type)}</div> <div class="imeta"><span>₱${r.fare}</span><span>⏱ ${r.duration}min</span><span>📍 ${r.stops.length} stops</span></div>
<div class="stops-row">${r.stops.map(s=>`<span class="stop-chip">${escH(s)}</span>`).join("")}</div> </div>
<div class="iact"><button class="btn btn-ghost btn-icon" onclick="openRouteModal(${r.id})">✏️</button><button class="btn btn-ghost btn-icon" onclick="confirmDeleteRoute(${r.id})" style="border-color:#fecaca">🗑</button></div> </div>`).join("");
} function openRouteModal(id=null){
editingRouteId=id;const r=id?routes.find(x=>x.id===id):null; document.getElementById("route-modal-title").textContent=id?"Edit Route":"Add Route";
document.getElementById("f-code").value=r?.code||""; document.getElementById("f-type").value=r?.type||"Jeepney";
document.getElementById("f-name").value=r?.name||""; document.getElementById("f-fare").value=r?.fare||"";
document.getElementById("f-duration").value=r?.duration||""; document.getElementById("f-stops").value=r?.stops?.join(", ")||"";
document.getElementById("f-status").value=r?.status||"Active"; ["code","name","fare","duration"].forEach(k=>document.getElementById("e-"+k).textContent="");
document.getElementById("route-modal").classList.add("open"); }
function saveRoute(){ const code=document.getElementById("f-code").value.trim(),type=document.getElementById("f-type").value;
const name=document.getElementById("f-name").value.trim(),fare=Number(document.getElementById("f-fare").value); const duration=Number(document.getElementById("f-duration").value);
const stops=document.getElementById("f-stops").value.split(",").map(s=>s.trim()).filter(Boolean); const status=document.getElementById("f-status").value;
let v=true;const e=(id,m)=>{document.getElementById(id).textContent=m;v=false;};const c=id=>document.getElementById(id).textContent=""; code?c("e-code"):e("e-code","Required");
name?c("e-name"):e("e-name","Required"); fare>0?c("e-fare"):e("e-fare","Enter fare");
duration>0?c("e-duration"):e("e-duration","Enter duration"); if(!v)return;
if(editingRouteId){const idx=routes.findIndex(r=>r.id===editingRouteId);routes[idx]={...routes[idx],code,type,name,fare,duration,stops,status};showToast("✅ Route updated");} else{routes.push({id:nextRouteId++,code,type,name,fare,duration,stops,status,createdAt:new Date().toISOString().split("T")[0]});showToast("✅ Route added");}
closeModal("route-modal");renderRoutes();updateHeaderStats(); }
function confirmDeleteRoute(id){ const r=routes.find(x=>x.id===id);
document.getElementById("confirm-title").textContent="Delete Route?"; document.getElementById("confirm-msg").textContent=`Remove "${r.name}"? Bookings referencing this route will lose their link.`;
document.getElementById("confirm-ok-btn").onclick=()=>{routes=routes.filter(x=>x.id!==id);showToast("🗑 Route deleted");renderRoutes();updateHeaderStats();closeModal("confirm-modal");}; document.getElementById("confirm-modal").classList.add("open");
}

// ── BOOKINGS CRUD ──
function setBookingFilter(f,el){bookingFilter=f;document.querySelectorAll("#booking-filters .pill").forEach(p=>p.classList.remove("active"));el.classList.add("active");renderBookings();} function renderBookings(){
const q=(document.getElementById("booking-search")?.value||"").toLowerCase(); const filtered=bookings.filter(b=>(bookingFilter==="All"||b.status===bookingFilter)&&(b.passenger.toLowerCase().includes(q)||b.ref.toLowerCase().includes(q)||b.route.toLowerCase().includes(q)));
const sB={Confirmed:"bg-green",Pending:"bg-yellow",Cancelled:"bg-red"}; if(!filtered.length){document.getElementById("bookings-list").innerHTML=`<div class="empty"><div class="empty-icon">🎫</div><p>No bookings found.</p></div>`;return;}
document.getElementById("bookings-list").innerHTML=filtered.map(b=>`<div class="item-card"> <div class="iico" style="background:#065f46">🎫</div>
<div class="ibody"> <div class="ititle">${escH(b.passenger)}<span class="badge ${sB[b.status]||"bg-gray"}">${b.status}</span></div>
<div class="isub">${escH(b.ref)}</div> <div class="imeta"><span>🗺 ${escH(b.route)}</span></div>
${b.from||b.to?`<div class="imeta" style="margin-top:3px">${b.from?`<span>📍 ${escH(b.from)}</span>`:""}${b.to?`<span>🏁 ${escH(b.to)}</span>`:""}</div>`:""} <div class="imeta" style="margin-top:3px"><span>📅 ${b.date} ${b.time}</span><span>💺 ${b.seats}</span><span>₱${b.fare.toLocaleString()}</span></div>
</div> <div class="iact"><button class="btn btn-ghost btn-icon" onclick="openBookingModal(${b.id})">✏️</button><button class="btn btn-ghost btn-icon" onclick="confirmDeleteBooking(${b.id})" style="border-color:#fecaca">🗑</button></div>
</div>`).join(""); }
function openBookingModal(id=null,preRouteId=null,preFrom="",preTo=""){ editingBookingId=id;const b=id?bookings.find(x=>x.id===id):null;
document.getElementById("booking-modal-title").textContent=id?"Edit Booking":"New Booking"; const sel=document.getElementById("b-route");sel.innerHTML=`<option value="">— Choose a route —</option>`;
routes.filter(r=>r.status==="Active"||(b&&r.id===b.routeId)).forEach(r=>{ const opt=document.createElement("option");opt.value=r.id;opt.textContent=r.name+" (₱"+r.fare+")";
if((b&&b.routeId===r.id)||(!b&&preRouteId===r.id))opt.selected=true; sel.appendChild(opt);
}); document.getElementById("b-passenger").value=b?.passenger||"";
document.getElementById("b-from").value=b?.from||preFrom; document.getElementById("b-to").value=b?.to||preTo;
document.getElementById("b-date").value=b?.date||""; document.getElementById("b-time").value=b?.time||"";
document.getElementById("b-seats").value=b?.seats||1; document.getElementById("b-status").value=b?.status||"Pending";
["passenger","route","date","time","seats"].forEach(k=>document.getElementById("be-"+k).textContent=""); updateFarePreview();
document.getElementById("booking-modal").classList.add("open"); }
function updateFarePreview(){ const routeId=Number(document.getElementById("b-route")?.value);
const seats=Number(document.getElementById("b-seats")?.value)||1; const r=routes.find(x=>x.id===routeId);
const box=document.getElementById("fare-preview-box"); if(r){box.style.display="";box.innerHTML=`<strong>Total Fare: ₱${(r.fare*seats).toLocaleString()}</strong> · ${r.duration} mins · ${r.stops.length} stops`;}
else box.style.display="none"; }
function saveBooking(){ const passenger=document.getElementById("b-passenger").value.trim();
const routeId=Number(document.getElementById("b-route").value); const from=document.getElementById("b-from").value.trim(),to=document.getElementById("b-to").value.trim();
const date=document.getElementById("b-date").value,time=document.getElementById("b-time").value; const seats=Number(document.getElementById("b-seats").value),status=document.getElementById("b-status").value;
let v=true;const e=(id,m)=>{document.getElementById(id).textContent=m;v=false;};const c=id=>document.getElementById(id).textContent=""; passenger?c("be-passenger"):e("be-passenger","Name required");
routeId?c("be-route"):e("be-route","Select a route"); date?c("be-date"):e("be-date","Date required");
time?c("be-time"):e("be-time","Time required"); seats>=1?c("be-seats"):e("be-seats","Min. 1 seat");
if(!v)return; const r=routes.find(x=>x.id===routeId),fare=r?r.fare*seats:0;
if(editingBookingId){const idx=bookings.findIndex(b=>b.id===editingBookingId);bookings[idx]={...bookings[idx],passenger,routeId,route:r?.name||"",from,to,date,time,seats,fare,status};showToast("✅ Booking updated");} else{const ref=`SK-2025-00${nextRefNum++}`;bookings.push({id:nextBookingId++,ref,passenger,routeId,route:r?.name||"",from,to,date,time,seats,fare,status});showToast("✅ Booked · "+ref);}
closeModal("booking-modal");renderBookings();updateHeaderStats(); }
function confirmDeleteBooking(id){ const b=bookings.find(x=>x.id===id);
document.getElementById("confirm-title").textContent="Remove Booking?"; document.getElementById("confirm-msg").textContent=`Remove ${b.ref} for "${b.passenger}"? This cannot be undone.`;
document.getElementById("confirm-ok-btn").onclick=()=>{bookings=bookings.filter(x=>x.id!==id);showToast("🗑 Removed");renderBookings();updateHeaderStats();closeModal("confirm-modal");}; document.getElementById("confirm-modal").classList.add("open");
}

// ── PROFILE ──
function openProfile(){ if(!currentUser)return;
const initials=(currentUser.fname[0]+(currentUser.lname||"")[0]||"").toUpperCase(); document.getElementById("profile-av").textContent=initials;
document.getElementById("profile-name").textContent=currentUser.fname+" "+(currentUser.lname||""); document.getElementById("profile-email").textContent=currentUser.email;
document.getElementById("profile-muni").textContent="📍 "+currentUser.municipality; document.getElementById("ps-bookings").textContent=bookings.length;
document.getElementById("ps-routes").textContent=routes.length; document.getElementById("ps-revenue").textContent="₱"+bookings.filter(b=>b.status==="Confirmed").reduce((s,b)=>s+b.fare,0).toLocaleString();
document.getElementById("profile-sheet").classList.add("open"); }
function closeProfile(e){if(!e||e.target===document.getElementById("profile-sheet"))document.getElementById("profile-sheet").classList.remove("open");}

// ── UTILITIES ──
function closeModal(id){document.getElementById(id).classList.remove("open");} function updateHeaderStats(){document.getElementById("hs-routes").textContent=routes.length;document.getElementById("hs-bookings").textContent=bookings.length;}
function showToast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.getElementById("toasts").appendChild(t);setTimeout(()=>t.remove(),3000);} function escH(str){return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
document.querySelectorAll(".modal-overlay").forEach(el=>el.addEventListener("click",e=>{if(e.target===el)el.classList.remove("open");})); document.addEventListener("keydown",e=>{
if(e.key!=="Enter")return; const panel=document.querySelector(".auth-panel.active");if(!panel)return;
if(panel.id==="panel-login")doLogin();else if(panel.id==="panel-signup")doSignup(); });
function updateClock(){ const now=new Date();let h=now.getHours(),m=now.getMinutes();
const ampm=h>=12?"PM":"AM";h=h%12||12; document.getElementById("status-time").textContent=h+":"+(m<10?"0"+m:m)+" "+ampm;
} updateClock();setInterval(updateClock,10000);

