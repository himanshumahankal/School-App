# Attendance Management

**Status:** 📋 Planned

## Overview
A module to track student attendance for each class.

## Proposed Features
- **Teacher Attendance Entry:**
  - Teachers mark attendance for their assigned classes.
  - Option to mark students as `present`, `absent`, or `late`.
- **Admin Overviews:**
  - Administrators view attendance reports for all classes and students.
- **Parent/Student Views:**
  - Parents and Students view personal attendance history and summaries.

## Proposed Implementation Details
- **Controllers:** `App\Http\Controllers\Teacher\AttendanceController` (to be created)
- **Models:** `Attendance`, `Student`, `SchoolClass`
- **Frontend Pages:** 
  - `resources/js/pages/teacher/attendance/index.tsx`
  - `resources/js/pages/teacher/attendance/create.tsx`
