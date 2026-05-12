# 🌐 Orbit — Job Application Tracker

Orbit is a modern job application tracking tool designed to help job seekers manage their career journey in one place. Built collaboratively by a remote, cross-functional team as part of the [Chingu Voyage 60](https://www.chingu.io/) program.

Demo Link: https://orbit-v60-team24.web.app/

---

## ✨ Features

**Authentication**
- Email/password registration and login with Firebase Authentication
- Google OAuth sign-in via popup
- Persistent auth state across sessions
- Dynamic user greeting on the dashboard

**Dashboard**
- Personalized welcome message
- Real-time stats cards: Total Applications, Interview Rate, Offer Rate, Rejection Rate
- Recent Activity section showing the 4 most recent applications
- Quick access to add new applications

**Application Management**
- Add new job applications with detailed fields: Company Name, Job Role, Date Applied, Location, Status, Job Link, Notes
- Edit existing applications inline
- Delete applications with confirmation modal
- View full application details in a dedicated modal
- Upload and attach resumes to individual applications

**Search and Filtering**
- Persistent search bar in the header that filters across both Dashboard and Applications pages
- Search by company name, role, location, or status
- Filter applications by status (Applied, Interview, Offer, Rejected)
- Stats dynamically update based on search and filter results

**Layout and Navigation**
- Collapsible sidebar with Dashboard and Applications navigation
- Fixed top header with search, notifications, settings, and user avatar
- Persistent footer with team info and GitHub repository link
- Fully responsive design across desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | React 19, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Routing** | React Router DOM |
| **Form Validation** | Zod |
| **Authentication** | Firebase Auth, Google OAuth |
| **Backend/Database** | Firebase Firestore |
| **Icons** | Lucide React |
| **Notifications** | Sonner (toast) |
| **Version Control** | Git, GitHub |

---

## 📁 Project Structure

```
react-orbit/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── applications/    # ApplicationAction, ApplicationCard, ApplicationList, EmptyState, StatusFilter
│   │   ├── auth/            # ProtectedRoute
│   │   ├── layout/          # AppShell, AuthLayout, RootLayout, Sidebar, Header, Footer
│   │   ├── login/           # LoginForm
│   │   ├── modals/          # NewApplicationModal, JobDetailsModal, ConfirmDeleteModal
│   │   ├── ui/              # shadcn/ui components (Button, Input, Dialog, Select, etc.)
│   │   ├── ScrollToTop.tsx
│   │   └── StatsCard.tsx
│   ├── constants/
│   │   └── applicationStatus.ts   # Shared status constants
│   ├── context/
│   │   ├── AuthContext.tsx         
│   │   └── SearchContext.tsx      
│   ├── hooks/
│   │   ├── use-mobile.tsx  
│   │   ├── useApplications.ts     # Application CRUD operations
│   │   └── useApplicationStatusFilter.ts
│   ├── lib/
│   │   ├── firebase.ts            # Firebase configuration
│   │   ├── registerSchema.ts      # Zod schema for registration
│   │   ├── loginSchema.ts         # Zod schema for login
│   │   ├── resetPasswordSchema.ts # Zod schema for resetPassword
│   │   ├── application.ts         # Zod schema for applications
│   │   └── utils.ts               # cn() utility for shadcn
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── ApplicationsPage.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   └── WelcomePage.tsx
│   ├── utils/
│   │   ├── dashboardMetrics.ts    # Stats calculation logic
│   │   ├── filterApplications.ts  # Reusable search filter
│   │   ├── firebaseErrors.ts      # Firebase error message mapping
│   │   ├── dataWrapper.ts         # Data types and localStorage wrapper
│   │   ├── date.ts  
│   │   ├── statusStyle.ts  
│   │   ├── localStorage.ts  
│   │   └── upload.ts         
│   ├── App.tsx
│   ├── index.css                  # Tailwind directives + shadcn theme
│   ├── index.tsx
│   └── router.tsx
├── .env                     # Firebase config (not committed)
├── .env.example  
├── components.json          # shadcn/ui configuration
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── .firebaserc
├── firebase.json
├── firestore.rules
├── vite.config.ts
├── package-lock.json
├── package.json
├── vite-env.d.ts
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- A [Firebase](https://console.firebase.google.com/) project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chingu-voyages/V60-tier2-team-24.git
   cd V60-tier2-team-24/react-orbit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_UPLOAD_LINK=your-upload-link
   VITE_UPLOAD_PRESET="react-orbit"

   ```

4. **Enable Firebase Authentication**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Navigate to **Authentication** → **Sign-in method**
   - Enable **Email/Password** and **Google**

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check with TypeScript and build for production |
| `npm run preview` | Preview the production build locally |

---

## 📄 License

This project was built as part of the Chingu Voyage program.

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Ruth Igwe-Oruta: [GitHub] (https://github.com/Xondacc) / [LinkedIn] (https://www.linkedin.com/in/ruthigwe-oruta/)
- Shivani Bhardwaj: [GitHub](https://github.com/shivanibhardwaj0911) / [LinkedIn](https://www.linkedin.com/in/shivanibdwj)
- Anderson Osayerie: [GitHub](https://github.com/andemosa) / [LinkedIn](https://www.linkedin.com/in/anderson-osayerie/)
- Sasikumar Velmurugan: [GitHub] (https://github.com/vel-sk98) / [LinkedIn] (https://www.linkedin.com/in/sasivel/)
- Eduard: [GitHub] (https://github.com/EduardDE7)
- Pooja Balachandran: [GitHub] (https://github.com/PCoderHub) / [LinkedIn] (https://www.linkedin.com/in/poojapbalachandran/)
- Jose Cruz: [GitHub] (https://github.com/Cruz31960) / [LinkedIn] (https://www.linkedin.com/in/jose-cruz-6056322b3)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
- `feat:` — new features
- `fix:` — bug fixes
- `refactor:` — code changes that neither fix bugs nor add features
- `chore:` — maintenance tasks (dependencies, configs)
