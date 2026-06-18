# KP_Code Algorithms Academy — product plan

## Product purpose
KP_Code Algorithms Academy is a static educational product for the KP_Code Digital Academy and Digital Vault ecosystem. Its purpose is to teach algorithms through clear Polish explanations, English technical naming, practical JavaScript examples, and consistent lesson standards.

## Target audience
- Beginner and early-intermediate JavaScript learners.
- Self-taught developers preparing for interviews or stronger problem solving.
- KP_Code students who need a structured path from intuition to implementation.

## Learning style
Lessons should be practical, visual, beginner-friendly, and precise. Every topic should explain the real problem, build intuition, show a walkthrough, implement code, analyze complexity, and finish with practice prompts.

## Content standards for each lesson
Each lesson must include: title, difficulty, prerequisites, definition, solved problem, analogy, context, step-by-step explanation, walkthrough, pseudocode, JavaScript implementation, complexity, common mistakes, use cases, practice questions, and summary.

## Proposed information architecture
- `index.html` — dashboard and curriculum entry point.
- `lessons/` — one HTML file per lesson.
- `assets/css/main.css` — global tokens, layout, components, lesson styles.
- `assets/js/main.js` — progressive enhancement only.
- `plan.md` — roadmap and quality standard.
- `README.md` — project usage and architecture notes.

## Priority order for future lessons
1. Algorithmic Thinking Basics — build a mental model for breaking problems down. Goal: understand inputs, outputs, constraints. Difficulty: Beginner. Example: planning a search feature.
2. Big O Notation — explain runtime and memory growth. Goal: compare algorithms with confidence. Difficulty: Beginner. Example: comparing list scans and halving.
3. Linear Search — scan items one by one. Goal: understand O(n) baseline searching. Difficulty: Beginner. Example: finding a username in an unsorted list.
4. Binary Search — halve a sorted search space. Goal: use O(log n) search correctly. Difficulty: Beginner. Example: finding an ID in sorted records.
5. Bubble Sort — compare adjacent items. Goal: learn sorting mechanics and inefficiency. Difficulty: Beginner. Example: sorting small classroom scores.
6. Selection Sort — repeatedly select the minimum. Goal: understand in-place sorting. Difficulty: Beginner. Example: arranging product prices.
7. Insertion Sort — insert into a sorted prefix. Goal: understand efficient behavior on nearly sorted data. Difficulty: Beginner. Example: sorting cards in hand.
8. Recursion Basics — functions calling themselves. Goal: identify base and recursive cases. Difficulty: Beginner. Example: nested folder traversal.
9. Factorial — classic recursion exercise. Goal: trace call stacks. Difficulty: Beginner. Example: counting arrangements.
10. Fibonacci — recursion, iteration, and repeated work. Goal: see why naive recursion can be expensive. Difficulty: Beginner. Example: growth patterns.
11. Two Pointers — process data from two positions. Goal: solve pair and window-style problems. Difficulty: Intermediate. Example: pair sum in sorted array.
12. Sliding Window — maintain a moving range. Goal: optimize contiguous subarray/string problems. Difficulty: Intermediate. Example: longest substring constraints.
13. Hash Map Lookup — constant-time keyed access. Goal: replace nested loops with maps. Difficulty: Beginner. Example: frequency counting.
14. Stack — last-in-first-out structure. Goal: model undo, parsing, and matching. Difficulty: Beginner. Example: balanced parentheses.
15. Queue — first-in-first-out structure. Goal: model scheduling and BFS. Difficulty: Beginner. Example: support ticket queue.
16. Linked List Basics — nodes and references. Goal: understand non-contiguous structures. Difficulty: Intermediate. Example: playlist navigation.
17. Merge Sort — divide and conquer sorting. Goal: implement O(n log n) stable sorting. Difficulty: Intermediate. Example: sorting large exported records.
18. Quick Sort — partition-based sorting. Goal: understand pivots and average-case speed. Difficulty: Intermediate. Example: sorting dashboard data.
19. Binary Tree Traversal — visit tree nodes in different orders. Goal: learn preorder, inorder, postorder. Difficulty: Intermediate. Example: rendering nested categories.
20. Breadth-First Search — explore graph levels. Goal: use queues for shortest paths in unweighted graphs. Difficulty: Intermediate. Example: friend suggestions by distance.
21. Depth-First Search — explore paths deeply. Goal: use recursion or stack for graph traversal. Difficulty: Intermediate. Example: maze exploration.
22. Greedy Algorithms — choose the best local move. Goal: identify when greedy works. Difficulty: Intermediate. Example: activity scheduling.
23. Dijkstra Algorithm — shortest weighted paths. Goal: model priorities and relaxation. Difficulty: Advanced. Example: route planning.
24. Dynamic Programming Basics — reuse overlapping subproblems. Goal: define state and transitions. Difficulty: Advanced. Example: climbing stairs variants.
25. Knapsack Problem — optimize value under capacity. Goal: practice DP tables. Difficulty: Advanced. Example: choosing project features within budget.
26. String Matching Basics — search patterns in text. Goal: compare naive and optimized thinking. Difficulty: Intermediate. Example: filtering article content.
27. Palindrome Check — validate mirrored strings. Goal: apply two pointers. Difficulty: Beginner. Example: checking user-entered phrases.
28. Anagram Check — compare character frequencies. Goal: use maps effectively. Difficulty: Beginner. Example: word puzzle validation.

## Lesson template structure
1. Lesson hero with metadata.
2. Table of contents.
3. Complete article sections.
4. Code and pseudocode blocks.
5. Concept cards or diagrams.
6. Quiz/practice section.
7. Summary and next lesson navigation.

## Quality checklist
- Content is accurate, beginner-friendly, and complete.
- Examples use readable JavaScript without dependencies.
- Complexity analysis covers time and memory.
- Common mistakes are concrete and actionable.
- The page can stand alone as a useful lesson.

## Accessibility checklist
- Semantic landmarks and heading hierarchy.
- Keyboard-accessible navigation and controls.
- Visible focus states.
- Strong color contrast in light and dark modes.
- No important hover-only content.
- Motion respects `prefers-reduced-motion`.

## UI/UX checklist
- Mobile-first responsive layout.
- Readable line length and typography rhythm.
- Clear primary CTA to the active lesson.
- Consistent cards, buttons, spacing, and tokens.
- Lesson pages support scanning and deep reading.

## Future development ideas
- Add progress tracking with local storage.
- Add interactive algorithm visualizers.
- Add downloadable cheat sheets.
- Add lesson search and filters by difficulty.
- Add bilingual glossary of algorithm terms.
- Add unit-tested code snippets as separate files when the product grows.
