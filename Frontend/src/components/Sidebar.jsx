// ---------------------------------------------------------------------------
// Sidebar — the left navigation column: brand, section links (rendered as
// react-router <Link>s via NavItem's `to` prop) and the copyright footer.
// "Add Student" opens the drawer through the `onAddStudent` callback instead
// of navigating, because it is an action rather than a destination.
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

export default function Sidebar({
  activeTab,
  appearance,
  onAddStudent,
  isOpen,
  onClose,
}) {
  const styles = getStyles(appearance);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation;

  //Automatically close sidebar on mobile whenever the route/page changes
  useEffect(() => {
    if (isMobile && isOpen && onClose) {
      onClose();
    }
  }, [location.pathname]);

  //Close mobile drawer when clicking a navigation link
  const handleNavClick = (action) => {
    if (action) action();
    if (isMobile && onClose) onClose();
  };

  const sidebarContent = () => (
    <aside style={styles.sidebar}>
      <div>
        {/* Brand header */}
        <div style={styles.brandHeader}>
          <div style={styles.logoIcon}>
            <img src="/logo-Icon.png" alt="logo" style={styles.logoImg} />
          </div>
          <div>
            <div style={styles.brandTitle}>SMS</div>
            <div style={styles.brandSubtitle}>Student Management System</div>
          </div>

          {/*X button for Mobile*/}
          {isMobile && (
            <IconButton
              onClick={onClose}
              sx={{
                color: "#9CA3AF",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0,0.08)",
                },
              }}
              aria-label="close sidebar"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </div>

        {/* Navigation — each section maps to its own URL */}
        <nav style={styles.navMenu}>
          <div onClick={() => handleNavClick()} className="nav-item">
            <NavItem
              className="nav-item"
              label="Dashboard"
              icon={DashboardIcon}
              to="/"
              active={activeTab === "Dashboard"}
              theme={appearance}
            />
          </div>
          <div onClick={() => handleNavClick()} className="nav-item">
            <NavItem
              className="nav-item"
              label="Students"
              icon={StudentsIcon}
              to="/students"
              active={activeTab === "Students"}
              theme={appearance}
            />
          </div>
          <div onClick={() => handleNavClick()} className="nav-item">
            <NavItem
              className="nav-item"
              label="Add Student"
              icon={AddUserIcon}
              onClick={onAddStudent}
              theme={appearance}
            />
          </div>
          <div onClick={() => handleNavClick()} className="nav-item">
            <NavItem
              className="nav-item"
              label="Departments"
              icon={DeptIcon}
              to="/departments"
              active={activeTab === "Departments"}
              theme={appearance}
            />
          </div>
          <div onClick={() => handleNavClick()} className="nav-item">
            <NavItem
              className="nav-item"
              label="Levels"
              icon={LevelsIcon}
              to="/levels"
              active={activeTab === "Levels"}
              theme={appearance}
            />
          </div>
          <div onClick={() => handleNavClick()} className="nav-item">
            <NavItem
              className="nav-item"
              label="Reports"
              icon={ReportsIcon}
              to="/reports"
              active={activeTab === "Reports"}
              theme={appearance}
            />
          </div>
          <div onClick={() => handleNavClick()} className="nav-item">
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

  //wrap inside MUI Drawer when on mobile screens
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        close={onClose}
        paperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
            fontFamily: "inherit",
            color: "inherit",
          },
        }}
      >
        {sidebarContent()}
      </Drawer>
    );
  }

  //Render static sidebar on desktop
  return sidebarContent();
}
