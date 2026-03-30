# V Y Kothari English School Neral

A comprehensive school management web application built with Laravel, React, and Inertia.js. This system provides role-based access for Administrators, Teachers, Parents, and Students to manage various school activities.

## Features

### Public Website
- **Home Page**: Informational landing page with school highlights
- **About Us**: School story, mission, vision, and core values
- **Contact Us**: Contact information and inquiry form
- **Login Portal**: Secure authentication for all users

### Admin Panel
- Dashboard with key statistics
- Manage Teachers (CRUD operations)
- Manage Students (View and track)
- Manage Classes (Create and organize)
- Manage Subjects (Academic subject management)
- Timetable Management
- Exam Management with marks entry
- Attendance Tracking
- Fee Management
- Announcements System

### Teacher Portal
- Personal Dashboard
- View Assigned Classes
- Mark Student Attendance
- Create and Manage Assignments
- Enter Exam Results
- Upload Study Materials

### Parent Portal
- View Children's Information
- Track Attendance Records
- View Exam Results and Grades
- Monitor Fee Status
- Receive Announcements

### Student Portal
- Personal Dashboard
- View Timetable
- Track Attendance
- View Exam Results
- Access Assignments
- Download Study Materials
- View Fee Status
- Receive Announcements

## Tech Stack

- **Backend**: Laravel 11
- **Frontend**: React + TypeScript
- **Routing**: Inertia.js
- **UI Components**: Tailwind CSS + Shadcn/ui
- **Database**: MySQL
- **Authentication**: Laravel Breeze

## Prerequisites

Before you begin, ensure you have the following installed:
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL 8.0 or higher
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/himanshumahankal/School-App.git
cd School-App
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Environment Setup

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Or manually create a `.env` file with the following key variables:

```env
APP_NAME="V Y Kothari English School"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_management
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### 5. Create Database

Open MySQL and create a new database:

```sql
CREATE DATABASE school_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Generate Application Key

```bash
php artisan key:generate
```

### 7. Run Migrations

```bash
php artisan migrate
```

### 8. Seed Database (Optional - Creates test data)

```bash
php artisan db:seed
```

This will create:
- Admin account: `admin@school.com` / `123456`
- Teacher account: `test_teacher@school.com` / `123456`
- Parent account: `test_parent@school.com` / `123456`
- Student account: `test_student@school.com` / `123456`

### 9. Build Frontend Assets

```bash
npm run build
```

### 10. Start the Development Server

```bash
php artisan serve
```

Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Test Accounts

The seeder creates the following test accounts:

| Role    | Email                        | Password |
|---------|------------------------------|---------|
| Admin   | admin@school.com             | 123456  |
| Teacher | test_teacher@school.com      | 123456  |
| Parent  | test_parent@school.com        | 123456  |
| Student | test_student@school.com      | 123456  |

> **Note**: Admin account requires password change on first login.

## Development

### Running Tests

```bash
php artisan test
```

### Clear Cache

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
School-App/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Admin panel controllers
│   │   │   ├── Parent/          # Parent portal controllers
│   │   │   ├── Student/         # Student portal controllers
│   │   │   ├── Teacher/         # Teacher portal controllers
│   │   │   └── Chat/           # Chat functionality
│   │   └── Middleware/          # Custom middleware
│   └── Models/                  # Eloquent models
├── database/
│   ├── migrations/              # Database migrations
│   └── seeders/                 # Database seeders
├── resources/
│   └── js/
│       └── pages/
│           ├── admin/           # Admin panel pages
│           ├── parent/          # Parent portal pages
│           ├── student/         # Student portal pages
│           ├── teacher/         # Teacher portal pages
│           └── auth/            # Authentication pages
├── routes/
│   └── web.php                  # Web routes
└── tests/                       # Test files
```

## Screenshots

### Public Website
- Clean, modern dark-themed landing page
- School information and statistics
- Contact form for inquiries

### Admin Dashboard
- Overview statistics
- Quick access to all management modules
- Recent activities

### Role-Based Dashboards
- Personalized dashboards for each user role
- Relevant information at a glance
- Easy navigation to key features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## Contact

For any inquiries or support, please contact us through the [Contact Us](http://localhost:8000/contact) page on the website.

---

Built with ❤️ for V Y Kothari English School Neral
