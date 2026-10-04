import { AVATAR_COLORS } from "../constants/studentData";

// Generate a short unique-ish id (only used for local UI keys — MongoDB
// supplies the real `_id` in the backend).
export function makeId() {
  return (
    "s_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

// "John Doe" → "JD" — used for avatar placeholders.
export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Deterministically pick an avatar color from a string (hash → AVATAR_COLORS),
// so a given name/id always maps to the same color.
export function getAvatarColor(id = "") {
  if (!id) return "#6B7280";
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Client-side validation for the student add/edit form.
// Returns an object whose keys are the invalid fields and whose values are
// the messages to show under each input (empty object = valid form).
export function validate(form) {
  const errors = {};
  const name = String(form.name || "").trim();
  const email = String(form.email || "").trim();
  const matricNo = String(form.matricNo || "").trim();

  if (!name) errors.name = "Enter full name.";
  if (!email) errors.email = "Enter email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Invalid email address.";
  if (!form.age) errors.age = "Enter age.";
  else if (Number(form.age) < 14 || Number(form.age) > 80)
    errors.age = "Age must be between 14 and 80.";
  if (!matricNo) errors.matricNo = "Enter matricNo number.";
  else if (!/^[0-9+\-\s]{7,15}$/.test(matricNo))
    errors.matricNo = "Invalid matricNo number.";
  return errors;
}
