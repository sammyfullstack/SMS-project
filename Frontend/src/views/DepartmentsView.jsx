// DepartmentsView — "Departments Breakdown" grid (route /departments).
// `departmentsInUse` merges the static DEPARTMENTS constant with any
// departments that appear on existing student records.
import { getStyles } from "../styles";

export default function DepartmentsView({ departmentsInUse, students, theme }) {
  const styles = getStyles(theme);
  return (
    <div style={styles.cardContainer}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: 16 }}>
        Departments Breakdown
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 14,
        }}
      >
        {departmentsInUse.map((d) => {
          const count = students.filter((s) => s.department === d).length;
          return (
            <div key={d} style={styles.deptCard}>
              <div style={styles.deptCardTitle}>{d}</div>
              <div style={styles.deptCardSubtext}>
                {count} student{count === 1 ? "" : "s"} enrolled
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
