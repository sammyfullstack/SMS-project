// StudentsView — content of the Dashboard/Students route (both share the same
// stats + table). Composes the stat cards, the filter/search toolbar, the
// student table (StudentTable) and the pagination row. All data arrives via
// props from the useStudentRecords hook (see hooks/useStudentRecords.js).

import { StatCard } from "./UIComponents";
import {
  SearchIcon,
  StudentsIcon,
  DeptIcon,
  LevelsIcon,
  ActiveIcon,
} from "./Icons";
import { LEVELS } from "../constants/studentData";
import { getStyles } from "../styles";
import StudentTable from "./StudentTable";

export default function StudentsView({
  students,
  departmentsInUse,
  theme,
  search,
  setSearch,
  deptFilter,
  setDeptFilter,
  levelFilter,
  setLevelFilter,
  loaded,
  filtered,
  pageItems,
  pageStart,
  pageSize,
  totalPages,
  currentPage,
  setPage,
  openAdd,
  confirmDeleteId,
  setConfirmDeleteId,
  openEdit,
  handleDelete,
}) {
  const styles = getStyles(theme);

  //Calculate students created in the current calender month
  const now = new Date();
  const addedThisMonth = students.filter((student) => {
    if (!student.createdAt) return false;
    const createdDate = new Date(student.createdAt);
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <>
      {/* Stat cards — quick totals */}
      <div style={styles.statsGrid}>
        <StatCard
          icon={<StudentsIcon sx={{ color: "#2563EB", fontSize: 20 }} />}
          iconBg="#EFF6FF"
          title="Total Students"
          value={students.length}
          badge={`+${addedThisMonth} this month`}
          badgeColor="#059669"
          theme={theme}
        />
        <StatCard
          icon={<DeptIcon sx={{ color: "#059669", fontSize: 20 }} />}
          iconBg="#ECFDF5"
          title="Departments"
          value={departmentsInUse.length}
          subtext="Total departments"
          theme={theme}
        />
        <StatCard
          icon={<LevelsIcon sx={{ color: "#D97706", fontSize: 20 }} />}
          iconBg="#FFFBEB"
          title="Levels"
          value="5"
          subtext="100 - 500"
          theme={theme}
        />
        <StatCard
          icon={<ActiveIcon sx={{ color: "#7C3AED", fontSize: 20 }} />}
          iconBg="#F3E8FF"
          title="Active Students"
          value={students.length}
          badge="96.8% of total"
          badgeColor="#059669"
          theme={theme}
        />
      </div>

      {/* Toolbar + table card */}
      <div style={styles.cardContainer}>
        <div style={styles.toolbar}>
          <div style={styles.filterGroup}>
            <div style={styles.tableSearchBox}>
              <SearchIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or matricNo..."
                style={styles.tableSearchInput}
              />
            </div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={styles.selectInput}
            >
              <option value="all">All Departments</option>
              {departmentsInUse.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              style={styles.selectInput}
            >
              <option value="all">All Levels</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  Level {l}
                </option>
              ))}
            </select>
            <button className="search-btn" style={styles.primarySearchBtn}>
              Search
            </button>
          </div>

          <button className="add-btn" onClick={openAdd} style={styles.addBtn}>
            <span style={{ fontSize: 16, marginRight: 4 }}>+</span> Add Student
          </button>
        </div>

        {/* Loading / empty / table states */}
        {!loaded ? (
          <div style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>
            Loading registry records...
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            No students match the selected filter query.
          </div>
        ) : (
          <StudentTable
            pageItems={pageItems}
            pageStart={pageStart}
            confirmDeleteId={confirmDeleteId}
            setConfirmDeleteId={setConfirmDeleteId}
            openEdit={openEdit}
            handleDelete={handleDelete}
            theme={theme}
          />
        )}

        {/* Pagination row (only when there are rows to page through) */}
        {loaded && filtered.length > 0 && (
          <div style={styles.paginationRow}>
            <div style={{ fontSize: 13, color: "#6B7280" }}>
              Showing {pageStart + 1} to{" "}
              {Math.min(pageStart + pageSize, filtered.length)} of{" "}
              {filtered.length} students
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={styles.pageArrowBtn}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  style={{
                    ...styles.pageNumberBtn,
                    ...(n === currentPage ? styles.activePageNumber : {}),
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={styles.pageArrowBtn}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
