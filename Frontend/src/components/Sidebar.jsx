// ---------------------------------------------------------------------------
// Sidebar — the left navigation column: brand, section links (rendered as
// react-router <Link>s via NavItem's `to` prop) and the copyright footer.
// "Add Student" opens the drawer through the `onAddStudent` callback instead
// of navigating, because it is an action rather than a destination.
// ---------------------------------------------------------------------------
import "../App.css";
import { NavItem } from "./UIComponents";
import {
  DashboardIcon,
  StudentsIcon,
  AddUserIcon,
  DeptIcon,
  LevelsIcon,
  ReportsIcon,
  SettingsIcon,
} from "./Icons";
import { getStyles } from "../styles";

export default function Sidebar({ activeTab, appearance, onAddStudent }) {
  const styles = getStyles(appearance);

  return (
    <aside style={styles.sidebar}>
      <div>
        {/* Brand */}
        <div style={styles.brandHeader}>
          <div style={styles.logoIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={styles.brandTitle}>SMS</div>
            <div style={styles.brandSubtitle}>Student Management System</div>
          </div>
        </div>

        {/* Navigation — each section maps to its own URL */}
        <nav style={styles.navMenu}>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Dashboard"
              icon={DashboardIcon}
              to="/"
              active={activeTab === "Dashboard"}
              theme={appearance}
            />
          </div>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Students"
              icon={StudentsIcon}
              to="/students"
              active={activeTab === "Students"}
              theme={appearance}
            />
          </div>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Add Student"
              icon={AddUserIcon}
              onClick={onAddStudent}
              theme={appearance}
            />
          </div>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Departments"
              icon={DeptIcon}
              to="/departments"
              active={activeTab === "Departments"}
              theme={appearance}
            />
          </div>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Levels"
              icon={LevelsIcon}
              to="/levels"
              active={activeTab === "Levels"}
              theme={appearance}
            />
          </div>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Reports"
              icon={ReportsIcon}
              to="/reports"
              active={activeTab === "Reports"}
              theme={appearance}
            />
          </div>
          <div className="nav-item">
            <NavItem
              className="nav-item"
              label="Settings"
              icon={SettingsIcon}
              to="/settings"
              active={activeTab === "Settings"}
              theme={appearance}
            />
          </div>
        </nav>
      </div>

      <div style={styles.sidebarFooter}>
        <span>© 2026 SMS. All rights reserved.</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </div>
    </aside>
  );
}
