// ---------------------------------------------------------------------------
// TopBar — the header above the content area: page title + breadcrumb, a
// global search box (bound to the same `search` state as the student table),
// the notification bell and the admin profile card.
// `profileSettings` is seeded from the backend on mount and refreshed through
// the Settings > Profile form (see hooks/useAdminSettings.js).
// ---------------------------------------------------------------------------
import { Link } from "react-router-dom";
import { SearchIcon, BellIcon, ChevronDownIcon } from "./Icons";
import { getStyles } from "../styles";

export default function TopBar({
  activeTab,
  search,
  setSearch,
  profileSettings,
  theme,
}) {
  const styles = getStyles(theme);

  return (
    <header style={styles.topHeader}>
      <div>
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
          <SearchIcon size={16} color="#9CA3AF" />
          <input
            style={styles.globalSearchInput}
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span style={styles.shortcutKey}>CTRL /</span>
        </div>

        <div style={styles.notificationBtn}>
          <BellIcon size={18} color="#4B5563" />
          <span style={styles.badgeCount}>3</span>
        </div>

        <div style={styles.userProfile}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Admin"
            style={styles.avatarImg}
          />
          <div style={{ textAlign: "left" }}>
            <div style={styles.userNameText}>{profileSettings.name}</div>
            <div style={styles.userRoleText}>{profileSettings.role}</div>
          </div>
          <ChevronDownIcon size={14} color="#6B7280" />
        </div>
      </div>
    </header>
  );
}
