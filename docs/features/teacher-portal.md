# Teacher Portal

**Status:** ✅ Complete

## Overview
The Teacher Portal allows teachers to manage their students and upload study materials and assignments.

## Features
- **Student List:**
  - View a list of all students.
  - Quick access to student contact details.
- **Study Materials Management:**
  - View a list of uploaded materials.
  - Upload new study materials and assignments.
  - Delete materials.
- **Categorization:**
  - Materials can be categorized by type: `homework`, `project`, `assignment`, `notes`, or `other`.
  - Linked to specific classes and subjects.

## Implementation Details
- **Controllers:** `App\Http\Controllers\Teacher\TeacherController`
- **Models:** `User`, `Student`, `Material`, `SchoolClass`, `Subject`
- **Frontend Pages:** 
  - `resources/js/pages/teacher/dashboard.tsx`
  - `resources/js/pages/teacher/students/index.tsx`
  - `resources/js/pages/teacher/materials/index.tsx`
