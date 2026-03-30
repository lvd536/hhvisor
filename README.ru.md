[English version](./README.md)

# HHVisor

![Next.js](https://img.shields.io/badge/Next.js-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-38B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-UI-black)
![Zustand](https://img.shields.io/badge/Zustand-State-orange)
![Recharts](https://img.shields.io/badge/Recharts-Charts-red)

HHVisor — современный аналитический дашборд для исследования вакансий с hh.ru. Приложение предоставляет поиск вакансий в реальном времени, аналитику зарплат, анализ востребованности технологий, сравнение ключевых слов и интерактивные графики.

---

## Возможности

* Поиск вакансий по ключевому слову
* Фильтрация вакансий по региону, зарплате, опыту и формату работы
* Список вакансий с пагинацией
* Аналитика средней и медианной зарплаты
* Интерактивные графики на Recharts
* Сравнение ключевых слов
* Локальное сохранение вакансий в браузере
* Сохранение фильтров и состояния поиска

---

## Технологии

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zustand
* Lucide React
* Recharts
* API hh.ru

---

## Структура проекта

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

## Основные страницы

### Главная

* Поле поиска вакансий
* Фильтры
* Карточки быстрой аналитики
* Список вакансий

### Аналитика

* Тренды зарплат
* Топ технологий
* Количество вакансий
* etc.

### Сравнение

* Сравнение ключевых слов
* Сравнение зарплат
* Сравнение количества вакансий
* Сравнение технологий и регионов

### Сохранённые вакансии

* Локально сохранённые вакансии
* Быстрый доступ к избранным предложениям

---

## Запуск проекта

### Установка

```bash
git clone https://github.com/your-username/hhvisor.git
cd hhvisor
npm install
```

### Запуск dev сервера

```bash
npm run dev
```

После этого [http://localhost:3000](http://localhost:3000) в браузере.

---

## API

Проект использует публичное API hh.ru.

endpoints:

```bash
GET https://api.hh.ru/vacancies
GET https://api.hh.ru/areas
GET https://api.hh.ru/dictionaries
GET https://api.hh.ru/employer/{employerId}
```