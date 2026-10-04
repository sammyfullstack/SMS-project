// ---------------------------------------------------------------------------
// Settings Screen (route /settings) — a tabbed panel. Each sub-tab is rendered
// by its own component under /components/settings. All state lives in the
// parent hook (useAdminSettings); this file only decides which sub-tab to show.
// ---------------------------------------------------------------------------
import { getStyles } from "../styles";
import ProfileTab from "../components/settings/ProfileTab";
import SystemTab from "../components/settings/SystemTab";
import AppearanceTab from "../components/settings/AppearanceTab";
import DataTab from "../components/settings/DataTab";

const SUB_TABS = ["Profile", "System", "Appearance", "Data"];

export default function SettingsView({
  settingsSubTab,
  setSettingsSubTab,
  profileSettings,
  setProfileSettings,
  systemSettings,
  setSystemSettings,
  appearance,
  setAppearance,
  handleSaveProfile,
  handleSaveSystem,
  theme,
}) {
  const styles = getStyles(theme);

  return (
    <div style={styles.cardContainer}>
      {/* Sub-tab bar */}
      <div style={styles.settingsTabHeader}>
        {SUB_TABS.map((sub) => (
          <button
            key={sub}
            onClick={() => setSettingsSubTab(sub)}
            style={{
              ...styles.settingsTabBtn,
              ...(settingsSubTab === sub ? styles.settingsTabBtnActive : {}),
            }}
          >
            {sub}
          </button>
        ))}
      </div>

      <div>
        {/* Active sub-tab */}
        {settingsSubTab === "Profile" && (
          <ProfileTab
            profile={profileSettings}
            setProfile={setProfileSettings}
            onSave={handleSaveProfile}
            theme={theme}
          />
        )}
        {settingsSubTab === "System" && (
          <SystemTab
            system={systemSettings}
            setSystem={setSystemSettings}
            onSave={handleSaveSystem}
            theme={theme}
          />
        )}
        {settingsSubTab === "Appearance" && (
          <AppearanceTab
            appearance={appearance}
            setAppearance={setAppearance}
            theme={theme}
          />
        )}
        {settingsSubTab === "Data" && <DataTab theme={theme} />}
      </div>
    </div>
  );
}
