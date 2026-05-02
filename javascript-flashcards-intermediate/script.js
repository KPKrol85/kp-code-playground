const STORAGE_KEY = 'kp_js_flashcards_intermediate_v1';
const AVATARS = ['🧠', '💻', '🚀', '🌟', '🧩', '📘'];
const QUIZ_SIZE = 10;
const CATEGORIES = [
  'Scope and Closures','Hoisting','Functions Deep Dive','Arrays and Objects','Destructuring','Spread and Rest','Template Literals','Modules','DOM Manipulation','Events and Event Delegation','Forms and Validation','Async JavaScript','Promises','Fetch API','JSON','Error Handling','LocalStorage','Browser APIs','Clean Code Habits','Debugging'
];

const basePrompts = [
  ['What is the key idea of {category}?','It helps you write predictable code by understanding how JavaScript behaves in real apps.','Knowing this reduces bugs and improves maintainability.'],
  ['When should you apply {category} in a project?','Use it when code clarity, reuse, or reliability can be improved.','This concept appears often in UI work and data flow.'],
  ['What common mistake appears in {category}?','A frequent mistake is assuming JavaScript works like another language.','Reading output carefully and testing small examples helps.'],
  ['How can you practice {category} effectively?','Build tiny examples, predict output, then verify in DevTools.','Active recall with flashcards plus coding drills is effective.'],
  ['Why does {category} matter for frontend jobs?','It directly affects component logic, events, async flows, and debugging speed.','Interview tasks and production bugs often rely on this concept.']
];

function codeExampleForCategory(category) {
  const map = {
    'Scope and Closures': `function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}`,
    'Hoisting': `console.log(value); // undefined\nvar value = 10;`,
    'Functions Deep Dive': `const user = {\n  name: 'Sam',\n  greet() { return this.name; }\n};`,
    'Arrays and Objects': `[1,2,3].map(n => n * 2);`,
    'Destructuring': `const { title, price } = product;`,
    'Spread and Rest': `const merged = { ...defaults, ...overrides };`,
    'Template Literals': 'const msg = `Hello ${name}!`;',
    'Modules': `export function sum(a,b){ return a+b; }`,
    'DOM Manipulation': `document.querySelector('#app').textContent = 'Ready';`,
    'Events and Event Delegation': `list.addEventListener('click', (e) => {\n  if (e.target.matches('button')) removeItem();\n});`,
    'Forms and Validation': `if (!email.includes('@')) showError('Invalid email');`,
    'Async JavaScript': `async function load(){\n  const data = await fetchData();\n}`,
    'Promises': `fetch('/api').then(r => r.json()).catch(console.error);`,
    'Fetch API': `const res = await fetch('/items');\nif (!res.ok) throw new Error('Request failed');`,
    'JSON': `const text = JSON.stringify({ darkMode: true });`,
    'Error Handling': `try { risky(); } catch (error) { console.error(error); }`,
    'LocalStorage': `localStorage.setItem('settings', JSON.stringify(settings));`,
    'Browser APIs': `const id = setTimeout(() => console.log('done'), 500);`,
    'Clean Code Habits': `function calculateTotal(items) {\n  return items.reduce((sum, i) => sum + i.price, 0);\n}`,
    'Debugging': `console.table(users);\ndebugger;`
  };
  return map[category] || '';
}

const FLASHCARDS = CATEGORIES.flatMap((category, cIndex) => (
  basePrompts.map((prompt, idx) => {
    const id = cIndex * basePrompts.length + idx + 1;
    return {
      id,
      category,
      difficulty: idx < 2 ? 'Intermediate' : 'Intermediate+',
      question: prompt[0].replace('{category}', category),
      answer: prompt[1],
      explanation: prompt[2],
      codeExample: idx % 2 === 0 ? codeExampleForCategory(category) : '',
      wrongAnswers: [
        'It is only useful in backend development.',
        'It only matters for JavaScript engines, not developers.',
        'You should avoid it in modern JavaScript.'
      ]
    };
  })
));

if (FLASHCARDS.length !== 100) throw new Error('Flashcards count must be exactly 100.');

const state = {
  storageOk: true,
  profile: null,
  learned: new Set(),
  tricky: new Set(),
  attempts: [],
  sessions: 0,
  currentCardIndex: 0,
  mode: 'all'
};

const views = {
  login: document.querySelector('#view-login'), dashboard: document.querySelector('#view-dashboard'), learn: document.querySelector('#view-learn'), quiz: document.querySelector('#view-quiz'), tricky: document.querySelector('#view-tricky'), progress: document.querySelector('#view-progress')
};

function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile: state.profile, learned:[...state.learned], tricky:[...state.tricky], attempts: state.attempts, sessions: state.sessions, currentCardIndex: state.currentCardIndex })); } catch { state.storageOk = false; }}
function load() { try { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return; const d = JSON.parse(raw); state.profile = d.profile || null; state.learned = new Set(d.learned || []); state.tricky = new Set(d.tricky || []); state.attempts = d.attempts || []; state.sessions = d.sessions || 0; state.currentCardIndex = d.currentCardIndex || 0; } catch { state.storageOk = false; }}
const latest = () => state.attempts.at(-1)?.score ?? 0;
const best = () => Math.max(0, ...state.attempts.map(a => a.score));

function show(view) { Object.values(views).forEach(v => v.hidden = true); views[view].hidden = false; }
function renderLogin(){ show('login'); views.login.innerHTML = `<h2>Welcome learner 👋</h2><p>This pack helps intermediate JavaScript learners strengthen practical skills.</p><form id="loginForm"><label class="label" for="name">Learner name</label><input class="input" id="name" required maxlength="30" /><label class="label" for="avatar">Choose an avatar</label><select class="select" id="avatar">${AVATARS.map(a=>`<option>${a}</option>`).join('')}</select><p><small>Self-study note: profile and progress are stored in this browser only.</small></p><button class="button" type="submit">Start learning</button></form>`; document.querySelector('#loginForm').onsubmit=(e)=>{e.preventDefault(); state.profile={name:document.querySelector('#name').value.trim(),avatar:document.querySelector('#avatar').value}; save(); renderDashboard();}; }

function dashboardStats(){ return { total: FLASHCARDS.length, learned: state.learned.size, tricky: state.tricky.size, best: best(), latest: latest(), sessions: state.sessions }; }
function renderDashboard(){ show('dashboard'); const s=dashboardStats(); views.dashboard.innerHTML = `<h2>${state.profile.avatar} Hi ${state.profile.name}!</h2><div class="card-grid card-grid--two">${Object.entries(s).map(([k,v])=>`<article class="stat"><div>${k}</div><div class="stat__value">${v}</div></article>`).join('')}</div><p>Last session: ${state.attempts.at(-1) ? `${latest()} / ${QUIZ_SIZE}` : 'No quiz yet'}.</p><div class="button-row"><button class="button" data-go="learn">Start learning</button><button class="button" data-go="quiz">Take quiz</button><button class="button" data-go="tricky">Review tricky cards</button><button class="button" data-go="progress">View progress</button><button class="button button--ghost" data-action="reset">Reset progress</button><button class="button button--ghost" data-action="logout">Switch learner / Log out</button></div>`;
  views.dashboard.onclick=(e)=>{ const t=e.target.closest('button'); if(!t)return; if(t.dataset.go){ if(t.dataset.go==='learn')renderLearn('all'); if(t.dataset.go==='quiz')startQuiz(); if(t.dataset.go==='tricky')renderLearn('tricky'); if(t.dataset.go==='progress')renderProgress(); } if(t.dataset.action==='reset'){ state.learned.clear(); state.tricky.clear(); state.attempts=[]; state.sessions=0; save(); renderDashboard(); } if(t.dataset.action==='logout'){ state.profile=null; save(); renderLogin(); }};
}

function renderLearn(mode='all'){ state.mode = mode; const cards = mode==='tricky' ? FLASHCARDS.filter(c=>state.tricky.has(c.id)) : FLASHCARDS; show(mode==='tricky'?'tricky':'learn'); const host = mode==='tricky'?views.tricky:views.learn; if(!cards.length){ host.innerHTML = `<h2>No tricky cards yet 🎉</h2><p>Keep learning and mark difficult cards to build a custom review set.</p><button class="button" id="backDash">Back to dashboard</button>`; document.querySelector('#backDash').onclick=renderDashboard; return; }
  let flipped=false; const renderCard = ()=>{ const card=cards[state.currentCardIndex % cards.length]; const p=((state.currentCardIndex+1)/cards.length)*100; host.innerHTML=`<h2>${mode==='tricky'?'Tricky Cards Review':'Learning Mode'}</h2><div class="progress"><div class="progress__bar" style="width:${p}%"></div></div><p>Card ${state.currentCardIndex+1} of ${cards.length}</p><article class="flashcard" id="flashcard" tabindex="0" role="button" aria-pressed="${flipped}"><div class="flashcard__meta"><span>${card.category}</span><span>${card.difficulty}</span></div><h3>${card.question}</h3>${flipped?`<p><strong>${card.answer}</strong></p><p>${card.explanation}</p>${card.codeExample?`<pre class="code">${card.codeExample}</pre>`:''}`:'<p>Press Enter/Space to flip this card.</p>'}</article><div class="button-row"><button class="button" data-nav="prev">Previous</button><button class="button" data-nav="next">Next</button><button class="button" data-mark="learned">Mark learned</button><button class="button" data-mark="tricky">Mark tricky</button><button class="button button--ghost" data-nav="dash">Dashboard</button></div>`;
    const fc=document.querySelector('#flashcard'); fc.onclick=()=>{flipped=!flipped; renderCard();}; fc.onkeydown=(e)=>{ if(['Enter',' '].includes(e.key)){e.preventDefault(); flipped=!flipped; renderCard();} if(e.key==='ArrowRight'){state.currentCardIndex=(state.currentCardIndex+1)%cards.length; flipped=false; renderCard();} if(e.key==='ArrowLeft'){state.currentCardIndex=(state.currentCardIndex-1+cards.length)%cards.length; flipped=false; renderCard();} };
    host.querySelector('.button-row').onclick=(e)=>{const b=e.target.closest('button'); if(!b)return; if(b.dataset.nav==='next'){state.currentCardIndex=(state.currentCardIndex+1)%cards.length;flipped=false;} if(b.dataset.nav==='prev'){state.currentCardIndex=(state.currentCardIndex-1+cards.length)%cards.length;flipped=false;} if(b.dataset.mark==='learned'){state.learned.add(card.id);} if(b.dataset.mark==='tricky'){state.tricky.add(card.id);} if(b.dataset.nav==='dash'){state.sessions += 1; save(); renderDashboard(); return;} save(); renderCard(); };
  }; renderCard(); }

function startQuiz(){ show('quiz'); const picked=[...FLASHCARDS].sort(()=>Math.random()-0.5).slice(0,QUIZ_SIZE); let i=0, score=0;
  const renderQ=()=>{ const q=picked[i]; const options=[q.answer,...q.wrongAnswers].sort(()=>Math.random()-0.5); views.quiz.innerHTML=`<h2>Quiz Mode</h2><p>Question ${i+1}/${QUIZ_SIZE}</p><p><strong>${q.question}</strong></p>${options.map(o=>`<button class="button button--ghost quiz-option" data-opt="${encodeURIComponent(o)}">${o}</button>`).join('')}<div id="feedback" class="feedback" hidden></div>`;
  views.quiz.onclick=(e)=>{const b=e.target.closest('[data-opt]'); if(!b)return; const selected=decodeURIComponent(b.dataset.opt); const ok=selected===q.answer; if(ok) score++; document.querySelector('#feedback').hidden=false; document.querySelector('#feedback').textContent = ok ? 'Correct ✅' : `Not quite. Correct answer: ${q.answer}. ${q.explanation}`; setTimeout(()=>{i++; if(i<QUIZ_SIZE) renderQ(); else finishQuiz(score);}, 550);}; };
  renderQ(); }
function finishQuiz(score){ const pct=Math.round((score/QUIZ_SIZE)*100); state.attempts.push({ score, pct, date:new Date().toISOString().slice(0,10) }); save(); const message = pct >= 90 ? 'Outstanding work!' : pct >= 70 ? 'Great progress!' : 'Nice effort—review tricky cards and try again!'; views.quiz.innerHTML = `<h2>Quiz Results</h2><p>Score: <strong>${score}/${QUIZ_SIZE}</strong> (${pct}%)</p><p>${message}</p><div class="button-row"><button class="button" id="quizDash">Back to dashboard</button><button class="button button--ghost" id="retryQuiz">Retry quiz</button></div>`; document.querySelector('#quizDash').onclick=renderDashboard; document.querySelector('#retryQuiz').onclick=startQuiz; }

function renderProgress(){ show('progress'); const byCat = CATEGORIES.map(c=>{ const total=FLASHCARDS.filter(f=>f.category===c).length; const learned=FLASHCARDS.filter(f=>f.category===c && state.learned.has(f.id)).length; return `<li>${c}: ${learned}/${total} learned</li>`;}).join(''); views.progress.innerHTML=`<h2>Progress Overview</h2><ul><li>Total cards: ${FLASHCARDS.length}</li><li>Learned cards: ${state.learned.size}</li><li>Tricky cards: ${state.tricky.size}</li><li>Quiz attempts: ${state.attempts.length}</li><li>Best score: ${best()}/${QUIZ_SIZE}</li><li>Latest score: ${latest()}/${QUIZ_SIZE}</li><li>Completed sessions: ${state.sessions}</li></ul><h3>Category progress</h3><ul>${byCat}</ul><div class="button-row"><button class="button" id="progDash">Back to dashboard</button><button class="button button--ghost" id="progReset">Reset progress</button></div>`; document.querySelector('#progDash').onclick=renderDashboard; document.querySelector('#progReset').onclick=()=>{state.learned.clear();state.tricky.clear();state.attempts=[];state.sessions=0;save();renderProgress();}; }

load();
if (state.profile?.name) renderDashboard(); else renderLogin();
