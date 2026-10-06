# FitLog — Workout Library

FitLog is a dark, modern workout library and planning app built for people who want to train with intent and keep their workouts organized.

Users can browse workouts, view detailed workout information, add workouts to today's plan, save favorite workouts, and manage their workout plan from one place.

## Live Website

https://fitlog-rebuild.vercel.app/

## GitHub Repository

https://github.com/arman2k2023/fitlog-rebuild

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* REST API
* LocalStorage
* Next.js Image
* Git & GitHub

## Features

### 1. Workout Library

Browse a collection of workouts with useful information such as difficulty, muscle groups, duration, calories, sets, and rating.

### 2. Workout Search & Filtering

Users can search workouts and filter them by difficulty and muscle group.

### 3. Workout Details

Each workout has a dedicated details page containing:

* Workout image
* Difficulty
* Rating
* Muscle groups
* Equipment
* Duration
* Calories
* Sets and reps
* Step-by-step instructions

### 4. Today's Plan

Users can add workouts to their daily workout plan and manage them from the My Plan page.

### 5. Saved Workouts

Users can save workouts for later and access them from the Saved section.

### 6. Sort Workouts

The My Plan page allows users to sort workouts by:

* Duration
* Calories
* Rating

### 7. Dynamic Workout Metrics

The My Plan page automatically calculates:

* Total exercises
* Total workout minutes
* Total calories

The metrics update when switching between Today's Plan and Saved workouts.

### 8. Responsive Design

FitLog is responsive and works across:

* Mobile devices
* Tablets
* Desktop screens

### 9. LocalStorage Support

Today's Plan and Saved Workouts are stored in the browser's LocalStorage so the user's selections remain available after refreshing the page.

### 10. Responsive Navigation

The navbar includes:

* Workout
* My Plan
* Plan count
* Saved count

The active page is also highlighted.

## API

FitLog uses the following REST API:

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

## Project Structure

```text
fitlog/
├── app/
│   ├── my-plan/
│   │   └── page.tsx
│   ├── saved/
│   │   └── page.tsx
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── MyPlanCard.tsx
│   ├── Navbar.tsx
│   ├── WorkoutCard.tsx
│   ├── WorkoutDetail.tsx
│   └── WorkoutLibrary.tsx
│
├── public/
│   └── logo.png
│
├── types/
│   └── workout.ts
│
├── package.json
└── README.md
```

## Getting Started

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project folder:

```bash
cd fitlog
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Design

FitLog follows a dark gym-focused visual style with:

* Dark background
* Neon green accent
* Bold typography
* Workout cards
* Responsive layouts
* Minimal and focused UI

## Author

**Arman**

Built as a Programming Hero B14-A06 FitLog assignment.
