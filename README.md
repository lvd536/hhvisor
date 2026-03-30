[Русская версия](./README.ru.md)

# HHVisor

![Next.js](https://img.shields.io/badge/Next.js-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-38B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-UI-black)
![Zustand](https://img.shields.io/badge/Zustand-State-orange)
![Recharts](https://img.shields.io/badge/Recharts-Charts-red)

HHVisor is a modern analytics dashboard for exploring vacancies from hh.ru. The application provides real-time vacancy search, salary analytics, technology demand analysis, keyword comparison, and interactive charts.

---

## Features

* Vacancy search by keyword
* Filter vacancies by region, salary, experience, and work format
* Vacancy list with pagination
* Average and median salary analytics
* Interactive charts built with Recharts
* Keyword comparison
* Save vacancies locally in the browser
* Save filters and search state

---

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zustand
* Lucide React
* Recharts
* HH.ru API

---

## Project Structure

```bash
src/
├── app/
├── components/
│   ├── Overview/
│   ├── MarketDiscovery/
│   ├── JobCard/
│   ├── JobFilters/
│   ├── Charts/
│   └── ui/
├── hooks/
│   ├── useOverviewAnalytics.ts
│   ├── useKeywordAnalytics.ts
│   └── useMarketDiscovery.ts
├── stores/
│   ├── useJobStore.ts
│   ├── useFilterStore.ts
│   ├── useSavedStore.ts
│   └── useAreaStore.ts
├── lib/
│   ├── analytics.ts
│   ├── hh-api.ts
│   └── utils.ts
├── types/
└── consts/
```

---

## Main Pages

### Home

* Vacancy search field
* Filters
* Quick analytics cards
* Vacancy list

### Analytics

* Salary trends
* Top technologies
* Vacancy count
* etc.

### Compare

* Keyword comparison
* Salary comparison
* Vacancy count comparison
* Technology and region comparison

### Saved Vacancies

* Locally saved vacancies
* Quick access to favorite offers

---

## Getting Started

### Installation

```bash
git clone https://github.com/your-username/hhvisor.git
cd hhvisor
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

---

## API

The project uses the public hh.ru API.

endpoints:

```bash
GET https://api.hh.ru/vacancies
GET https://api.hh.ru/areas
GET https://api.hh.ru/dictionaries
GET https://api.hh.ru/employer/{employerId}
```