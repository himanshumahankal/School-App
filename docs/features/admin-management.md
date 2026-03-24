# Admin Management (Teachers & Students)

**Status:** ✅ Complete

## Overview
The Admin Management module allows administrators to manage the core users of the system: Teachers and Students.

## Features
- **Teacher Management:**
  - View a list of all teachers with their contact information.
  - Create new teacher accounts (generates a default password: `123456`).
  - Edit teacher profiles (name, username, email, phone, address).
  - Delete teacher accounts.
- **Student Management:**
  - View a list of all students with their assigned class and roll number.
  - Create new student accounts (generates a default password: `123456`).
  - Edit student profiles (including class assignment and roll number).
  - Delete student accounts.

## Implementation Details
- **Controllers:** `App\Http\Controllers\Admin\AdminController`
- **Models:** `User`, `Teacher`, `Student`, `SchoolClass`
- **Frontend Pages:** 
  - `resources/js/pages/admin/teachers/index.tsx`
  - `resources/js/pages/admin/students/index.tsx`
  - (and corresponding `create.tsx` and `edit.tsx` pages)
