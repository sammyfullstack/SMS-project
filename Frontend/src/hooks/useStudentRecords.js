// ---------------------------------------------------------------------------
// useStudentRecords — owns every piece of student-related state and behavior:
//   • data:      loading from the backend + persisting to local storage
//   • filtering: search text, department/level filters and pagination
//   • drawer:    add/edit drawer state, submit + delete handlers
// Returns the state, derived values and handlers the rest of the app uses.
// ---------------------------------------------------------------------------
import { useState, useEffect, useMemo } from "react";
import { DEPARTMENTS, emptyForm } from "../constants/studentData";
import { validate } from "../utils/helper";

export default function useStudentRecords(
  apiUrl = "http://localhost:5000/api",
) {
  // ----- data + persistence status -----
  const [students, setStudents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState("");

  // ----- table filters + pagination -----
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [pageSize, setPageSize] = useState(7); // rows per page
  const [page, setPage] = useState(1);

  // ----- add/edit drawer + inline "Confirm?" delete state -----
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Load the student list from the backend API once on mount.
  useEffect(() => {
    fetch(`${apiUrl}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error loading students:", err));
  }, [apiUrl]);

  // Also reload from the Electron `window.storage` API on startup, so the
  // locally-saved copy (which survives app restarts) is restored.
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage?.get("students", false);
        if (result && result.value) {
          setStudents(JSON.parse(result.value));
        } else {
          setStudents([]);
          await window.storage?.set("students", JSON.stringify([]), false);
        }
      } catch {
        setStudents([]);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Local-persistence helper — kept available for future offline-saving.
  async function persist(next) {
    setStudents(next);
    try {
      const result = await window.storage?.set(
        "students",
        JSON.stringify(next),
        false,
      );
      if (!result)
        setSaveError(
          "Storage unavailable: Changes persist for this session only.",
        );
      else setSaveError("");
    } catch {
      setSaveError(
        "Storage unavailable: Changes persist for this session only.",
      );
    }
  }

  // Departments actually in use — the static list plus any extras found on
  // existing students (drives the stat cards + filter dropdowns).
  const departmentsInUse = useMemo(() => {
    const set = new Set(DEPARTMENTS);
    students.forEach((s) => set.add(s.department));
    return Array.from(set);
  }, [students]);

  // Search + department/level filters, applied to the full student list.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students.filter((s) => {
      const matchesSearch =
        !q ||
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        String(s.matricNo || "").includes(q);
      const matchesDept = deptFilter === "all" || s.department === deptFilter;
      const matchesLevel = levelFilter === "all" || s.level === levelFilter;
      return matchesSearch && matchesDept && matchesLevel;
    });
  }, [students, search, deptFilter, levelFilter]);

  // ----- pagination math (computed from the filtered list) -----
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(pageStart, pageStart + pageSize);

  // Jump back to page 1 whenever a filter/search/page-size change applies.
  // (Intentionally setState inside the effect — the reset must not block the
  // initial render, and `currentPage` clamps to a valid range meanwhile.)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, deptFilter, levelFilter, pageSize]);

  // ----- drawer actions -----
  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setDrawerOpen(true);
  }

  function openEdit(student) {
    setEditingId(student._id);
    setForm({
      ...student,
      age: String(student.age),
      matricNo: String(student.matricNo),
    });
    setErrors({});
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  }

  // Validate and POST/PUT the drawer form to the backend API.
  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      department: form.department,
      level: form.level,
      matricNo: form.matricNo.trim(),
    };

    try {
      const url = editingId
        ? `${apiUrl}/students/${editingId}`
        : `${apiUrl}/students`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const data = await response.json();
      // Backend returns the fresh list — adopt it as the new source of truth.
      if (Array.isArray(data.students)) setStudents(data.students);
      else if (Array.isArray(data)) setStudents(data);

      closeDrawer();
    } catch (error) {
      console.error("Failed to save student:", error);
      alert("Error saving student to backend.");
    }
  }

  // Delete a student via the API, then drop it from the local list.
  async function handleDelete(id) {
    try {
      const response = await fetch(`${apiUrl}/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");

      await response.json();

      setStudents((prevStudents) =>
        prevStudents.filter((s) => (s._id || s.id) !== id),
      );
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Failed to delete student:", err);
      alert("Error deleting student from server.");
    }
  }

  return {
    // data + status
    students,
    loaded,
    saveError,
    // derived values
    departmentsInUse,
    filtered,
    totalPages,
    currentPage,
    pageStart,
    pageItems,
    // filters + pagination setters
    search,
    setSearch,
    deptFilter,
    setDeptFilter,
    levelFilter,
    setLevelFilter,
    pageSize,
    setPageSize,
    page,
    setPage,
    // add/edit drawer
    drawerOpen,
    editingId,
    form,
    setForm,
    errors,
    openAdd,
    openEdit,
    closeDrawer,
    handleSubmit,
    // delete-with-confirm
    confirmDeleteId,
    setConfirmDeleteId,
    handleDelete,
    // persistence helper (available for future features)
    persist,
  };
}
