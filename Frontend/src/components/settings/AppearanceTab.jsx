// AppearanceTab — Settings > Appearance: Light/Dark/System-Theme picker cards.
// Selecting a mode updates `appearance` immediately; `getStyles` then swaps the
// whole app between the light/dark style objects.
import { getStyles } from "../../styles";

const MODES = ["Light", "Dark", "System Theme"];

export default function AppearanceTab({ appearance, setAppearance, theme }) {
  const styles = getStyles(theme);

  return (
    <div style={{ maxWidth: 460 }}>
      <h4 style={styles.settingsSectionTitle}>Theme Options</h4>
      <div style={{ display: "flex", gap: 12 }}>
        {MODES.map((mode) => (
          <div
            key={mode}
            onClick={() => setAppearance(mode)}
            style={{
              border:
                appearance === mode ? "2px solid #2563EB" : "1px solid #D1D5DB",
              backgroundColor: mode === "Dark" ? "#1F2937" : "#FFFFFF",
              color: mode === "Dark" ? "#FFFFFF" : "#111827",
              padding: "16px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 13,
              flex: 1,
              textAlign: "center",
            }}
          >
            {mode}
          </div>
        ))}
      </div>
    </div>
  );
}