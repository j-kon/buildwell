/*
 * Buildwell interactive browser demo.
 * This is NOT a production API or authentication system.
 * All project data and sample accounts are stored in this browser only.
 */
(function (global) {
  'use strict';
  const DATABASE_KEY = 'buildwell.pwa.demo.v2';
  const SESSION_KEY = 'buildwell.pwa.session.v2';
  const COPY = value => JSON.parse(JSON.stringify(value));
  const ts = () => new Date().toISOString();
  const id = prefix => prefix + '_' + (global.crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
  const clean = (s, max=500) => String(s ?? '').trim().slice(0,max);
  const money = number => '₦' + Number(number || 0).toLocaleString('en-NG');
  const fail = (message) => { throw new Error(message); };

  const services = [
    {id:'painting',name:'Painting', icon:'paintbrush',short:'Walls & finishing',rate:23000,material:1450,types:['Interior painting','Exterior painting','Full property painting','Wall preparation','Textured finishing','Other painting work']},
    {id:'masonry',name:'Masonry & blockwork',icon:'blocks',short:'Blocks & concrete',rate:28000,material:1950,types:['Block laying','Wall plastering','Concrete work','Foundation work','Repairs & patching','Other masonry work']},
    {id:'plumbing',name:'Plumbing',icon:'droplets',short:'Pipes & fitting',rate:26000,material:1550,types:['New plumbing installation','Leak repairs','Bathroom fitting','Drainage work','Kitchen installation','Other plumbing work']},
    {id:'electrical',name:'Electrical',icon:'zap',short:'Electrical fittings',rate:28000,material:1800,types:['Full wiring','Light fixture installation','Socket & switch work','Fault diagnosis','Generator / inverter setup','Other electrical work']},
    {id:'tiling',name:'Tiling & flooring',icon:'grid',short:'Tile & floor finishing',rate:24000,material:2700,types:['Floor tiling','Wall tiling','Bathroom tiling','Floor preparation','Grouting & repairs','Other tiling work']},
    {id:'carpentry',name:'Carpentry',icon:'hammer',short:'Woodworks',rate:25000,material:2200,types:['Doors & frames','Cabinets & wardrobes','Wooden ceilings','Furniture work','Repairs','Other carpentry work']},
    {id:'roofing',name:'Roofing',icon:'home',short:'Roofing & waterproofing',rate:31000,material:3300,types:['New roof','Roof repairs','Waterproofing','Roof inspection','Guttering','Other roofing work']},
    {id:'ceiling',name:'POP & ceilings',icon:'layout',short:'Ceiling works',rate:27000,material:2500,types:['POP installation','Suspended ceilings','Ceiling repairs','Drywall partitions','Decorative cornices','Other ceiling work']},
    {id:'other',name:'Other specialists',icon:'wrench',short:'Tell us what you need',rate:26000,material:1600,types:['Site cleaning','Welding','Glass & aluminum','Landscaping','General maintenance','Other (describe below)']}
  ];
  const demoArtisans = [
    {id:'a1',name:'Tunde Adeyemi',trade:'painting',city:'Lagos',rating:4.9,completed:84,email:'tunde@artisan.demo',phone:'+234 803 000 1001',rate:21000,availability:'Available',initials:'TA'},
    {id:'a2',name:'Seyi Balogun',trade:'painting',city:'Abuja',rating:4.8,completed:61,email:'seyi@artisan.demo',phone:'+234 803 000 1002',rate:22000,availability:'Available',initials:'SB'},
    {id:'a3',name:'Emeka Okafor',trade:'masonry',city:'Lagos',rating:4.9,completed:112,email:'emeka@artisan.demo',phone:'+234 803 000 1003',rate:26000,availability:'Available',initials:'EO'},
    {id:'a4',name:'Amina Yusuf',trade:'plumbing',city:'Abuja',rating:4.9,completed:72,email:'amina@artisan.demo',phone:'+234 803 000 1004',rate:25000,availability:'Available',initials:'AY'},
    {id:'a5',name:'David Eze',trade:'electrical',city:'Lagos',rating:4.7,completed:93,email:'david@artisan.demo',phone:'+234 803 000 1005',rate:26000,availability:'Available',initials:'DE'},
    {id:'a6',name:'Bayo Salami',trade:'tiling',city:'Abuja',rating:4.8,completed:45,email:'bayo@artisan.demo',phone:'+234 803 000 1006',rate:22000,availability:'Available',initials:'BS'},
    {id:'a7',name:'Chika Obi',trade:'carpentry',city:'Lagos',rating:4.9,completed:56,email:'chika@artisan.demo',phone:'+234 803 000 1007',rate:24000,availability:'Available',initials:'CO'},
    {id:'a8',name:'Hassan Bello',trade:'roofing',city:'Abuja',rating:4.8,completed:40,email:'hassan@artisan.demo',phone:'+234 803 000 1008',rate:29000,availability:'Available',initials:'HB'},
    {id:'a9',name:'Tomi Ekanem',trade:'ceiling',city:'Lagos',rating:4.8,completed:67,email:'tomi@artisan.demo',phone:'+234 803 000 1009',rate:26000,availability:'Available',initials:'TE'},
    {id:'a10',name:'Daniel Peter',trade:'other',city:'Abuja',rating:4.6,completed:38,email:'daniel@artisan.demo',phone:'+234 803 000 1010',rate:25000,availability:'Available',initials:'DP'}
  ];
  const defaultUsers = [
    {id:'u_admin',name:'Buildwell Operations',email:'admin@buildwell.demo',role:'admin',company:'Buildwell Partners'},
    {id:'u_client',name:'Amara Okonkwo',email:'client@buildwell.demo',role:'client',company:'Meridian Properties'},
    {id:'u_artisan',name:'Tunde Adeyemi',email:'artisan@buildwell.demo',role:'artisan',company:''},
    {id:'u_artisan2',name:'Amina Yusuf',email:'amina@buildwell.demo',role:'artisan',company:''}
  ];
  function initialDb() {
    return {
      users:COPY(defaultUsers),
      artisans:COPY(demoArtisans),artisanUserMap:{u_artisan:'a1',u_artisan2:'a4'},
      requests:[
        {id:'BW-2408',clientId:'u_client',company:'Meridian Properties',service:'painting',workType:'Interior painting',city:'Lagos',address:'Victoria Island, Lagos',propertyType:'Commercial / office',workers:3,days:4,area:185,materials:'platform',urgency:'Within 2 weeks',startDate:'2026-11-02',description:'Repaint the meeting rooms and reception area. Premium washable finish, minimal disruption to tenants.',customWork:'',images:[],estimate:{labor:276000,materials:268250,management:43540,total:587790},status:'quoted',quote:{labor:265000,materials:245000,logistics:28000,management:42000,total:580000,notes:'Includes premium washable paint, wall preparation and four working days. Final measurements confirmed on inspection.',updatedAt:ts()},assignedIds:[],payouts:{},dispatchNote:'',acceptance:null,payment:null,createdAt:'2026-10-17T13:04:00.000Z',updatedAt:ts()},
        {id:'BW-2407',clientId:'u_client',company:'Meridian Properties',service:'plumbing',workType:'Bathroom fitting',city:'Abuja',address:'Maitama, Abuja',propertyType:'Residential',workers:2,days:2,area:35,materials:'platform',urgency:'This week',startDate:'2026-10-29',description:'Replace bathroom fixtures and repair leaking pipework.',customWork:'',images:[],estimate:{labor:104000,materials:54250,management:12660,total:170910},status:'review',quote:null,assignedIds:[],payouts:{},dispatchNote:'',acceptance:null,payment:null,createdAt:'2026-10-16T08:45:00.000Z',updatedAt:ts()},
        {id:'BW-2406',clientId:'u_client',company:'Meridian Properties',service:'electrical',workType:'Light fixture installation',city:'Lagos',address:'Lekki Phase 1, Lagos',propertyType:'Commercial / office',workers:1,days:2,area:50,materials:'client',urgency:'Flexible',startDate:'2026-11-10',description:'Replace 12 ceiling light fixtures and check wiring.',customWork:'',images:[],estimate:{labor:56000,materials:0,management:4480,total:60480},status:'paid',quote:{labor:56000,materials:0,logistics:14000,management:10000,total:80000,notes:'Electrical safety inspection included.',updatedAt:ts()},assignedIds:['a5'],payouts:{a5:52000},dispatchNote:'Arrive at site by 9:00 AM. Contact office before visit.',acceptance:{name:'Amara Okonkwo',at:'2026-10-17T10:05:00.000Z'},payment:{mode:'demo',reference:'DEMO-PAID-2406',amount:80000,paidAt:'2026-10-17T10:06:00.000Z'},createdAt:'2026-10-12T10:04:00.000Z',updatedAt:ts()}
      ],
      messages:[{id:'msg_seed1',requestId:'BW-2408',senderId:'u_admin',role:'admin',text:'We reviewed your painting requirements and prepared a detailed quote for your approval.',createdAt:ts()},{id:'msg_seed2',requestId:'BW-2407',senderId:'u_client',role:'client',text:'Please confirm if Saturday site inspection is possible.',createdAt:ts()}],
      notifications:[{id:'note_seed',userId:'u_client',requestId:'BW-2408',title:'Your quote is ready',message:'The Buildwell team has prepared your final painting quote.',read:false,createdAt:ts()}],
      outbox:[{id:'mail_seed',to:'client@buildwell.demo',subject:'[Buildwell] Your quote for BW-2408 is ready',body:'Your updated quote for BW-2408 is ₦580,000. Sign in to review and approve it.',status:'demo',createdAt:ts()}],
      activity:[],nextRequest:2409
    };
  }
  function load() {
    try { const stored=global.localStorage.getItem(DATABASE_KEY); if(stored) return JSON.parse(stored); }
    catch (e) { /* Safari private mode and disabled storage are handled below */ }
    return initialDb();
  }
  let db=load(),memorySession=null;
  try { if(!global.localStorage.getItem(DATABASE_KEY)) global.localStorage.setItem(DATABASE_KEY,JSON.stringify(db)); } catch { /* Browser storage unavailable */ }
  function persist() { try {global.localStorage.setItem(DATABASE_KEY,JSON.stringify(db));} catch {fail('Browser storage is full or disabled. Remove some demo photos or allow local storage.');} }
  function user() {
    const userId=memorySession||global.sessionStorage.getItem(SESSION_KEY);
    return db.users.find(u=>u.id===userId)||null;
  }
  const safeUser=u=>u?{id:u.id,name:u.name,email:u.email,role:u.role,company:u.company||''}:null;
  function ensureRole(roles) {const u=user();if(!u)fail('Please sign in.');if(roles&&!roles.includes(u.role))fail('This action is unavailable for your demo role.');return u;}
  function visible(u,r) {return u.role==='admin'||u.role==='client'&&u.id===r.clientId||u.role==='artisan'&&(r.assignedIds||[]).includes(db.artisanUserMap[u.id]);}
  function publicRequest(r,u){const x=COPY(r);if(u.role==='client'){delete x.payouts;delete x.dispatchNote;delete x.assignedIds;}if(u.role==='artisan'){delete x.estimate;delete x.quote;delete x.payment;delete x.acceptance;delete x.company;}return x;}
  function notification(userId,requestId,title,message){db.notifications.unshift({id:id('notification'),userId,requestId,title,message,read:false,createdAt:ts()});}
  function mail(to,subject,body){db.outbox.unshift({id:id('email'),to,subject,body,status:'demo',createdAt:ts()});}
  function activity(event,requestId,actor){db.activity.unshift({id:id('activity'),event,requestId,userId:actor,createdAt:ts()});}
  function update(r,status){r.status=status;r.updatedAt=ts();}
  function estimate(b){const s=services.find(x=>x.id===b.service)||services[0];const workers=Math.max(1,Math.min(30,Number(b.workers)||1)),days=Math.max(1,Math.min(180,Number(b.days)||1)),area=Math.max(0,Number(b.area)||0);const labor=s.rate*workers*days,materials=b.materials==='client'?0:s.material*area,management=Math.round((labor+materials)*.08);return{labor,materials,management,total:labor+materials+management};}
  async function hashPassword(pass,salt){
    const material = new TextEncoder().encode(salt+':'+pass);
    const digest = await global.crypto.subtle.digest('SHA-256',material);
    return Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
  }
  async function request(path,options={}) {
    const method=String(options.method||'GET').toUpperCase(),b=options.body?JSON.parse(options.body):{};
    const u=user();
    if (path==='/catalog') return {services:COPY(services),currency:'NGN'};
    if (path==='/auth/register'&&method==='POST') {
      const name=clean(b.name,100),email=clean(b.email,150).toLowerCase(),password=String(b.password||'');
      if(name.length<2||!/^\S+@\S+\.\S+$/.test(email)||password.length<8)fail('Enter your name, a valid email and a password of 8+ characters.');
      if(db.users.some(x=>x.email===email))fail('That email is already registered in this browser.');
      const salt=id('salt'),passwordHash=await hashPassword(password,salt);
      const next={id:id('user'),name,email,role:'client',company:clean(b.company,100),salt,passwordHash,createdAt:ts()};
      db.users.push(next);persist();return{user:safeUser(next)};
    }
    if (path==='/auth/login'&&method==='POST') {
      const email=clean(b.email).toLowerCase();const matched=db.users.find(x=>x.email===email);
      if(!matched)fail('Incorrect email or password.');
      const valid=matched.salt?(await hashPassword(String(b.password||''),matched.salt))===matched.passwordHash:String(b.password||'')==='demo1234';
      if(!valid)fail('Incorrect email or password.');
      global.sessionStorage.setItem(SESSION_KEY,matched.id);memorySession=matched.id;return{user:safeUser(matched)};
    }
    if (path==='/auth/logout'&&method==='POST') {global.sessionStorage.removeItem(SESSION_KEY);memorySession=null;return{ok:true};}
    if (path==='/state') {
      const me=ensureRole();const reqs=db.requests.filter(r=>visible(me,r)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));const ids=new Set(reqs.map(r=>r.id));
      return COPY({user:safeUser(me),services,requests:reqs.map(r=>publicRequest(r,me)),messages:db.messages.filter(m=>ids.has(m.requestId)),notifications:db.notifications.filter(n=>n.userId===me.id),artisans:me.role==='admin'?db.artisans:[],myArtisanId:db.artisanUserMap[me.id]||null,outbox:me.role==='admin'?db.outbox:[],activity:me.role==='admin'?db.activity:[]});
    }
    if (path==='/notifications/read'&&method==='POST') {const me=ensureRole();db.notifications.forEach(n=>{if(n.userId===me.id)n.read=true;});persist();return{ok:true};}
    if (path==='/artisans'&&method==='POST') {
      const me=ensureRole(['admin']);const name=clean(b.name,100),email=clean(b.email,150).toLowerCase(),trade=clean(b.trade,30),city=clean(b.city,100),rate=Number(b.rate);
      if(name.length<3||!email.includes('@')||!services.find(x=>x.id===trade)||!city||!Number.isFinite(rate)||rate<0)fail('Enter valid artisan name, email, trade, city and daily rate.');
      if(db.artisans.some(a=>a.email===email))fail('An artisan with this email already exists.');
      const person={id:id('artisan'),name,email,trade,city,rate,phone:clean(b.phone,30),rating:0,completed:0,availability:'Available',initials:name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()};
      db.artisans.push(person);activity('Artisan '+name+' added to roster',null,me.id);persist();return{artisan:person};
    }
    const artisanPath=path.match(/^\/artisans\/([^/]+)$/);
    if (artisanPath&&method==='PUT') {
      ensureRole(['admin']);const person=db.artisans.find(x=>x.id===artisanPath[1]);if(!person)fail('Artisan not found.');
      const rate=Number(b.rate);if(!Number.isFinite(rate)||rate<0)fail('Invalid daily rate.');person.rate=rate;person.availability=b.availability==='Unavailable'?'Unavailable':'Available';person.phone=clean(b.phone,30);persist();return{artisan:person};
    }
    if (path==='/requests'&&method==='POST') {
      const me=ensureRole(['client']),svc=services.find(s=>s.id===b.service);
      if(!svc)fail('Choose a valid service.');
      const workers=Math.floor(Number(b.workers)),days=Math.floor(Number(b.days)),area=Number(b.area);
      if(!(workers>=1&&workers<=30&&days>=1&&days<=180&&area>=0&&area<=200000))fail('Check the artisan quantity, days and project area.');
      if(clean(b.description,2500).length<15)fail('Add a project description of at least 15 characters.');
      if(!clean(b.city)||!clean(b.address)||!clean(b.workType))fail('Add the service type and project location.');
      const next={id:'BW-'+db.nextRequest++,clientId:me.id,company:me.company,service:svc.id,workType:clean(b.workType,100),city:clean(b.city,100),address:clean(b.address,200),propertyType:clean(b.propertyType,100),workers,days,area,materials:b.materials==='client'?'client':'platform',urgency:clean(b.urgency,60),startDate:clean(b.startDate,30),description:clean(b.description,2500),customWork:clean(b.customWork,500),images:Array.isArray(b.images)?b.images.filter(x=>typeof x==='string'&&x.startsWith('data:image/')).slice(0,3):[],estimate:estimate(b),status:'review',quote:null,assignedIds:[],payouts:{},dispatchNote:'',acceptance:null,payment:null,createdAt:ts(),updatedAt:ts()};
      db.requests.unshift(next);notification('u_admin',next.id,'New project request',`${me.name} requested ${workers} ${svc.name.toLowerCase()} specialist(s).`);
      mail(me.email,`[Buildwell] Request ${next.id} received`,`Hi ${me.name},\n\nWe received your request for ${svc.name} (${next.id}). Estimate: ${money(next.estimate.total)}. Our team will send a final quote.\n\nThis is a demo email preview, not a delivered message.`);
      activity('New request submitted',next.id,me.id);persist();return{request:publicRequest(next,me)};
    }
    const match=path.match(/^\/requests\/([^/]+)\/(message|quote|accept|payment|demo-pay|assign|progress)$/);
    if(match) {
      const me=ensureRole();const r=db.requests.find(x=>x.id===match[1]);if(!r)fail('Project not found.');if(!visible(me,r))fail('You cannot access this project.');
      const action=match[2];
      if(action==='message') {
        const message=clean(b.message,1200);if(!message)fail('Write a message first.');
        db.messages.push({id:id('message'),requestId:r.id,senderId:me.id,role:me.role,text:message,createdAt:ts()});
        if(me.role==='client')notification('u_admin',r.id,'New customer message',`${me.name} wrote about ${r.id}.`);
        if(me.role==='admin')notification(r.clientId,r.id,'Message from Buildwell',`You have a new message about ${r.id}.`);
        persist();return{ok:true};
      }
      if(action==='quote') {
        ensureRole(['admin']);if(r.payment)fail('The quote is already paid.');
        const fields=['labor','materials','logistics','management'],prices=fields.map(k=>Number(b[k]));
        if(prices.some(v=>!Number.isFinite(v)||v<0||v>999999999))fail('Enter valid non-negative prices.');
        const total=prices.reduce((a,v)=>a+v,0);if(total<=0)fail('Total price must be greater than zero.');
        r.quote={labor:prices[0],materials:prices[1],logistics:prices[2],management:prices[3],total,notes:clean(b.notes,1600),updatedAt:ts()};r.acceptance=null;update(r,'quoted');
        const client=db.users.find(x=>x.id===r.clientId);notification(client.id,r.id,'Your final quote is ready',`Confirm the final ${money(total)} quotation for ${r.id}.`);
        mail(client.email,`[Buildwell] Your final quote is ready for ${r.id}`,`Hi ${client.name},\n\nFinal quote for ${r.id}: ${money(total)}.\nLabour: ${money(prices[0])}\nMaterials: ${money(prices[1])}\nLogistics: ${money(prices[2])}\nManagement fee: ${money(prices[3])}\n\n${r.quote.notes}\n\nSign in to review and approve. This email is a demo preview.`);
        activity('Quote sent to customer',r.id,me.id);persist();return{ok:true};
      }
      if(action==='accept') {
        ensureRole(['client']);if(r.status!=='quoted'||!r.quote)fail('No quotation is waiting for approval.');
        const name=clean(b.name,100);if(name.length<3||b.agreed!==true)fail('Enter your name and accept the terms.');
        r.acceptance={name,at:ts()};update(r,'approved');notification('u_admin',r.id,'Quote approved',`${me.name} approved ${money(r.quote.total)}.`);persist();return{ok:true};
      }
      if(action==='payment') {ensureRole(['client']);if(r.status!=='approved'||!r.acceptance)fail('Approve the final quote before paying.');return{mode:'demo',amount:r.quote.total,message:'Simulation only; no card will be charged.'};}
      if(action==='demo-pay') {
        ensureRole(['client']);if(r.status!=='approved')fail('Approve the final quote first.');if(r.payment)fail('Already marked as paid.');
        r.payment={mode:'demo',reference:'DEMO-'+Math.random().toString(36).slice(2,10).toUpperCase(),amount:r.quote.total,paidAt:ts()};update(r,'paid');notification(r.clientId,r.id,'Demo payment confirmed',`Simulated ${money(r.quote.total)} payment recorded.`);activity('Demo payment recorded',r.id,me.id);persist();return{ok:true};
      }
      if(action==='assign') {
        ensureRole(['admin']);const assigned=Array.isArray(b.artisanIds)?[...new Set(b.artisanIds)].filter(x=>db.artisans.some(a=>a.id===x)).slice(0,30):[];
        if(!assigned.length)fail('Choose at least one artisan.');
        const payouts={};for(const aid of assigned){const amount=Number(b.payouts?.[aid]);if(!Number.isFinite(amount)||amount<0||amount>999999999)fail('Enter each artisan rate.');payouts[aid]=amount;}
        r.assignedIds=assigned;r.payouts=payouts;r.dispatchNote=clean(b.dispatchNote,1200);
        for(const aid of assigned){const artisan=db.artisans.find(a=>a.id===aid);const linkedId=Object.keys(db.artisanUserMap).find(uid=>db.artisanUserMap[uid]===aid);if(linkedId)notification(linkedId,r.id,'New assignment',`${r.id}: agreed rate ${money(payouts[aid])}.`);mail(artisan.email,`[Buildwell] Work assignment ${r.id}`,`Hello ${artisan.name},\n\nYou were assigned ${r.id}. Your agreed rate: ${money(payouts[aid])}.\nInstructions: ${r.dispatchNote}\n\nThis is a demo email preview.`);}
        notification(r.clientId,r.id,'Your artisans are being arranged',`Specialists are being coordinated for ${r.id}.`);if(r.payment)update(r,'assigned');activity('Artisans assigned',r.id,me.id);persist();return{ok:true};
      }
      if(action==='progress') {
        ensureRole(['admin','artisan']);if(!['in_progress','completed'].includes(b.status))fail('Invalid job status.');
        if(!r.payment||!r.assignedIds.length)fail('Payment and assignment are required first.');
        if(me.role==='artisan'&&!r.assignedIds.includes(db.artisanUserMap[me.id]))fail('This project is not assigned to you.');
        update(r,b.status);notification(r.clientId,r.id,b.status==='completed'?'Job marked completed':'Work has started',`Your project ${r.id} is now ${b.status.replace('_',' ')}.`);activity('Job '+b.status,r.id,me.id);persist();return{ok:true};
      }
    }
    fail('Demo route unavailable: '+method+' '+path);
  }
  function reset() {db=initialDb();persist();global.sessionStorage.removeItem(SESSION_KEY);memorySession=null;global.location.reload();}
  global.BuildwellDemo = {request, reset, isDemo:true};
})(window);
