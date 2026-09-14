// StudentDrawer — the slide-over drawer used for adding/editing a student.
// Fully controlled by the parent (`StudentManagementSystem`): it receives
// `drawerOpen`, the form values/errors, and `setForm` to edit them.
import { FormField } from "./UIComponents";
import { DEPARTMENTS, LEVELS } from "../constants/studentData";
import { getStyles } from "../styles";

export default function StudentDrawer({
  drawerOpen,
  editingId,
  form,
  errors,
  closeDrawer,
  handleSubmit,
  setForm,
  theme,
}) {
  if (!drawerOpen) return null;
  const styles = getStyles(theme);

  return (
    <div onClick={closeDrawer} style={styles.overlay}>
      <div onClick={(e) => e.stopPropagation()} style={styles.drawer}>
        <div style={styles.drawerHeader}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#ffffff",
              margin: 0,
            }}
          >
            {editingId ? "Edit Student Details" : "Add New Student"}
          </h2>
          <button onClick={closeDrawer} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <FormField label="Full Name" error={errors.name} theme={theme}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              style={styles.formInput}
            />
          </FormField>

          <FormField label="Email Address" error={errors.email} theme={theme}>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@gmail.com"
              style={styles.formInput}
            />
          </FormField>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <FormField label="Age" error={errors.age} theme={theme}>
              <input
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="20"
                type="number"
                style={styles.formInput}
              />
            </FormField>
            <FormField label="Level" theme={theme}>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                style={styles.formInput}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Department" theme={theme}>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              style={styles.formInput}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Phone Number" error={errors.phone} theme={theme}>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="08012345678"
              style={styles.formInput}
            />
          </FormField>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button type="submit" style={styles.submitBtn}>
              {editingId ? "Save Changes" : "Register Student"}
            </button>
            <button
              type="button"
              onClick={closeDrawer}
              style={styles.drawerCancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
