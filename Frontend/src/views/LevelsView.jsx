// LevelsView — "Student Distribution by Level" grid (route /levels).
// Loops over the static LEVELS constant and counts current students per level.
import { LevelBadge } from "../components/UIComponents";
import { LEVELS } from "../constants/studentData";
import { getStyles } from "../styles";

export default function LevelsView({ students, theme }) {
  const styles = getStyles(theme);
  return (
    <div style={styles.cardContainer}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: 16 }}>
        Student Distribution by Level
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        {LEVELS.map((lvl) => {
          const count = students.filter((s) => s.level === lvl).length;
          return (
            <div key={lvl} style={styles.levelCard}>
              <LevelBadge level={lvl} />
              <div style={styles.levelCardCount}>{count}</div>
              <div style={styles.levelCardSubtext}>Enrolled Students</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
