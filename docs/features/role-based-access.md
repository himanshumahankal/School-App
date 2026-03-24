# Role-Based Access Control (RBAC)

**Status:** ✅ Complete

## Overview
This feature implements role-based permissions and dashboard redirects for four key user roles: Admin, Teacher, Parent, and Student.

## Implementation Details

### Database Schema
- `users` table contains a `role` enum column: `['admin', 'teacher', 'parent', 'student']`.
- `users` table also includes a `username` column for alternate login (if needed).

### Middleware
- `App\Http\Middleware\RoleMiddleware` handles the core logic.
- It checks for an authenticated user and compares their `role` attribute with the required role for the route.
- Redirects to `login` if not authenticated, or `abort(403)` if unauthorized.

### Routing
- Handled in `routes/web.php` using `middleware(['auth', 'role:role_name'])`.
- Dashboard route (`/dashboard`) performs a redirect based on the authenticated user's role:
```php
Route::get('dashboard', function () {
    $role = Auth::user()->role;
    return redirect()->route($role . '.dashboard');
})->name('dashboard');
```

### Components
- `app-sidebar.tsx` dynamically renders navigation items based on the user's role from `usePage().props.auth.user.role`.
