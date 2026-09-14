// ReportsView — placeholder Reports screen (route /reports).
// The export buttons below are not wired up yet; they only preview the layout.
import { getStyles } from "../styles";

export default function ReportsView({ theme }) {
  const styles = getStyles(theme);
  return (
    <div style={styles.cardContainer}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>
        System Metrics & Reports
      </h3>
      <p style={styles.reportText}>
        Summary data exportable for administrative review.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={styles.primarySearchBtn}>Export CSV Summary</button>
        <button style={styles.drawerCancelBtn}>Generate PDF Audit</button>
      </div>
    </div>
  );
}
