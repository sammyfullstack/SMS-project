// ---------------------------------------------------------------------------
// TopBar — the header above the content area: page title + breadcrumb, a
// global search box (bound to the same `search` state as the student table),
// the notification bell and the admin profile card.
// `profileSettings` is seeded from the backend on mount and refreshed through
// the Settings > Profile form (see hooks/useAdminSettings.js).
// ---------------------------------------------------------------------------
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { SearchIcon } from "./Icons";
import { getStyles } from "../styles";
import { useMediaQuery } from "@mui/material";

export default function TopBar({
  activeTab,
  search,
  setSearch,
  profileSettings,
  theme,
  onToggleSidebar,
}) {
  const styles = getStyles(theme);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header style={styles.topHeader}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Hamburger menu button for mobile */}
        <IconButton
          color="inherit"
          aria-label="open menu"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ display: { md: "none" }, mr: 1 }} //Hidden on desktop (>=769px)
        >
          <MenuIcon />
        </IconButton>

        {/* Page title + breadcrumb (always links back to Dashboard) */}
        <h1 style={styles.pageTitle}>{activeTab}</h1>
        <div style={styles.breadcrumb}>
          <Link
            to="/"
            style={{ ...styles.breadcrumbLink, textDecoration: "none" }}
          >
            Dashboard
          </Link>
          {activeTab !== "Dashboard" && (
            <>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span>{activeTab}</span>
            </>
          )}
        </div>
      </div>

      <div style={styles.headerRight}>
        <div style={styles.globalSearchBox}>
          <SearchIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
          <input
            style={styles.globalSearchInput}
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {!isMobile && <span style={styles.shortcutKey}>CTRL /</span>}
        </div>

        {!isMobile && (
          <div style={styles.userProfile}>
            <img
              src="/admin-avatar.jpeg"
              alt="Admin"
              style={styles.avatarImg}
            />

            <div style={{ textAlign: "left" }}>
              <div style={styles.userNameText}>{profileSettings.name}</div>
              <div style={styles.userRoleText}>{profileSettings.role}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
