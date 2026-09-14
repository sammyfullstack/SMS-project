// ProfileTab — Settings > Profile: the admin information form (name, email,
// role, phone) plus a Save button. The inputs edit `profile` in place; saving
// is handled by the parent hook via `onSave` (see hooks/useAdminSettings.js).
import { FormField } from "../UIComponents";
import { getStyles } from "../../styles";

export default function ProfileTab({ profile, setProfile, onSave, theme }) {
  const styles = getStyles(theme);

  // Shorthand for "edit one field" without repeating the spread each time.
  const update = (field) => (e) =>
    setProfile({ ...profile, [field]: e.target.value });

  return (
    <div style={{ maxWidth: 460 }}>
      <h4 style={styles.settingsSectionTitle}>Admin Information</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* NOTE: state uses the key `name`; the backend/top header map it
            to/from `fullName` (inside useAdminSettings.handleSaveProfile). */}
        <FormField label="Full Name" theme={theme}>
          <input
            type="text"
            name="fullName"
            style={styles.formInput}
            value={profile.name}
            onChange={update("name")}
          />
        </FormField>
        <FormField label="Email Address" theme={theme}>
          <input
            type="email"
            name="email"
            style={styles.formInput}
            value={profile.email}
            onChange={update("email")}
          />
        </FormField>
        <FormField label="Role / Title" theme={theme}>
          <input
            type="text"
            name="role"
            style={styles.formInput}
            value={profile.role}
            onChange={update("role")}
          />
        </FormField>
        <FormField label="Phone Number" theme={theme}>
          <input
            type="text"
            name="phone"
            style={styles.formInput}
            value={profile.phone}
            onChange={update("phone")}
          />
        </FormField>
        <button
          type="button"
          onClick={onSave}
          style={{ ...styles.primarySearchBtn, alignSelf: "flex-start", marginTop: 6 }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}