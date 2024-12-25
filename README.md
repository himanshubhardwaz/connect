# Connect 🎯

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A modern real-time chat platform built with SvelteKit. Connect instantly with strangers through text and video chat.

![connect_gif](https://github.com/user-attachments/assets/d282d3f3-6768-4c6c-8f28-107e7e6d628f)

---

## ✨ Key Features

- 🔄 Real-time communication
- 🎥 Video chat support (Coming soon)
- 🔒 Secure authentication
- 📱 Responsive design
- 🌐 Global matchmaking

---

## 🛠️ Tech Stack

- **Frontend:** SvelteKit, TailwindCSS
- **Backend:** Node.js, PostgreSQL
- **ORM:** Drizzle
- **Real-time:** Ably
- **Auth:** Lucia

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm/pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/connect.git
   cd connect
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory with the following:

   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/database
   ABLY_API_KEY=your-ably-api-key
   ```

4. Run database migrations:

   ```bash
   npm run drizzle:migrate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:5173`.

---

## Scripts

### Development

- **`npm run dev`**: Starts the development server.

### Build

- **`npm run build`**: Builds the application for production.
- **`npm run preview`**: Previews the production build.

### Code Quality

- **`npm run lint`**: Lints the code using ESLint and Prettier.
- **`npm run format`**: Formats code using Prettier.

### Database Management

- **`npm run drizzle:generate`**: Generates types for Drizzle ORM.
- **`npm run drizzle:migrate`**: Runs database migrations.
- **`npm run drizzle:studio`**: Opens Drizzle Studio for database inspection.

---

## Folder Structure

```
connect/
├── src/
│   ├── lib/          # Reusable utilities and components
│   ├── routes/       # Application routes
│   ├── styles/       # TailwindCSS styles
│   ├── db/           # Database models and migrations
│   ├── hooks/        # SvelteKit hooks
├── tests/            # Unit and integration tests
├── public/           # Static assets
├── .env              # Environment variables
├── package.json      # Project configuration
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and test thoroughly.
4. Commit your changes:

   ```bash
   git commit -m "Add your message here"
   ```

5. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- Inspired by [Omegle](https://www.omegle.com/).
- Built with ❤️ using SvelteKit and modern web technologies.
