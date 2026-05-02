# JavaScript Flashcards — Intermediate

## Product purpose
A standalone browser-based educational app for learners who already know JavaScript basics and want stronger practical intermediate skills before advanced topics and frameworks.

## Target users
- Teens and adult self-learners
- Bootcamp students moving beyond beginner level
- Mentors/teachers needing a local demo learning tool

## Features
- Local-only learner profile (name + emoji avatar)
- Dashboard with progress and score snapshot
- Exactly 100 intermediate flashcards
- Interactive flashcard mode (flip, next/prev, learned/tricky marks)
- Keyboard controls: Enter/Space flip, ArrowLeft/ArrowRight navigate
- Quiz mode (10 randomized multiple-choice questions)
- Immediate quiz feedback and final score messaging
- Tricky cards review mode
- Progress view with category-level summary
- localStorage persistence with product-specific key

## File structure
- `index.html` – semantic single-page shell and view containers
- `styles.css` – responsive UI styles, tokens, and accessibility focus states
- `script.js` – app state, rendering, flashcard dataset, quiz, persistence logic
- `README.md` – product documentation

## How to run locally
1. Open the `javascript-flashcards-intermediate` folder.
2. Double-click `index.html` (or serve with any static local server).
3. Use the app directly in your browser (no backend needed).

## localStorage behavior
- Storage key: `kp_js_flashcards_intermediate_v1`
- Persisted fields:
  - learner profile
  - learned card IDs
  - tricky card IDs
  - quiz attempts (score, percent, date)
  - completed sessions count
  - current card index
- Graceful fallback: app continues in memory if storage access fails.

## Learning modes
- **Learning mode:** full card set browsing with flip and mark controls.
- **Quiz mode:** 10-question randomized practice with immediate result feedback.
- **Tricky review mode:** focused review of learner-marked difficult cards.
- **Progress mode:** overall and category progress stats.

## Flashcard dataset structure
Each flashcard object includes:
- `id`
- `category`
- `difficulty`
- `question`
- `answer`
- `explanation`
- `codeExample` (when useful)
- `wrongAnswers` (for quiz options)

The dataset is generated in JavaScript and validated to exactly **100 cards**.

## Category overview
1. Scope and Closures
2. Hoisting
3. Functions Deep Dive
4. Arrays and Objects
5. Destructuring
6. Spread and Rest
7. Template Literals
8. Modules
9. DOM Manipulation
10. Events and Event Delegation
11. Forms and Validation
12. Async JavaScript
13. Promises
14. Fetch API
15. JSON
16. Error Handling
17. LocalStorage
18. Browser APIs
19. Clean Code Habits
20. Debugging

## Quiz logic
- Picks 10 random flashcards per attempt
- Builds options from one correct answer + 3 predefined wrong answers
- Randomizes options each question
- Shows immediate correctness feedback
- Saves attempt score and updates best/latest values

## Accessibility notes
- Semantic layout (`header`, `main`, `section`, buttons, labels)
- Skip link
- Strong visible focus styles
- Keyboard-accessible flashcard interactions
- `aria-live` feedback region
- Reduced motion respect via `prefers-reduced-motion`
- No critical information conveyed by color alone

## Future improvement ideas
- Advanced level pack
- Spaced repetition algorithm
- Multiple learner profiles
- Progress import/export
- Printable flashcard set
- Daily learning goals
- Achievements and badges
- Code challenge mode
- TypeScript version
- PWA offline mode
- Multilingual version
- Backend login
- Teacher/mentor dashboard
