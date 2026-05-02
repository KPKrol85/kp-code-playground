const APP_KEY = 'kp_js_kids_app_v1';
const AVATARS = ['🧠','🚀','🌟','🐼','🦊','🐙','🦄','🐯'];
const CATEGORIES = ['JavaScript Basics','Variables','Data Types','Strings','Numbers','Booleans','Arrays','Objects','Functions','Conditions','Loops','DOM Basics','Events','Console','Good Habits'];
const STORAGE = {get(){try{return JSON.parse(localStorage.getItem(APP_KEY))||{};}catch{return {}; }},set(v){try{localStorage.setItem(APP_KEY,JSON.stringify(v));return true;}catch{return false;}}};

const flashcards = Array.from({length:100},(_,i)=>{
  const category = CATEGORIES[i%15];
  const difficulty = i<40?'Easy':i<75?'Medium':'Starter+';
  const qBank = {
    'JavaScript Basics':['What does JavaScript do on a web page?','Where do we run JavaScript in a browser?','Which tag can include JavaScript?'],
    'Variables':['What is a variable?','Which keyword creates a block-scoped variable?','Can a variable value change later?'],
    'Data Types':['What is a data type?','Is 7 a number or a string?','What type is true?'],
    'Strings':['What is a string?','How do we join two strings?','Can strings include spaces?'],
    'Numbers':['What does + do with numbers?','What is 10 / 2?','Can numbers be decimals in JS?'],
    'Booleans':['What values can a boolean have?','What does !true become?','Is 5 > 2 true or false?'],
    'Arrays':['What is an array?','How do we get the first item in an array?','Can arrays store mixed types?'],
    'Objects':['What is an object in JS?','How do you read a property called name?','Can objects hold functions too?'],
    'Functions':['What is a function?','How do we call a function?','Why use functions?'],
    'Conditions':['What does if do?','When does else run?','What operator checks equality value+type?'],
    'Loops':['Why use a loop?','Which loop repeats while a condition is true?','Can loops stop early with break?'],
    'DOM Basics':['What is the DOM?','What does querySelector do?','Can JS change text in HTML?'],
    'Events':['What is a click event?','How do we listen for an event?','Can one button have more than one listener?'],
    'Console':['What does console.log do?','Is console useful for debugging?','Where do we see console output?'],
    'Good Habits':['Why use clear variable names?','Why add comments carefully?','Why test small steps?']
  };
  const aBank = {
    'JavaScript Basics':'It makes pages interactive, like clicks and updates.',
    'Variables':'A variable is a named box that stores data.',
    'Data Types':'Data type tells what kind of value something is.',
    'Strings':'A string is text wrapped in quotes.',
    'Numbers':'Numbers are values for counting and math.',
    'Booleans':'Booleans are true/false values.',
    'Arrays':'An array is an ordered list of items.',
    'Objects':'An object stores related data in key-value pairs.',
    'Functions':'A function is reusable instructions you can run.',
    'Conditions':'Conditions choose what code runs based on checks.',
    'Loops':'Loops repeat code without copy-paste.',
    'DOM Basics':'The DOM is the page structure JavaScript can change.',
    'Events':'Events are actions like clicks, typing, or key presses.',
    'Console':'The console shows logs and helps find bugs.',
    'Good Habits':'Good habits make code easier to read and fix.'
  };
  const question = qBank[category][i%3] + ` (#${i+1})`;
  const answer = aBank[category];
  return {id:i+1,category,difficulty,question,answer,explanation:`Tip: ${answer} Keep practicing with short examples.`,wrongAnswers:['It only changes colors.','It deletes HTML forever.','It works only offline.']};
});

const state = { data: STORAGE.get(), view:'login', current:0, reviewTricky:false, quiz:null };
state.data.profile ??= null; state.data.learnedIds ??= []; state.data.trickyIds ??= []; state.data.quizAttempts ??=[]; state.data.bestQuizScore ??=0; state.data.latestQuizScore ??=0; state.data.sessions ??=0;

const app = document.getElementById('app');
const tplLogin = document.getElementById('view-login');

function save(){STORAGE.set(state.data);}
function btn(label,id,kind='ghost'){return `<button class="btn btn--${kind}" data-action="${id}">${label}</button>`}
function dashboard(){const learned=state.data.learnedIds.length; const tricky=state.data.trickyIds.length;
return `<section class="panel"><h2>${state.data.profile.avatar} Hi ${state.data.profile.name}!</h2>
<div class="stats-grid">
<article><strong>Total cards</strong><div>100</div></article><article><strong>Learned</strong><div>${learned}</div></article><article><strong>Best quiz</strong><div>${state.data.bestQuizScore}%</div></article><article><strong>Sessions</strong><div>${state.data.sessions}</div></article>
<article><strong>Tricky cards</strong><div>${tricky}</div></article><article><strong>Last score</strong><div>${state.data.latestQuizScore}%</div></article>
</div><p class='note'>Last session: ${state.data.lastSession || 'No session yet. Start now!'}</p>
<div class="action-grid">${btn('Start learning','learn','primary')}${btn('Take quiz','quiz','primary')}${btn('Review tricky cards','tricky')}${btn('View progress','progress')}${btn('Reset progress','reset')}${btn('Switch learner / Log out','logout')}</div></section>`}
function flashView(){const set=(state.reviewTricky?flashcards.filter(c=>state.data.trickyIds.includes(c.id)):flashcards); if(!set.length)return `<section class='panel'><h2>No tricky cards yet 🎉</h2><p>Keep learning and mark cards as tricky if needed.</p>${btn('Back to dashboard','home')}</section>`;
const card=set[state.current%set.length], flipped=state.flipped;
const progress=Math.round(((state.current+1)/set.length)*100);
return `<section class='panel'><p><span class='badge'>${card.category}</span> <span class='badge'>${card.difficulty}</span></p><div class='progress'><span style='width:${progress}%'></span></div><p>Card ${state.current+1} / ${set.length}</p>
<button class='flashcard ${flipped?'is-flipped':''}' data-action='flip' aria-label='Flashcard. Press Enter or Space to flip.'>
<div class='flashcard__inner'><article class='flashcard__side'><h3>Question</h3><p>${card.question}</p></article><article class='flashcard__side flashcard__side--back'><h3>Answer</h3><p>${card.answer}</p><p class='note'>${card.explanation}</p></article></div></button>
<p class='note'>Tip: Enter/Space flips. Arrow keys move cards.</p><div class='action-grid'>${btn('Previous','prev')}${btn('Next','next','primary')}${btn('Mark learned','learned')}${btn('Mark tricky','markTricky')}${btn('Back','home')}</div></section>`}
function progressView(){const total=100, learned=state.data.learnedIds.length, tricky=state.data.trickyIds.length;const map=Object.fromEntries(CATEGORIES.map(c=>[c,0]));flashcards.forEach(c=>{if(state.data.learnedIds.includes(c.id))map[c.category]++;});
return `<section class='panel'><h2>Your Progress</h2><p>Total: ${total} | Learned: ${learned} | Tricky: ${tricky}</p><p>Quiz attempts: ${state.data.quizAttempts.length} | Best: ${state.data.bestQuizScore}% | Latest: ${state.data.latestQuizScore}%</p><h3>Category summary</h3><ul>${Object.entries(map).map(([k,v])=>`<li>${k}: ${v}</li>`).join('')}</ul>${btn('Reset progress','reset')}${btn('Back','home')}</section>`}
function makeQuiz(){const pool=[...flashcards].sort(()=>Math.random()-.5).slice(0,10).map(c=>({card:c,options:[c.answer,...c.wrongAnswers].sort(()=>Math.random()-.5),chosen:null,correct:null})); state.quiz={i:0,pool,score:0,done:false};}
function quizView(){if(!state.quiz) makeQuiz(); const q=state.quiz.pool[state.quiz.i]; if(state.quiz.done){const pct=Math.round((state.quiz.score/10)*100); const msg=pct>=80?'Amazing work! 🌟':pct>=50?'Nice effort! Keep going! 💪':'Great start! Practice and try again 😊'; return `<section class='panel'><h2>Quiz complete</h2><p>Your score: ${state.quiz.score}/10 (${pct}%)</p><p>${msg}</p>${btn('Back to dashboard','home')}${btn('Try another quiz','quiz','primary')}</section>`}
return `<section class='panel'><h2>Quiz time (${state.quiz.i+1}/10)</h2><p>${q.card.question}</p><div class='quiz-options'>${q.options.map((o,idx)=>`<button class='btn btn--ghost' data-action='answer' data-idx='${idx}'>${o}</button>`).join('')}</div><p class='note'>Choose one answer.</p>${btn('Back','home')}</section>`}

function render(){if(!state.data.profile){app.innerHTML='';app.appendChild(tplLogin.content.cloneNode(true));const box=app.querySelector('#avatar-options');box.innerHTML=AVATARS.map((a,i)=>`<button type='button' class='avatar-option ${i===0?'is-active':''}' data-avatar='${a}'>${a}</button>`).join('');return;} if(state.view==='home')app.innerHTML=dashboard(); if(state.view==='learn')app.innerHTML=flashView(); if(state.view==='progress')app.innerHTML=progressView(); if(state.view==='quiz')app.innerHTML=quizView();}

app.addEventListener('click',e=>{const a=e.target.closest('[data-action]')?.dataset.action; if(!a) {const av=e.target.closest('[data-avatar]'); if(av){app.querySelectorAll('.avatar-option').forEach(b=>b.classList.remove('is-active'));av.classList.add('is-active');} return;}
if(a==='home'){state.view='home'; state.reviewTricky=false; state.flipped=false;} if(a==='learn'){state.view='learn'; state.reviewTricky=false; state.current=0; state.flipped=false; state.data.sessions++; state.data.lastSession=new Date().toLocaleString(); save();} if(a==='tricky'){state.view='learn'; state.reviewTricky=true; state.current=0; state.flipped=false;} if(a==='progress') state.view='progress'; if(a==='flip') state.flipped=!state.flipped; if(a==='next') {state.current++; state.flipped=false;} if(a==='prev') {state.current=Math.max(0,state.current-1); state.flipped=false;} if(a==='learned'){const set=state.reviewTricky?flashcards.filter(c=>state.data.trickyIds.includes(c.id)):flashcards; const id=set[state.current%set.length].id; if(!state.data.learnedIds.includes(id)) state.data.learnedIds.push(id); save();} if(a==='markTricky'){const set=state.reviewTricky?flashcards.filter(c=>state.data.trickyIds.includes(c.id)):flashcards; const id=set[state.current%set.length].id; if(!state.data.trickyIds.includes(id)) state.data.trickyIds.push(id); save();}
if(a==='reset'){state.data={profile:state.data.profile,learnedIds:[],trickyIds:[],quizAttempts:[],bestQuizScore:0,latestQuizScore:0,sessions:0}; save(); state.view='home';}
if(a==='logout'){state.data.profile=null; save();}
if(a==='quiz'){state.quiz=null; state.view='quiz';}
if(a==='answer'){const idx=Number(e.target.dataset.idx); const q=state.quiz.pool[state.quiz.i]; const chosen=q.options[idx]; const correct=chosen===q.card.answer; if(correct) state.quiz.score++; alert(correct?'Correct! 🎉':'Nice try! Correct answer: '+q.card.answer+'\n'+q.card.explanation); state.quiz.i++; if(state.quiz.i>=10){state.quiz.done=true; const pct=Math.round((state.quiz.score/10)*100); state.data.quizAttempts.push({date:new Date().toISOString(),score:pct}); state.data.latestQuizScore=pct; state.data.bestQuizScore=Math.max(state.data.bestQuizScore,pct); save();}}
render();});

app.addEventListener('submit',e=>{if(e.target.id==='login-form'){e.preventDefault(); const name=e.target.learnerName.value.trim(); if(!name)return; const avatar=app.querySelector('.avatar-option.is-active')?.dataset.avatar||'🌟'; state.data.profile={name,avatar}; state.view='home'; save(); render();}});
document.addEventListener('keydown',e=>{if(state.view!=='learn') return; if(['Enter',' '].includes(e.key)){state.flipped=!state.flipped; render();} if(e.key==='ArrowRight'){state.current++; state.flipped=false; render();} if(e.key==='ArrowLeft'){state.current=Math.max(0,state.current-1); state.flipped=false; render();}});

if(state.data.profile) state.view='home';
render();
