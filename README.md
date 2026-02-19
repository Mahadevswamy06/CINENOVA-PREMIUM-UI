# CINENOVA - Premium Streaming Platform

A visually stunning, frontend-only streaming web application built with React, Tailwind CSS, Framer Motion, and React Three Fiber.

## 🚀 Features

- **Premium UI**: Cinematic dark theme, glassmorphism cards, and advanced animations.
- **Frontend Authentication**: Signup/Login logic using `localStorage` and Context API.
- **Movies Integration**: Fetches real movie data from OMDb API.
- **Interactive Background**: Subtle 3D particle animation using React Three Fiber.
- **Responsive Design**: Fully optimized for mobile and desktop.

## 🛠 Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **Routing**: React Router DOM
- **API**: Axios (OMDb)
- **State Management**: Context API
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📦 Installation

1.  Clone the repository or download the source code.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🔑 Default Credentials

You can sign up with any email, but here is a sample user if you wish to bypass signup:

- **Email**: `user@cinenova.com`
- **Password**: `Password123!` (Password must meet complexity requirements: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)

## 🎬 API Key

The application uses a public OMDb API key (`7befb981`). If request limit is reached, please replace it in `src/api/omdbApi.js`.

## 📂 Project Structure

- `src/components`: Reusable UI components (Hero, MovieCard, Navbar).
- `src/pages`: Main application pages (Home, Login, Signup, MovieDetails).
- `src/context`: Authentication logic.
- `src/hooks`: Custom hooks for data fetching.
- `src/api`: API configuration.

---

**Note**: This is a frontend-only application. No backend server is required. Data manages state locally.
