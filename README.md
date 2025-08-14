# CitySmart Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://citysmart-dashboard.vercel.app)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Open-Meteo API](https://img.shields.io/badge/API-Open--Meteo-blue)
![NewsAPI.org](https://img.shields.io/badge/API-NewsAPI.org-orange)

CitySmart Dashboard is a responsive web app built with **Vite + React** that serves as your daily city information hub.  
It fetches **real-time weather** and **latest news headlines**, making it a one-stop dashboard for urban living.

---

## 🚀 Features
- **Real-time Weather** — Temperature & windspeed for Brampton, ON (Open-Meteo API).
- **Latest News** — Top 5 headlines from NewsAPI.org.
- **Responsive UI** — Works across desktops, tablets, and phones.
- **Modern Stack** — Built with Vite for fast development & builds.

---

## 🛠 Tech Stack
- **Frontend**: React.js, CSS3, HTML5
- **APIs**: Open-Meteo, NewsAPI.org
- **Build Tool**: Vite
- **Version Control**: Git, GitHub
- **Hosting**: Vercel

---

## 📂 Project Structure
```
citysmart-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # WeatherWidget, NewsWidget
│   ├── pages/              # DashboardPage
│   ├── assets/             # Images/icons
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── api/                    # Vercel serverless functions
│   └── news.js
├── package.json
├── vite.config.js
└── index.html
```

---

## 🔧 Local Setup
```bash
# Install dependencies
npm install

# Start local development
npm run dev
```

---

## 🌐 Deployment (Vercel)
🔗 **Live Demo:** [citysmart-dashboard.vercel.app](https://citysmart-dashboard-five.vercel.app/)

---

## 📸 Screenshots
### Mobile View
<img src="public/screenshot-mobile.png" alt="CitySmart Dashboard - Mobile" width="320"/>

### Desktop View
<img src="public/screenshot-desktop.png" alt="CitySmart Dashboard - Desktop" width="720"/>

---

## 📅 Roadmap
- 🌍 Geolocation-based weather
- 🏙 City selection dropdown
- 📦 PWA offline mode

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
