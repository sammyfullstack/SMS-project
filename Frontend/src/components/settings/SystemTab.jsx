// SystemTab — Settings > System: academic & institutional details (school
// name, session, semester) plus a Save button. Editing happens against
// `system` in place; saving validates + posts via the parent hook's `onSave`.
import { FormField } from "../UIComponents";
import { getStyles } from "../../styles";

export default function SystemTab({ system, setSystem, onSave, theme }) {
  const styles = getStyles(theme);

  // Shorthand for "edit one field" without repeating the spread each time.
  const update = (field) => (e) =>
    setSystem({ ...system, [field]: e.target.value });

  return (
    <div style={{ maxWidth: 460 }}>
      <h4 style={styles.settingsSectionTitle}>Academic & Institutional Details</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <FormField label="School / Institution Name" theme={theme}>
          <input
            placeholder="SMS University"
            style={styles.formInput}
            value={system.schoolName}
            onChange={update("schoolName")}
          />
        </FormField>
        <FormField label="Academic Session" theme={theme}>
          <input
            placeholder="2025/2026"
            style={styles.formInput}
            value={system.session}
            onChange={update("session")}
          />
        </FormField>
        <FormField label="Current Semester" placeholder="First Semester" theme={theme}>
          <select
            style={styles.formInput}
            value={system.semester}
            onChange={update("semester")}
          >
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
            <option value="Summer Session">Summer Session</option>
          </select>
        </FormField>
        <button
          type="button"
          onClick={onSave}
          style={{ ...styles.primarySearchBtn, alignSelf: "flex-start", marginTop: 6 }}
        >
          Save System Info
        </button>
      </div>
    </div>
  );
}