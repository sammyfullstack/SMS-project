// NotificationsTab — Settings > Notifications: toggles for email, system
// banner and SMS alerts. Each row edits `notifications` directly in the parent
// hook state (persisted to the backend later if wired up).
import { getStyles } from "../../styles";

export default function NotificationsTab({
  notifications,
  setNotifications,
  theme,
}) {
  const styles = getStyles(theme);

  // Shorthand: flip a single toggle field on the notifications state.
  const toggle = (field) => (e) =>
    setNotifications({ ...notifications, [field]: e.target.checked });

  return (
    <div style={{ maxWidth: 460 }}>
      <h4 style={styles.settingsSectionTitle}>Alert Preferences</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={styles.toggleRow}>
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications.emailAlerts}
            onChange={toggle("emailAlerts")}
          />
        </label>
        <label style={styles.toggleRow}>
          <span>System Banner Alerts</span>
          <input
            type="checkbox"
            checked={notifications.systemAlerts}
            onChange={toggle("systemAlerts")}
          />
        </label>
        <label style={styles.toggleRow}>
          <span>SMS Alerts</span>
          <input
            type="checkbox"
            checked={notifications.smsAlerts}
            onChange={toggle("smsAlerts")}
          />
        </label>
      </div>
    </div>
  );
}