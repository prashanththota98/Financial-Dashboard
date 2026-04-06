## Candidate Information

- **Name:** Prashanth Thota
- **Email:** prashanththota678@gmail.com
- **Reference ID:** TEQZHL5L
- **Position:** Frontend Developer Intern

Project Overview

This repository contains a Personal Finance Dashboard built with React. The dashboard helps users track their finances, visualize trends, and gain insights into their spending habits

Features

- Balance Trend Chart – Monitors monthly income and expense trends
- Category Pie Chart – Displays spending breakdown per category
- Insights Component – Shows calculated financial metrics
- Transaction List – Full CRUD functionality with search, filter, sort, and CSV export
- Dark/Light Mode – Toggleable theme for better user experience
- Data Persistence – All transactions are stored in localStorage
- Fallbacks – Components display friendly messages when no data is available

Tech Stack

- Frontend: React, JavaScript, TailwindCSS
- Charts: Recharts
- State Management: React Context API
- Utilities: LocalStorage for persistence, Intl.NumberFormat for currency formatting

Setup instructions

- clone: git clone https://github.com/prashanththota98/prashanth-thota-zorvyn-assessment.git
- navigate to project folder: prashanth-thota-zorvyn-assessment
- run: npm install
- run: npm run dev
- port: http://localhost:5173

Notes

- All data is persisted using localStorage, so refreshing the page will not reset transactions.
- Fallbacks are implemented in charts and insights components to handle empty data gracefully.
- Advanced features like search, filter, sort, edit, and CSV export make the dashboard interactive and user-friendly.

Live Demo

https://prashanth-thota-zorvyn-assessment.vercel.app

## 🧠 Development Approach & Decisions

- **Understanding the Problem & Data**
  Researched how financial dashboards categorize transactions (Food, Travel, Salary, etc.) and explored **Merchant Category Codes (MCC)** for realistic expense categorization.

- **Project Setup**
  Initialized the project using **Vite, React, Tailwind CSS, Lucide Icons, and Recharts** to ensure fast development and a clean, modern UI.

- **Navigation Strategy**
  Initially used conditional rendering for page switching, but migrated to **React Router DOM** for proper routing, URL handling, and browser navigation support.

- **Data Handling**
  Used mock data due to lack of suitable free APIs. Implemented **localStorage persistence** to retain transactions after page refresh.

- **State Management**
  Utilized **React Context API** to manage global state (transactions, theme, roles).
  Kept filtering, sorting, and searching logic within components for simplicity.

- **Performance Optimization**
  Applied `useMemo` to optimize expensive calculations in Insights and Transaction components.
  Considered `React.memo` but avoided it to prevent unnecessary complexity for a small-scale app.

- **User Safety (Deletion Confirmation)**
  Implemented confirmation prompts using `window.alert` to prevent accidental deletions while keeping the solution lightweight.

- **Styling Fixes**
  Resolved unwanted focus outlines on charts using a global CSS rule (`*:focus { outline: none; }`) after Tailwind-based solutions proved insufficient.

- **Animations & UX**
  Used Tailwind CSS utilities (hover, transitions, transforms) for smooth UI interactions.
  Considered GSAP but chose simplicity over heavier animation libraries.

- **Deployment Fixes**
  Configured route rewrites to prevent **404 errors on refresh**, ensuring smooth navigation in production.

- **Advanced Features**
  Implemented **CSV export, filtering, sorting, and role-based UI (Viewer/Admin)** to enhance interactivity and demonstrate frontend capabilities.

- **Trade-offs & Decisions**
  Avoided over-engineering by:
  - Not using `React.memo` unnecessarily
  - Keeping logic simple and component-scoped
  - Prioritizing clarity and maintainability over complexity

## 🧩 Data Flow & Design Choice

- Followed a **centralized data approach**, where all components derive their values from a single source of truth (transactions data).

- Calculated values like total balance, monthly income, expenses, and chart data dynamically instead of storing redundant state.

- This ensures:
  - Consistency across all components
  - Easier updates and data synchronization
  - Reduced chances of state mismatch

- Trade-off:
  While this approach increases the number of calculations, it keeps the data flow predictable and avoids duplication of state.
