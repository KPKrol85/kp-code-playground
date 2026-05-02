# JavaScript Flashcards for Kids

## Purpose
A standalone, kid-friendly learning app that teaches JavaScript basics through flashcards, quizzes, and progress tracking.

## Target users
- Children and very young beginners learning coding
- Parents/teachers guiding beginner practice

## Features
- Local profile login (name + emoji avatar)
- Dashboard with learning stats
- 100 beginner flashcards
- Flashcard mode (flip, next/previous, learned/tricky marking)
- Quiz mode (10 randomized multiple-choice questions)
- Tricky-card review mode
- Progress view with category summary
- Local persistence via `localStorage`
- Responsive, accessible, no-backend web app

## File structure
- `index.html` – App shell and login template
- `styles.css` – Responsive design system and component styles
- `script.js` – Data, state management, view rendering, interactions, persistence
- `README.md` – Product documentation

## Run locally
1. Open `index.html` in any modern browser.
2. No install/build steps needed.

## LocalStorage behavior
Stored key: `kp_js_kids_app_v1`
- learner profile
- learned card IDs
- tricky card IDs
- quiz attempts
- best/latest quiz score
- completed sessions
- last session timestamp

If storage is unavailable, app still runs but persistence may not work.

## Learning modes
1. **Start learning**: browse flashcards and mark learned/tricky.
2. **Take quiz**: 10 questions per session, immediate feedback, final score.
3. **Review tricky cards**: filtered card set with empty-state message.
4. **View progress**: stats + learned cards by category.

## Flashcard dataset shape
Each card object includes:
- `id`
- `category`
- `difficulty`
- `question`
- `answer`
- `explanation`
- `wrongAnswers` (used for quiz distractors)

## Accessibility notes
- Semantic form controls and buttons
- Keyboard flashcard controls (Enter/Space/Arrow keys)
- Visible focus states
- `aria-live` on app region
- Reduced-motion support via `prefers-reduced-motion`
- Contrast-friendly palette and text labels

## Future improvements
- Parent/teacher dashboard
- Multiple learner profiles
- Difficulty levels
- Daily learning goals
- Printable flashcard set
- Sound effects with mute option
- Badges/achievements
- Spaced repetition algorithm
- Import/export progress
- Backend login
- Multilingual version
- TypeScript version
- PWA offline mode
