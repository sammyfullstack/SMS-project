// ---------------------------------------------------------------------------
// Shared static data used by the student forms, filters and views.
// ---------------------------------------------------------------------------

// Departments offered by the institution (a dropdown in the Add/Edit drawer).
export const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Cyber Security",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Mathematics",
  "Physics",
  "Economics",
  "Business Administration",
  "Law",
  "Biology",
  "Chemistry",
];

// Student levels (used for the level badge and the level filter dropdown).
export const LEVELS = ["100", "200", "300", "400", "500"];

// Deterministic avatar background colors (picked via a hash - see utils/helper).
export const AVATAR_COLORS = [
  "#2563EB",
  "#059669",
  "#7C3AED",
  "#D97706",
  "#EF4444",
  "#0D9488",
  "#DB2777",
];

// Initial values for the Add-Student form in the drawer (reset on close).
export const emptyForm = {
  name: "",
  email: "",
  age: "",
  department: DEPARTMENTS[0],
  level: LEVELS[0],
  phone: "",
};
