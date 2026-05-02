# JavaScript Flashcards — Advanced

## Purpose
A standalone Level 03 learning app for developers who already passed beginner/intermediate JavaScript and now need advanced runtime, architecture, async, performance, security, testing, and debugging fluency.

## Target users
- Intermediate frontend developers leveling up to professional app work.
- Self-learners preparing for larger codebases/frameworks.
- Junior engineers practicing deeper JavaScript reasoning.

## Features
- Local login/profile (name + emoji avatar).
- Learner dashboard with progress, scores, sessions, and quick actions.
- Exactly **100 advanced flashcards**.
- Interactive flashcard mode (flip, next/prev, mark learned/tricky).
- Keyboard support: Enter/Space flip, Arrow keys navigate.
- Quiz mode: 10 MCQs, randomized questions/options, immediate feedback.
- Tricky cards review mode.
- Progress view with category summary.
- localStorage persistence with graceful safety wrapper.

## File structure
- `index.html` – semantic SPA shell and view containers.
- `styles.css` – responsive UI tokens, layout, component styling, motion/accessibility support.
- `script.js` – state management, rendering logic, flashcard dataset, quiz logic, persistence.
- `README.md` – product documentation.

## Run locally
1. Open `index.html` directly in a browser.
2. No install/build/network/backend required.

## localStorage behavior
Uses product-specific key: `kp_js_flashcards_advanced_v1`.
Stored data includes:
- learner profile
- learned card IDs
- tricky card IDs
- quiz attempts
- completed sessions
- last active card ID

## Learning modes
1. **Dashboard**: entry point for all actions.
2. **Learning mode**: one card at a time, rich answer panel.
3. **Quiz mode**: 10 question randomized assessment.
4. **Tricky review**: only learner-flagged hard cards.
5. **Progress view**: metrics + per-category completion.

## Flashcard dataset structure
Each card object includes:
- `id`
- `category`
- `difficulty`
- `question`
- `answer`
- `explanation`
- `codeExample`
- `practicalNote`
- `wrongAnswers` (for quiz distractors)

## Category coverage (25 x 4 cards = 100)
- Execution Context
- Call Stack
- Event Loop
- Microtasks and Macrotasks
- Closures and Private State
- this Binding
- Prototypes and Inheritance
- Classes
- Modules and Architecture
- Async Patterns
- Promise Combinators
- Generators and Iterators
- Memory Management
- Garbage Collection
- Performance
- DOM Performance
- Browser Rendering
- Event Delegation Deep Dive
- Immutability and State
- Functional Patterns
- Error Boundaries and Resilience
- Security Basics
- Testing Mindset
- Debugging Advanced Issues
- Clean Architecture Habits

## Quiz logic
- Pulls 10 random flashcards per attempt.
- Builds 4 options per question (1 correct + 3 wrong answers).
- Randomizes answer order.
- Gives immediate feedback and explanation.
- Saves attempts with timestamp and tracks best/latest score.

## Accessibility notes
- Semantic landmarks and headings.
- Form labels and fieldset/legend usage.
- Keyboard-operable flashcards and quiz buttons.
- Visible focus states.
- `aria-live` status updates for learned/tricky actions.
- Reduced-motion support via `prefers-reduced-motion`.
- Color is not the only feedback channel (text + structure included).

## How this differs from beginner/intermediate versions
- More precise language around runtime behavior and architectural trade-offs.
- Stronger focus on async control, resilience, performance, and security.
- Practical implementation guidance over syntax memorization.
- Professional mindset: observability, maintainability, reliability at scale.

## Future improvement ideas
- Spaced repetition algorithm.
- Advanced code challenge mode.
- Async debugging exercises.
- Visual event loop simulator.
- Memory leak lab.
- Performance profiling checklist.
- Module architecture mini-course.
- Import/export progress.
- PWA offline mode.
- Backend login.
- TypeScript version.
- Multilingual version.
- Mentor/teacher dashboard.
