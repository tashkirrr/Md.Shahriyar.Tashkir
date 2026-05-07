# Md. Shahriyar Tashkir

Welcome to the source code of my personal portfolio—a project that represents the intersection of my 4+ years in professional Graphic Design and my current path in Computer Science & Engineering. This isn't just a website; it's a "Cinematic Experience" built to show how logic and aesthetics can exist in perfect harmony.

---

##  The Vision: "Pixels Meet Logic"

The goal of this project was to move away from the standard, static developer portfolios we see every day. I wanted something that felt **alive**, **secure**, and **technically sophisticated**. Every animation, every line of security code, and every API integration was hand-crafted to provide a premium feel.

###  1. The Visual Experience (High-End Aesthetics)
I've spent years obsessing over pixels, and I brought that obsession to this UI:
*   **Custom Starfield Engine**: A high-performance canvas-based background that provides depth without killing the CPU.
*   **Interactive Mouse Trail**: A dynamic particle system that follows the user, creating an immediate sense of immersion.
*   **The Bento Grid**: Inspired by modern Apple-style design, the layout uses a modular grid system that adapts perfectly to any screen size.
*   **Framer Motion 3D**: I utilized advanced motion physics to ensure every transition feels fluid and intentional.

###  2. The Security Engine (Content Protection)
As a designer, protecting my visual work is a priority. I built a custom **Security Suite** that goes beyond a simple "disable right-click":
*   **The SecurityProvider**: A global React wrapper that manages event listeners across the entire lifecycle of the app.
*   **Shortcut Lockdown**: I've blocked advanced developer shortcuts (`F12`, `Ctrl+U`, `Ctrl+Shift+I`) to discourage code and design lifting.
*   **Selection Suppression**: Site-wide CSS and JS rules prevent text and image dragging, keeping the UI clean and protected.

###  3. Real-Time & Dynamic Integrations
A portfolio should show, not just tell. I integrated real-time data to show my active lifestyle:
*   **Lanyard WebSocket (Spotify)**: A live-syncing card that shows exactly what I'm listening to on Spotify, including album art and playback status, updated instantly without page refreshes.
*   **GitHub API + Session Cache**: I built a custom fetcher for my repositories that includes a **30-minute caching layer** to ensure the site stays fast while respecting GitHub's rate limits.
*   **Project Detail Modals**: Instead of basic links, I built a cinematic modal system that lets visitors explore my code metadata (stars, forks, languages) directly on the site.

###  4. PWA & Universal Compatibility
I wanted this portfolio to feel like a native application:
*   **Installable App**: Through a custom manifest and service worker, you can "install" this site to your phone's home screen.
*   **Responsive Pass**: Every component has been audited for "Universal Compatibility"—it looks just as good on a 4" iPhone as it does on a 32" 4K monitor.
*   **SEO & OpenGraph**: I built a custom `SEO` component that generates professional preview cards for LinkedIn, Twitter, and Discord sharing.

---

##  The Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React + Vite** | The core engine for speed and modularity. |
| **TypeScript** | Type-safe development for complex state management. |
| **Framer Motion** | Orchestrating high-end animations and transitions. |
| **Tailwind CSS** | Utility-first styling with a custom design system. |
| **Lucide React** | Consistent, high-quality iconography. |
| **Lanyard API** | Real-time Discord/Spotify presence. |
| **gh-pages** | Seamless automated deployment. |

---

## 📂 Modular Architecture

I refactored the entire project to follow industry-standard clean code principles. Here is how the "brain" of the site is organized:

*   **`src/components/layout/`**: The skeletal structure (Header, Footer) and global "God-Mode" backgrounds.
*   **`src/components/sections/`**: The core content blocks (Hero, About, Projects, Roadmap).
*   **`src/components/contact/`**: Modularized interactive widgets (Contact Form, Spotify Card, Discord UI).
*   **`src/components/common/`**: Reusable utility components (SEO engine, Command Palette, Scroll effects).

---

##  How to Run Locally

If you're looking to explore the code or run this locally:

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/tashkirrr/Md.Shahriyar.Tashkir.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Launch Dev Server**:
    ```bash
    npm run dev
    ```
4.  **Production Build**:
    ```bash
    npm run build
    ```

---

##  Roadmap & Future Goals
- [ ] Add interactive 3D elements using Three.js/React Three Fiber.
- [ ] Implement a full-featured blog with MDX support.
- [ ] Add more "Easter Eggs" in the Command Palette.
- [ ] Expand the Roadmap into a full interactive timeline.

---

**Built with 💙 and a lot of caffeine by [Md. Shahriyar Tashkir](https://github.com/tashkirrr)**
