# NSS IET DAVV - Official Website

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/sanity-%23F03E2F.svg?style=for-the-badge&logo=sanity&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)

**Deployed at:** [https://nssiet.vercel.app](https://nssiet.vercel.app)

The official digital platform for the **National Service Scheme (NSS)** unit of **IET DAVV, Indore**. This application modernizes the unit's operations with a high-performance Jamstack architecture, facilitating dynamic content management and seamless volunteer registration.

## 🚀 Key Features

### 📝 Volunteer Registration System (New)
-   **Secure Enrollment**: Students can register with validated forms (Zod + React Hook Form).
-   **Duplicate Prevention**: Smart backend checks prevent duplicate entries for the same session (Mobile/Email/Enrollment).
-   **Digital ID Card**: Automatically generates a unique `NSS-YYYY-XXXX` Registration Number.
-   **Session Scope**: Data is organized by academic session (e.g., 2024-25), allowing re-registration in future years.

### 📋 Volunteer Management
-   **Admin List**: View registered volunteers filtered by session and branch.
-   **Search**: Quickly find volunteers by Name or ID.

### 📅 Event & Media
-   **Dynamic Events**: Fetches upcoming and past events directly from Sanity CMS.
-   **Interactive Gallery**: A media showcase linking images to specific events.

### 🎨 Modern UI/UX
-   **Glassmorphism Design**: sleek, dark-themed aesthetic with `glass-card` effects.
-   **Responsive**: Fully optimized for mobile and desktop devices.
-   **Real-time Team Grid**: Displays current volunteers and hierarchy.

## 🏗️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React 18** | Component-based UI library. |
| **Language** | **TypeScript** | Statically typed for safety. |
| **Build Tool** | **Vite** | Blazing fast HMR and build performance. |
| **Styling** | **Tailwind CSS** | Utility-first styling. |
| **UI Components** | **Shadcn/UI** | Accessible, reusable components based on Radix UI. |
| **State** | **TanStack Query** | Server state management and caching. |
| **Forms** | **React Hook Form** | Performant form validation. |
| **Validation** | **Zod** | TypeScript-first schema validation. |
| **CMS** | **Sanity.io** | Headless CMS for managing content and data. |
| **Routing** | **React Router v6** | Client-side routing. |

## 🛠️ Installation & Setup

### Prerequisites
*   **Node.js** (v18+ recommended)
*   **npm** or **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/DevKan009/nssFrontend.git
cd nssFrontend
```

### 2. Install Dependencies
```bash
npm install
# OR
bun install
```

### 3. Environment Configuration
Create a `.env` file in the root directory. You will need a Sanity Project ID and a write token for registration.

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_TOKEN=your_sanity_write_token_here
```

> **Note**: The backend (Sanity Studio) is located in a separate folder (usually `nss-iet-davv`). Run it on port `3333` to manage schemas.

### 4. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
src/
├── components/         # React Components
│   ├── registration/   # Registration specific components (Forms, Lists)
│   ├── ui/             # Shadcn UI primitives
│   └── ...
├── config/             # App Configuration (Sessions, Dates)
├── lib/                # Core Utilities (Sanity Client)
├── pages/              # Route Views
├── utils/              # Helper functions (Registration Logic)
└── App.tsx             # Main Layout & Routes
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push to the branch.
5.  Open a Pull Request.

## 👤 Author

**Kanha Agrawal (DevKan009)**
*   GitHub: [@DevKan009](https://github.com/DevKan009)

## 📄 License

This project is licensed under the MIT License.
