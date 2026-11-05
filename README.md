# Venkata Ravindra Marasu — Professional Developer Portfolio

> **Frontend Developer** with 1+ year of professional experience building enterprise web applications using **React.js**, **JavaScript**, **Redux Toolkit**, **RTK Query**, **Material UI**, and **REST APIs**.

🌐 **Live Website (GitHub Pages):** [https://ravindra-26.github.io/portfolio/](https://ravindra-26.github.io/portfolio/)  
🐙 **GitHub Profile:** [https://github.com/ravindra-26](https://github.com/ravindra-26)  
💼 **LinkedIn:** [https://www.linkedin.com/in/ravindra-chowdary-2a84622bb](https://www.linkedin.com/in/ravindra-chowdary-2a84622bb)  
✉ **Email:** [ravindramarasu22@gmail.com](mailto:ravindramarasu22@gmail.com) • 📞 **Phone:** +91 7995709151  

---

## 🌟 Overview & Highlights

This repository contains the interactive personal developer portfolio of **Venkata Ravindra Marasu**, customized with verified credentials, enterprise work experience at VN Softverg Technology, AI/ML computer vision applications, Python utilities, and open-source GitHub repositories.

- **Developer:** Venkata Ravindra Marasu
- **Role:** Frontend Developer (React.js, Redux Toolkit, RTK Query)
- **Location:** Hyderabad, Telangana, India
- **Experience:** 1+ Year @ VN Softverg Technology Pvt Ltd, Madhapur (Aug 2025 – Oct 2026)

---

## 🚀 Featured Projects & GitHub Showcase

| Project | Category | Tech Stack | GitHub Repo / Details |
|---|---|---|---|
| **Real-Time Face Emotion Detector** | AI & Vision | Python, Django, OpenCV, DeepFace, TensorFlow, CNN | [ravindra-26/face-emotion-detector](https://github.com/ravindra-26/face-emotion-detector) |
| **AI Image-to-Telugu Translator & OCR** | AI & OCR | JavaScript, Tesseract.js, HTML5, CSS3, REST API | [ravindra-26/Image_Translator](https://github.com/ravindra-26/Image_Translator) |
| **Cryptographic Random Password Generator** | Security & Python | Python, Flask, Secrets Cryptography, HTML5/CSS3 | [ravindra-26/random-password-generator](https://github.com/ravindra-26/random-password-generator) |
| **Enterprise HRM (Human Resource Management)** | Enterprise Commercial | React.js, Redux Toolkit, RTK Query, REST APIs, OTP Auth | Built at VN Softverg Technology ([View Experience](#experience)) |
| **Enterprise LMS (Learning Management System)** | Enterprise Commercial | React.js, Material UI, RTK Query, REST APIs, CSS3 | Built at VN Softverg Technology ([View Experience](#experience)) |
| **Student Information & Academic Portal** | Academic Portal | Bootstrap 5, JavaScript DOM, JSON Data Store, HTML5/CSS3 | [ravindra-26/info_studentes](https://github.com/ravindra-26/info_studentes) |
| **Employee Payroll & Salary Calculation Dashboard** | FinTech & Grids | JavaScript, HTML5 Tables, CSS3 Grid, Math Engine | [ravindra-26/salary_table](https://github.com/ravindra-26/salary_table) |
| **Interactive Registration & Authentication Suite** | Frontend UI/UX | HTML5 Forms, CSS3 Animations, JavaScript, Regex Validation | [ravindra-26/sign_up](https://github.com/ravindra-26/sign_up) |
| **Developer Portfolio & Live Server** | Full-Stack | JavaScript, HTML5, CSS3, Node.js Server, GitHub Pages | [ravindra-26/portfolio](https://github.com/ravindra-26/portfolio) • [Live Site](https://ravindra-26.github.io/portfolio/) |

---

## 🎨 Key Portfolio Features

1. **Category Filter Matrix:**
   - Filter projects instantly by: **All Projects (9)**, **AI & Vision (2)**, **Enterprise HRM & LMS (2)**, **Python & Flask (2)**, and **Frontend & Web (7)**.
2. **Enterprise Experience Deep-Dive:**
   - Detailed modules breakdown for **HRM** (Onboarding, Attendance, Leave, OTP Auth, RTK Query) and **LMS** (Course Management, Role Allocation, Progress Tracking).
3. **Interactive Code Window & Terminal Simulation:**
   - Realistic tabs: `hrmApiSlice.js`, `CourseManager.jsx`, and `AuthSecurity.js`.
   - "Run Code" interactive button triggering live output inside a console drawer.
   - One-click clipboard copy.
4. **Interactive Resume Modal & One-Click PDF Print:**
   - Dedicated modal viewer matching the verified resume, with printable CV stylesheet (`window.print()`).
5. **Theme Switcher & Ambient Particles:**
   - Persistent Light/Dark theme toggle.
   - Interactive constellation canvas particles responding to screen size.
6. **Zero-Dependency Node.js Server (`server.js`):**
   - Built-in HTTP server with native static file serving and JSON REST API endpoints.
7. **Automated GitHub Pages Deployment (`.github/workflows/deploy.yml`):**
   - Continuous deployment on every git push to `main`.

---

## 🌐 Live GitHub Pages Deployment

The site is configured for automatic deployment to **GitHub Pages**:

- **Live URL:** [https://ravindra-26.github.io/portfolio/](https://ravindra-26.github.io/portfolio/)

### GitHub Repository Setup (One-Time Verification)
1. Navigate to **Settings** > **Pages** in the [ravindra-26/portfolio](https://github.com/ravindra-26/portfolio) repository.
2. Under **Build and deployment**:
   - **Source:** Select **GitHub Actions** (uses `.github/workflows/deploy.yml`), OR
   - **Source:** Select **Deploy from a branch** -> Branch: `main` or `gh-pages` -> Folder: `/ (root)` -> Click **Save**.
3. Within 1-2 minutes, the live site is published at `https://ravindra-26.github.io/portfolio/`.

---

## 💻 Running the Portfolio Locally with Node.js

### Option 1: Via npm (Recommended)

```bash
npm start
```

### Option 2: Directly with Node.js

```bash
node server.js
```

### Option 3: Development Mode (Auto-reload)

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📡 REST API Endpoints Provided by Node.js Server

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profile` | Returns Venkata Ravindra Marasu's JSON profile and summary |
| `GET` | `/api/resume` | Returns complete resume dataset in structured JSON |
| `GET` | `/api/skills` | Returns categorized technical competencies |
| `GET` | `/api/projects` | Returns all 9 projects (GitHub repos + enterprise) in structured JSON |
| `GET` | `/api/experience` | Returns detailed project breakdown (HRM & LMS modules) |
| `GET` | `/api/health` | Returns server health, uptime, and system status |
| `POST` | `/api/contact` | Ingests and validates contact inquiries with persistence |

---

## 📁 Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for automatic Pages deployment
├── .nojekyll                 # Bypasses Jekyll build on GitHub Pages
├── assets/
│   ├── avatar.svg            # Modern developer illustration
│   ├── profile-photo.jpeg    # User headshot
│   └── profile-photo.jpg     # User headshot
├── data/
│   └── messages.json         # Contact form submissions (auto-created)
├── index.html                # Main portfolio HTML with semantic markup & project grid
├── package.json              # Node.js project manifest & scripts
├── README.md                 # Documentation
├── script.js                 # Interactive logic, filters, theme toggle & API forms
├── serve.ps1                 # PowerShell launcher
├── server.js                 # Native Node.js HTTP & REST API server
└── styles.css                # Custom CSS design system (Light/Dark themes)
```

---

## 📄 License

MIT License — Feel free to use and customize!
