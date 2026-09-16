// ---------------------------------------------------------------------------
// StudentTable — renders the <table> for the current page of students. Each
// row shows an avatar (initials + deterministic color), the LevelBadge and
// action buttons (edit / delete / view).
// Deleting requires a second "Confirm?" click via `confirmDeleteId`, so an
// accidental click on the trash icon does not delete anything.
// ---------------------------------------------------------------------------
import { LevelBadge } from "./UIComponents";
import { EditIcon, TrashIcon, EyeIcon } from "./Icons";
import { getInitials, getAvatarColor } from "../utils/helper";
import { getStyles } from "../styles";

export default function StudentTable({
  pageItems,
  pageStart,
  confirmDeleteId,
  setConfirmDeleteId,
  openEdit,
  handleDelete,
  theme,
}) {
  const styles = getStyles(theme);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: 40 }}>#</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Level</th>
            <th style={styles.th}>Matric No.</th>
            <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((s, idx) => {
            const globalIndex = pageStart + idx + 1;
            const avatarBg = getAvatarColor(s._id || s.id || idx);
            return (
              <tr
                key={s._id || s.id || `student-${idx}`}
                style={styles.tr}
                className="student-table-row"
              >
                <td style={{ ...styles.td, ...styles.tableIndexText }}>
                  {globalIndex}
                </td>
                <td style={styles.td}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        ...styles.avatarCircle,
                        backgroundColor: avatarBg,
                      }}
                    >
                      {getInitials(s.name)}
                    </div>
                    <span style={styles.tableNameText}>{s.name}</span>
                  </div>
                </td>
                <td style={{ ...styles.td, ...styles.tableBodyText }}>
                  {s.email}
                </td>
                <td style={{ ...styles.td, ...styles.tableBodyText }}>
                  {s.age}
                </td>
                <td style={{ ...styles.td, ...styles.tableBodyText }}>
                  {s.department}
                </td>
                <td style={styles.td}>
                  <LevelBadge level={s.level} />
                </td>
                <td style={{ ...styles.td, ...styles.tableBodyText }}>
                  {s.phone}
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  {confirmDeleteId === s._id ? (
                    /* Inline "Confirm?" — appears after clicking the trash icon */
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 6,
                      }}
                    >
                      <span style={styles.confirmText}>Confirm?</span>
                      <button
                        onClick={() => handleDelete(s._id)}
                        style={styles.confirmBtn}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        style={styles.cancelBtn}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 4,
                      }}
                    >
                      <button
                        onClick={() => openEdit(s)}
                        title="Edit"
                        style={styles.actionIconBtn}
                      >
                        <EditIcon size={15} color="#2563EB" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(s._id)}
                        title="Delete"
                        style={styles.actionIconBtn}
                      >
                        <TrashIcon size={15} color="#EF4444" />
                      </button>
                      <button
                        onClick={() => openEdit(s)}
                        title="View Details"
                        style={styles.actionIconBtn}
                      >
                        <EyeIcon size={15} color="#6B7280" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
