// ---------------------------------------------------------------------------
// Reusable presentational components (NavItem, StatCard, LevelBadge, FormField).
// Each one accepts a `theme` prop and pulls its styles from styles.jsx via
// getStyles(), so the same component renders correctly in Light and Dark mode.
// ---------------------------------------------------------------------------
import { Link } from "react-router-dom";
import { getStyles } from "../styles";

export function NavItem({ label, icon: Icon, active, to, onClick, theme }) {
  const styles = getStyles(theme);
  // If a `to` path is given, render a real <Link> whose href changes the URL.
  // Otherwise fall back to a plain div with an onClick (e.g. "Add Student").
  const Wrapper = to ? Link : "div";
  return (
    <Wrapper
      to={to}
      onClick={onClick}
      style={{
        ...styles.navItem,
        ...(to ? { color: "inherit", textDecoration: "none" } : {}),
        ...(active ? styles.activeNavItem : {}),
      }}
    >
      <Icon size={18} color={active ? "#FFFFFF" : "#9CA3AF"} />
      <span>{label}</span>
    </Wrapper>
  );
}

export function StatCard({
  icon,
  iconBg,
  title,
  value,
  badge,
  badgeColor,
  subtext,
  theme,
}) {
  const styles = getStyles(theme);
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIconWrapper, backgroundColor: iconBg }}>
        {icon}
      </div>
      <div>
        <div style={styles.statTitle}>{title}</div>
        <div style={styles.statValue}>{value}</div>
        {badge ? (
          <div style={{ ...styles.statBadge, color: badgeColor }}>{badge}</div>
        ) : (
          <div style={styles.statSubtext}>{subtext}</div>
        )}
      </div>
    </div>
  );
}

export function LevelBadge({ level }) {
  const levelStyles = {
    100: { bg: "#EFF6FF", color: "#2563EB" },
    200: { bg: "#ECFDF5", color: "#059669" },
    300: { bg: "#F0FDF4", color: "#16A34A" },
    400: { bg: "#FFFBEB", color: "#D97706" },
    500: { bg: "#FEF2F2", color: "#DC2626" },
  };
  const style = levelStyles[level] || { bg: "#F3F4F6", color: "#4B5563" };
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: "3px 8px",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {level}
    </span>
  );
}

export function FormField({ label, error, children, theme }) {
  const styles = getStyles(theme);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={styles.formLabel}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: 11.5, color: "#EF4444" }}>{error}</span>
      )}
    </div>
  );
}
