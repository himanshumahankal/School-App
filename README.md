# School App

A modern School Management System built with **Laravel 12**, **React 19 (TypeScript)**, and **Inertia.js**.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for Admins, Teachers, Parents, and Students.
- **Admin Module:**
  - Manage Teachers and Students (CRUD).
  - Create and manage Exam schedules.
  - Track Fee records.
- **Teacher Module:**
  - View and manage assigned Students.
  - Upload and manage Study Materials and Assignments.
- **Modern UI:** Built with **TailwindCSS 4** and **Shadcn UI** components.
- **Real-time Interaction:** Seamless navigation using **Inertia.js**.
- **Type Safety:** Fully implemented with **TypeScript**.

## 🛠️ Tech Stack

- **Backend:** Laravel 12, PHP 8.2+
- **Frontend:** React 19, TypeScript, Inertia.js
- **Styling:** TailwindCSS 4, Shadcn UI, Lucide Icons
- **Build Tool:** Vite
- **Database:** MySQL / PostgreSQL / SQLite

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd school-app
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

4. **Environment setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Note: Configure your database settings in the `.env` file.*

5. **Run Migrations & Seeders:**
   ```bash
   php artisan migrate --seed
   ```
   *This creates the necessary tables and a default admin user:*
   - **Email:** `admin@school.com`
   - **Password:** `password`

## 💻 Usage

### Development

Run the full development stack (Server, Queue, and Vite):
```bash
composer run dev
```

### Production

Build the frontend assets for production:
```bash
npm run build
```

## 📂 Project Structure

- `app/Http/Controllers/`: Logic for role-specific operations (Admin, Teacher, etc.).
- `app/Models/`: Eloquent models (User, Student, Teacher, Exam, Material, etc.).
- `resources/js/pages/`: React page components.
- `resources/js/components/`: Reusable UI components.
- `routes/web.php`: Role-protected routes.

## 📜 Development Commands

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **PHP Styling:** `./vendor/bin/pint`

## 📄 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
