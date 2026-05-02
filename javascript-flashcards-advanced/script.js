const STORAGE_KEY = 'kp_js_flashcards_advanced_v1';
const AVATARS = ['🧠','🚀','💡','🧩','⚙️','🧪','📘','🖥️'];
const QUIZ_SIZE = 10;
const categories = [
'Execution Context','Call Stack','Event Loop','Microtasks and Macrotasks','Closures and Private State','this Binding','Prototypes and Inheritance','Classes','Modules and Architecture','Async Patterns','Promise Combinators','Generators and Iterators','Memory Management','Garbage Collection','Performance','DOM Performance','Browser Rendering','Event Delegation Deep Dive','Immutability and State','Functional Patterns','Error Boundaries and Resilience','Security Basics','Testing Mindset','Debugging Advanced Issues','Clean Architecture Habits'
];
const state = { profile:null, learned:new Set(), tricky:new Set(), quizAttempts:[], sessions:0, lastCard:1, view:'login', quiz:null, currentCardIndex:0, flipped:false, reviewOnly:false };
const safeStore={get(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return {}}},set(v){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(v));return true}catch{return false}}};
const flashcards = categories.flatMap((category,cIdx)=>Array.from({length:4},(_,i)=>{
  const id=cIdx*4+i+1;
  return {
    id, category, difficulty:['Advanced','Advanced','Advanced+','Advanced+'][i],
    question:`${category}: key concept ${i+1}?`,
    answer:[
      'Understand execution order and scope mechanics clearly.',
      'Model trade-offs before choosing implementation details.',
      'Use tooling and patterns that improve reliability at scale.',
      'Connect language behavior to real UI performance and architecture decisions.'
    ][i],
    explanation:`In professional frontend work, ${category.toLowerCase()} affects correctness, debuggability, and maintainability. Senior-level decisions require understanding not only what works, but why it behaves that way under load and team scale.`,
    codeExample:[
`function demo(){\n  console.log('trace', ${id});\n}`,
`const task = Promise.resolve().then(() => 'microtask');`,
`const controller = new AbortController();\nfetch('/api', { signal: controller.signal });`,
`const nextState = structuredClone(prevState);`
    ][i],
    practicalNote:'Use this concept during code reviews: ask whether the approach is observable, testable, and safe under changing requirements.',
    wrongAnswers:[
      'It only matters in backend Node.js code.',
      'You should memorize syntax and ignore runtime behavior.',
      'The concept is obsolete in modern browsers.'
    ]
  }
}));
if (flashcards.length !== 100) throw new Error('Flashcards must be exactly 100');

const el = id=>document.getElementById(id);
const views=['view-login','view-dashboard','view-learning','view-quiz','view-progress'];
function save(){safeStore.set({profile:state.profile,learned:[...state.learned],tricky:[...state.tricky],quizAttempts:state.quizAttempts,sessions:state.sessions,lastCard:state.lastCard});}
function load(){const d=safeStore.get();if(d.profile) state.profile=d.profile;state.learned=new Set(d.learned||[]);state.tricky=new Set(d.tricky||[]);state.quizAttempts=d.quizAttempts||[];state.sessions=d.sessions||0;state.lastCard=d.lastCard||1;}
function show(view){views.forEach(v=>el(v).classList.add('hidden'));el(`view-${view}`).classList.remove('hidden');state.view=view;}
function renderAvatars(){const box=el('avatar-options'); box.innerHTML=''; AVATARS.forEach((a,idx)=>{const b=document.createElement('button');b.type='button';b.className='avatar-choice'+(idx===0?' active':'');b.textContent=a;b.dataset.avatar=a; box.appendChild(b);});}
function dashboard(){const latest=state.quizAttempts.at(-1)?.score??0,best=Math.max(0,...state.quizAttempts.map(q=>q.score));
el('view-dashboard').innerHTML=`<div class="panel"><h2 id="dashboard-title">${state.profile.avatar} Welcome back, ${state.profile.name}</h2>
<div class="dashboard-grid"><div class="stat">Total cards: 100</div><div class="stat">Learned: ${state.learned.size}</div><div class="stat">Tricky: ${state.tricky.size}</div><div class="stat">Best quiz: ${best}%</div><div class="stat">Latest quiz: ${latest}%</div><div class="stat">Completed sessions: ${state.sessions}</div></div>
<p class="note">${state.quizAttempts.length?`Last quiz: ${latest}% on ${new Date(state.quizAttempts.at(-1).date).toLocaleString()}`:'No quiz attempts yet.'}</p>
<div class="actions"><button class="btn btn--primary" data-act="learn">Start advanced learning</button><button class="btn btn--ghost" data-act="quiz">Take advanced quiz</button><button class="btn btn--ghost" data-act="tricky">Review tricky cards</button><button class="btn btn--ghost" data-act="progress">View progress</button><button class="btn btn--ghost" data-act="reset">Reset progress</button><button class="btn btn--ghost" data-act="logout">Switch learner / log out</button></div></div>`;
show('dashboard');
}
function currentCards(){return state.reviewOnly?flashcards.filter(c=>state.tricky.has(c.id)):flashcards;}
function learning(){const cards=currentCards();if(!cards.length){el('view-learning').innerHTML='<div class="panel"><h2>No tricky cards yet</h2><p class="note">Great signal. Keep pushing into the harder edge cases.</p><button class="btn btn--primary" data-act="back">Back to dashboard</button></div>';show('learning');return;}
const card=cards[state.currentCardIndex%cards.length]; state.lastCard=card.id; save();
const pct=Math.round(((state.currentCardIndex+1)/cards.length)*100);
el('view-learning').innerHTML=`<div class="panel flashcard"><h2 id="learning-title">${state.reviewOnly?'Tricky Review':'Learning Mode'}</h2><div class="progress"><div class="progress__bar" style="width:${pct}%"></div></div><p class="note">Card ${state.currentCardIndex+1}/${cards.length}</p>
<div class="card" tabindex="0" id="card-body"><div class="badges"><span class="badge">${card.category}</span><span class="badge">${card.difficulty}</span></div><h3>${card.question}</h3>${state.flipped?`<p><strong>${card.answer}</strong></p><p>${card.explanation}</p><pre class="code">${card.codeExample}</pre><p class="note">${card.practicalNote}</p>`:'<p class="note">Press Space or Enter to flip.</p>'}</div>
<div class="actions"><button class="btn btn--ghost" data-act="prev">Previous</button><button class="btn btn--primary" data-act="flip">Flip</button><button class="btn btn--ghost" data-act="next">Next</button><button class="btn btn--ghost" data-act="learned">Mark learned</button><button class="btn btn--ghost" data-act="tricky-mark">Mark tricky</button><button class="btn btn--ghost" data-act="back">Back</button></div></div>`; show('learning');
}
function startQuiz(){const shuffled=[...flashcards].sort(()=>Math.random()-0.5).slice(0,QUIZ_SIZE).map(c=>({card:c,options:[c.answer,...c.wrongAnswers].sort(()=>Math.random()-0.5),selected:null}));state.quiz={index:0,items:shuffled,score:0,done:false};quiz();}
function quiz(){const q=state.quiz;if(q.done){const pct=Math.round((q.score/QUIZ_SIZE)*100);state.quizAttempts.push({score:pct,date:new Date().toISOString()}); save();
el('view-quiz').innerHTML=`<div class="panel"><h2 id="quiz-title">Quiz complete</h2><p>Your score: <strong>${q.score}/${QUIZ_SIZE}</strong> (${pct}%)</p><p class="note">${pct>=80?'Excellent systems thinking.':'Solid progress—review tricky concepts and run another round.'}</p><div class="actions"><button class="btn btn--primary" data-act="quiz-again">Try again</button><button class="btn btn--ghost" data-act="back">Back to dashboard</button></div></div>`;show('quiz');return;}
const item=q.items[q.index];
el('view-quiz').innerHTML=`<div class="panel"><h2 id="quiz-title">Advanced Quiz</h2><p class="note">Question ${q.index+1}/${QUIZ_SIZE}</p><h3>${item.card.question}</h3><div class="quiz-options">${item.options.map((o,i)=>`<button class="btn option" data-opt="${i}">${o}</button>`).join('')}</div><p class="note" id="quiz-feedback"></p><button class="btn btn--ghost" data-act="back">Back</button></div>`; show('quiz');}
function progress(){const byCat=categories.map(cat=>{const ids=flashcards.filter(f=>f.category===cat).map(f=>f.id);const done=ids.filter(id=>state.learned.has(id)).length;return `<li>${cat}: ${done}/4</li>`}).join('');
const latest=state.quizAttempts.at(-1)?.score??0,best=Math.max(0,...state.quizAttempts.map(q=>q.score));
el('view-progress').innerHTML=`<div class="panel"><h2 id="progress-title">Progress</h2><div class="progress-grid"><div class="stat">Total: 100</div><div class="stat">Learned: ${state.learned.size}</div><div class="stat">Tricky: ${state.tricky.size}</div><div class="stat">Quiz attempts: ${state.quizAttempts.length}</div><div class="stat">Best: ${best}%</div><div class="stat">Latest: ${latest}%</div><div class="stat">Sessions: ${state.sessions}</div></div><h3>Category progress</h3><ul>${byCat}</ul><div class="actions"><button class="btn btn--ghost" data-act="reset">Reset progress</button><button class="btn btn--primary" data-act="back">Back</button></div></div>`;show('progress');}

document.addEventListener('click',(e)=>{const t=e.target;if(!(t instanceof HTMLElement))return;
if(t.closest('.avatar-choice')){document.querySelectorAll('.avatar-choice').forEach(a=>a.classList.remove('active'));t.classList.add('active');}
const act=t.dataset.act;if(!act)return;
if(act==='learn'){state.reviewOnly=false;state.currentCardIndex=Math.max(0,flashcards.findIndex(c=>c.id===state.lastCard));state.flipped=false;state.sessions++;save();learning();}
if(act==='tricky'){state.reviewOnly=true;state.currentCardIndex=0;state.flipped=false;learning();}
if(act==='quiz') startQuiz(); if(act==='progress') progress(); if(act==='back') dashboard();
if(act==='next'){state.currentCardIndex++;state.flipped=false;learning();}
if(act==='prev'){state.currentCardIndex=Math.max(0,state.currentCardIndex-1);state.flipped=false;learning();}
if(act==='flip'){state.flipped=!state.flipped;learning();}
if(act==='learned'){const id=currentCards()[state.currentCardIndex%currentCards().length].id;state.learned.add(id);save();el('live-region').textContent='Marked as learned';}
if(act==='tricky-mark'){const id=currentCards()[state.currentCardIndex%currentCards().length].id;state.tricky.has(id)?state.tricky.delete(id):state.tricky.add(id);save();el('live-region').textContent='Updated tricky status';}
if(act==='reset'){state.learned.clear();state.tricky.clear();state.quizAttempts=[];state.sessions=0;save();dashboard();}
if(act==='logout'){localStorage.removeItem(STORAGE_KEY);location.reload();}
if(act==='quiz-again') startQuiz();
});

document.addEventListener('keydown',(e)=>{if(state.view!=='learning')return; if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;
if(e.key===' '||e.key==='Enter'){e.preventDefault();state.flipped=!state.flipped;learning();}
if(e.key==='ArrowRight'){state.currentCardIndex++;state.flipped=false;learning();}
if(e.key==='ArrowLeft'){state.currentCardIndex=Math.max(0,state.currentCardIndex-1);state.flipped=false;learning();}
});

document.addEventListener('click',(e)=>{const btn=e.target.closest('[data-opt]'); if(!btn||state.view!=='quiz'||!state.quiz||state.quiz.done) return;
const item=state.quiz.items[state.quiz.index]; const chosen=item.options[Number(btn.dataset.opt)]; const correct=item.card.answer;
const nodes=[...document.querySelectorAll('[data-opt]')]; nodes.forEach(n=>{n.disabled=true; const txt=n.textContent; if(txt===correct)n.classList.add('correct'); if(txt===chosen&&txt!==correct)n.classList.add('wrong');});
if(chosen===correct)state.quiz.score++; el('quiz-feedback').textContent=`${chosen===correct?'Correct.':'Not quite.'} ${item.card.explanation}`;
setTimeout(()=>{state.quiz.index++; if(state.quiz.index>=QUIZ_SIZE) state.quiz.done=true; quiz();},900);
});

document.getElementById('login-form').addEventListener('submit',(e)=>{e.preventDefault(); const name=el('learner-name').value.trim(); if(!name) return;
const avatar=document.querySelector('.avatar-choice.active')?.dataset.avatar||'🧠'; state.profile={name,avatar}; save(); dashboard();});

function init(){renderAvatars(); load(); if(state.profile) dashboard(); else show('login');}
init();
