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
- install dependencies: npm install
- start dev server: npm run dev
- port: http://localhost:5173

Notes

- All data is persisted using localStorage, so refreshing the page will not reset transactions.
- Fallbacks are implemented in charts and insights components to handle empty data gracefully.
- Advanced features like search, filter, sort, edit, and CSV export make the dashboard interactive and user-friendly.

Live Demo

https://prashanth-thota-zorvyn-assessment.vercel.app

Screenshorts
Desktop:
lightmode Dashboard - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775488910/ Screenshot_2026-04-06_204908_nf9vtx.png

lightmode Transaction - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775488920/Screenshot_2026-04-06_204849_at5cdd.png

darkmode Dashboard - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775488929/Screenshot_2026-04-06_204758_g0x7fb.png

darkmode Transaction - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775488939/Screenshot_2026-04-06_204831_i1tfwk.png

Mobile:
lightmode Dashboard - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489646/Screenshot_2026-04-06-20-47-17-160_com.android.chrome_w14v1n.jpg
https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489640/Screenshot_2026-04-06-20-47-24-164_com.android.chrome_y5vicf.jpg

lightmode sidebar - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489652/Screenshot_2026-04-06-20-47-11-132_com.android.chrome_oessba.jpg

lightmide- transaction - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489937/Screenshot_2026-04-06-21-07-05-324_com.android.chrome_qviqyx.jpg

darkmode dashboard - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489664/Screenshot_2026-04-06-20-46-59-969_com.android.chrome_apglsl.jpg
https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489659/Screenshot_2026-04-06-20-47-05-306_com.android.chrome_smdiep.jpg

darkmode - transaction - https://res.cloudinary.com/dn2qzuhss/image/upload/v1775489929/Screenshot_2026-04-06-21-07-15-993_com.android.chrome_ksksl6.jpg

## Development Approach & Decisions

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

## Data Flow & Design Choice

- Followed a **centralized data approach**, where all components derive their values from a single source of truth (transactions data).

- Calculated values like total balance, monthly income, expenses, and chart data dynamically instead of storing redundant state.

- This ensures:
  - Consistency across all components
  - Easier updates and data synchronization
  - Reduced chances of state mismatch

- Trade-off:
  While this approach increases the number of calculations, it keeps the data flow predictable and avoids duplication of state.
