# Connect

Connect is a modern, lightweight web application inspired by the now-discontinued Omegle platform. It allows users to connect with strangers through seamless text and video chat. Built using cutting-edge technologies like SvelteKit, Vite, and Drizzle ORM, Connect delivers high performance, scalability, and an exceptional user experience.

---

## Features

- **Real-Time Communication**: Powered by Ably for real-time text and video chat.
- **Authentication**: Secure and easy authentication with Lucia and Drizzle ORM.
- **Database Integration**: PostgreSQL support via Drizzle ORM for data management.
- **Responsive UI**: Styled with TailwindCSS for a clean, mobile-friendly interface.

---

## Tech Stack

- **Frontend**: [SvelteKit](https://kit.svelte.dev/) for a fast, reactive UI.
- **Backend**: Node.js, with [Drizzle ORM](https://orm.drizzle.team/) for database interaction.
- **Real-Time Messaging**: [Ably](https://ably.com/) for live chat functionality.
- **Database**: PostgreSQL for relational data storage.
- **Build Tool**: [Vite](https://vitejs.dev/) for fast development and builds.

---

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/connect.git
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
