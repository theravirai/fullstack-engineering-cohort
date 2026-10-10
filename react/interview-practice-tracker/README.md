# Interview Practice Tracker

[![Deployment](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://interview-practice-tracker-pied.vercel.app/)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Storage](https://img.shields.io/badge/Storage-LocalStorage-3B82F6?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-10B981?style=flat-square)

A responsive weekly interview-preparation dashboard built for frontend machine coding evaluations. It allows candidates to track, organize, and assess preparation across Data Structures & Algorithms (DSA), Git, Technical concepts, and Machine Coding rounds.

![Interview Practice Tracker Demo](./assets/interview-practice-tracker.gif)

---

## Deliverables Links

- **Live Deployed Application:** [https://interview-practice-tracker-pied.vercel.app/](https://interview-practice-tracker-pied.vercel.app/)

---

## Features Implemented

### 1. Dashboard Metrics
- **Total Questions:** Real-time count of all logged questions across statuses (Completed, In Progress, Pending).
- **Completed DSA Problems:** Dedicated tracker for algorithmic questions with completion percentage.
- **Completed Interview Questions:** Aggregated metric for non-DSA questions (Git and Technical concepts).
- **Machine Coding Status Widget:** Interactive selector for machine coding readiness (`Not Started`, `In Progress`, `Under Review`, `Cleared & Ready`).

### 2. Progress Tracker
- **Visual Completion Percentage:** Derived completion rate based on stored questions:
  `Completion % = Math.round((Completed Questions / Total Questions) * 100)`
- **Category Breakdowns:** Progress indicators for individual categories (DSA, Git, Technical).

### 3. Question Tracker (CRUD & Inline Updates)
- **Add & Edit Modal:**
  - Category selector (`DSA`, `Git`, `Technical`).
  - Difficulty options (`Easy`, `Medium`, `Hard`).
  - Status options (`Pending`, `In Progress`, `Completed`).
  - Optional reference URL (e.g. LeetCode problem link) and personal implementation notes.
- **Form Validation:**
  - Required title check with minimum length constraint (>= 3 characters).
  - URL format validation for reference links.
  - Descriptive inline validation errors.
- **Inline Status Changer:** Dropdown on each card to change status immediately without opening the edit modal.
- **Delete Action:** Question removal with user confirmation.

### 4. Search and Multi-Criteria Filtering
- **Live Search:** Instant filtering by question title and keyword matching across notes.
- **Multi-Dropdown Filters:**
  - Category filter (`All`, `DSA`, `Git`, `Technical`)
  - Difficulty filter (`All`, `Easy`, `Medium`, `Hard`)
  - Status filter (`All`, `Pending`, `In Progress`, `Completed`)
- **Active Filter Indicator:** Displays filtered count vs total items with a one-click "Clear all filters" button.

### 5. Application States and UX Polish
- **Empty State:** Clean fallback screen when no questions are present, including an option to reload default seed questions.
- **No Search Results State:** Clear feedback when search queries or filters produce no matches, with a reset button.
- **Persistence:** All data persists across page refreshes via browser `localStorage`.
- **Responsive Layout:** Adaptive design supporting desktop and mobile screens.

---

## Technology Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Persistence:** React custom hook `useLocalStorage`

```text
interview-practice-tracker/
├── assets/
│   └── interview-practice-tracker.gif # Demo walkthrough animation
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Application header and top-level actions
│   │   ├── DashboardStats.jsx         # Summary metric cards
│   │   ├── ProgressBar.jsx            # Overall and category progress indicators
│   │   ├── MachineCodingWidget.jsx    # Machine coding round status selector
│   │   ├── FilterBar.jsx              # Search and dropdown filters
│   │   ├── QuestionList.jsx           # Responsive list container
│   │   ├── QuestionCard.jsx           # Individual card with inline status change
│   │   ├── QuestionFormModal.jsx      # Modal form with validation
│   │   └── EmptyState.jsx             # Empty and zero-match state handlers
│   ├── constants/
│   │   └── options.js                 # Categories, difficulties, and style mappings
│   ├── data/
│   │   └── initialData.js             # Initial dataset for demonstration
│   ├── hooks/
│   │   └── useLocalStorage.js         # Reactive localStorage synchronization hook
│   ├── App.jsx                        # Root state and layout coordinator
│   ├── index.css                      # Global styles and Tailwind directives
│   └── main.jsx                       # Entry point
├── index.html                         # HTML template
├── package.json                       # Dependencies and build scripts
├── vite.config.js                     # Vite build configuration
└── README.md                          # Project documentation
```

---

## Local Setup Instructions

### Prerequisites
- Node.js version 18 or above
- npm (or yarn / pnpm)

### Steps

1. Navigate to the project directory:
   ```bash
   cd react/interview-practice-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Access the dashboard at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled to the `dist/` directory.

---

## Assumptions
1. Client-side storage (`localStorage`) is used for persistence as no backend is required.
2. Initial demo data is seeded upon first visit so evaluators can inspect features immediately without manual entry.
3. "Completed interview questions" tracks completed questions under Git and Technical categories.
