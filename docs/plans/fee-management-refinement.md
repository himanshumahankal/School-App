# Fee Management Refinement

**Status:** 📋 Planned

## Overview
Refining the existing fee management to include more detailed tracking and reporting.

## Proposed Features
- **Admin Fee Setup:**
  - Create and assign fee structures for different classes.
- **Payment Processing:**
  - Ability to mark fees as `paid`, `unpaid`, or `partial`.
  - Capture payment date and method.
- **Reporting:**
  - Generate reports for outstanding fees and revenue.
- **Parent View:**
  - View and track upcoming fee deadlines and history.

## Proposed Implementation Details
- **Controllers:** `App\Http\Controllers\Admin\FeeController` (to be refined)
- **Models:** `Fee`, `Student`, `SchoolClass`
- **Frontend Pages:** 
  - `resources/js/pages/admin/fees/index.tsx`
  - `resources/js/pages/admin/fees/reports.tsx`
