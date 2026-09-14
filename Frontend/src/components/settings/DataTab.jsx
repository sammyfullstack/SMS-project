// DataTab — Settings > Data: placeholder actions for JSON backup export and
// import. The buttons currently just alert; wire them to real payloads later.
import { getStyles } from "../../styles";

export default function DataTab({ theme }) {
  const styles = getStyles(theme);

  return (
    <div style={{ maxWidth: 460 }}>
      <h4 style={styles.settingsSectionTitle}>Import / Export & Backup</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          style={styles.primarySearchBtn}
          onClick={() => alert("Data exported as JSON!")}
        >
          Export Database Backup (.json)
        </button>
        <button
          style={styles.drawerCancelBtn}
          onClick={() => alert("Import modal ready.")}
        >
          Import Data File
        </button>
      </div>
    </div>
  );
}