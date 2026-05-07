# 🌌 Cinematic Cyber Portfolio | Md. Shahriyar Tashkir

A world-class, high-performance developer portfolio built with a focus on immersive visual storytelling, modular architecture, and advanced security.

![Portfolio Preview](https://i.postimg.cc/024RWhmB/icon.png)

## 💎 Core Experience Features

### 🎬 Cinematic Visual Engine
- **Dynamic Starfield**: A high-density, performant background of shimmering stars.
- **Interactive Mouse Trail**: A fluid, glowing trail that follows the cursor, creating a sense of "life" within the UI.
- **Glassmorphism UI**: Modern, translucent components with subtle borders and deep shadows.
- **Framer Motion Animations**: Silky-smooth entry transitions and micro-interactions for every element.

### 🛡️ Security & Content Protection
- **Anti-Copy Suite**: Site-wide protection against unauthorized text selection and right-click menus.
- **Inspector Lockdown**: Global prevention of common keyboard shortcuts (`F12`, `Ctrl+Shift+I`, `Ctrl+U`, etc.) to protect original design work.
- **SecurityProvider**: A centralized React context that enforces security protocols across all routes.

### 🔌 Real-Time Integrations
- **Spotify Live Status**: Real-time "Now Playing" card powered by the Lanyard API and WebSockets.
- **GitHub Dynamic Grid**: Automatic fetching of public repositories with a localized caching layer (`sessionStorage`) to optimize API rate limits.
- **Project Detail Modals**: Immersive "Quick View" modals for GitHub projects, providing technical details without leaving the site.

### 📱 Performance & Accessibility
- **PWA Ready**: Fully installable as a Progressive Web App on Android and iOS devices.
- **Responsive Audit**: Hand-tuned layouts for perfect display on everything from an iPhone SE to ultra-wide monitors.
- **SEO & OpenGraph**: Professional metadata management for stunning link previews on LinkedIn, Twitter, and Discord.

---

## 🛠️ Technical Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (TSX)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Connectivity**: GitHub REST API & Lanyard (Discord/Spotify)
- **Routing**: React Router DOM

---

## 📂 Project Architecture

The codebase follows a professional, modular structure for maximum maintainability:

```text
src/
├── components/
│   ├── layout/       # Global structures (Header, Footer, Security, Backgrounds)
│   ├── sections/     # Homepage blocks (Hero, About, Projects, etc.)
│   ├── contact/      # Specialized components (ContactForm, SpotifyCard, Discord)
│   ├── common/       # Utility UI (SEO, ScrollToTop, CommandPalette)
│   └── ui/           # Primitive shadcn-style components
├── pages/            # Main route entries (Index, NotFound)
└── hooks/            # Custom React hooks
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development
```bash
npm run dev
```

### 3. Build & Deploy
```bash
npm run build
npm run deploy # Deploys to GitHub Pages automatically
```

---

## 📜 License
This project is personal intellectual property. The design and security implementations are protected to ensure the uniqueness of the professional brand.

---

**Developed with 💙 by Md. Shahriyar Tashkir**
