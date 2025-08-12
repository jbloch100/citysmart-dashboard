# 🌆 CitySmart Dashboard

[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com/)  
**Live Demo:** [https://citysmart-dashboard.vercel.app](https://citysmart-dashboard-sge1-3zosteze8.vercel.app/)

CitySmart Dashboard is a modern, responsive web app built with **Vite + React** that serves as your daily city information hub. It fetches **real-time weather** and the **latest news headlines**, all in one clean and fast interface.

---

## ✨ Features
- **🌤 Real-time Weather** – Current temperature and windspeed for Brampton, ON (Open-Meteo API).
- **📰 Latest News** – Top 5 headlines from CurrentsAPI, securely fetched via a serverless function (no exposed API keys).
- **📱 Responsive Design** – Looks great on desktops, tablets, and mobile.
- **⚡ Fast Build** – Powered by Vite for instant reloads and optimized production builds.
- **🔒 Secure API Calls** – News API key stored in environment variables and accessed only server-side.

---

## 🛠 Tech Stack
- **Frontend:** React.js, CSS3, HTML5
- **APIs:** [Open-Meteo](https://open-meteo.com/), [CurrentsAPI](https://currentsapi.services/)
- **Build Tool:** Vite
- **Version Control:** Git + GitHub
- **Deployment:** Vercel (with serverless API functions)

---

## 📂 Project Structure
```
citysmart-dashboard/
├── api/                 # Serverless functions (Vercel)
│   └── news.js
├── public/               # Public assets (screenshots, icons)
├── server/               # Local dev API server (Express)
│   └── index.js
├── src/
│   ├── components/       # WeatherWidget, NewsWidget
│   ├── pages/            # DashboardPage
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env                  # Local API keys (not committed)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Local Development
```bash
# Install dependencies
npm install

# Start Vite + local API proxy server
npm run dev
```

Create a `.env` file in the project root for local dev:
```
NEWS_API_KEY=your_currents_api_key_here
```
> ⚠️ `.env` is ignored by Git and should never be committed.

---

## 📸 Screenshots
<p>
  <img src="public/screenshot-desktop.png" alt="CitySmart Dashboard - Desktop" width="720"/>
</p>
<p>
  <img src="public/screenshot-mobile.png" alt="CitySmart Dashboard - Mobile" width="320"/>
</p>

---

## 🗺 Roadmap
- Geolocation-based weather
- City selection dropdown
- PWA offline mode

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).