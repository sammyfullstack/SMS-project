// ---------------------------------------------------------------------------
// useAdminSettings — owns all Settings-tab state (admin profile, academic
// system settings, theme + notification toggles) and their save handlers.
// The admin profile also drives the name/role shown in the top header.
// ---------------------------------------------------------------------------
import { useState, useEffect } from "react";

export default function useAdminSettings(
  API_URL = "https://sms-project-ots.onrender.com/api",
) {
  // Admin profile — single source of truth for the header name/role and the
  // Settings > Profile form. Seeded from the backend on mount (see effect).
  const [profileSettings, setProfileSettings] = useState({
    name: "Admin User",
    email: "admin@sms.edu",
    role: "Administrator",
    matricNo: "08000000000",
  });

  // Academic / institutional settings (school name, session, semester).
  const [systemSettings, setSystemSettings] = useState({
    schoolName: "",
    session: "",
    semester: "",
  });

  // UI theme ("Light" | "Dark" | "System Theme") + notification toggles.
  const [appearance, setAppearance] = useState("Light");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    systemAlerts: true,
    smsAlerts: false,
  });

  // Seed both settings groups from the backend once on mount.
  useEffect(() => {
    // Admin profile. NOTE: the backend stores the name under `fullName`, while
    // the header + Settings form read `profileSettings.name`. We map the
    // response into `profileSettings` — the state that is actually rendered —
    // so the header reflects the saved name after a page refresh.
    fetch(`${API_URL}/profile`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.name || data.fullName)) {
          setProfileSettings({
            name: data.fullName || data.name || "Admin User",
            email: data.email || "admin@sms.edu",
            role: data.role || "Administrator",
            matricNo: data.matricNo || "08000000000",
          });
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));

    // Academic / institutional settings.
    fetch(`${API_URL}/settings/system`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.schoolName) {
          setSystemSettings({
            schoolName: data.schoolName,
            session: data.session,
            semester: data.semester,
          });
        }
      })
      .catch((err) => console.error("Error fetching system settings:", err));
  }, [API_URL]);

  // Save the admin profile (POST /api/profile). The Profile schema stores the
  // name under `fullName`, so we map `profileSettings.name` → `fullName` in
  // the payload — without this, mongoose would drop the unknown `name` field
  // and the old default would come back after a refresh.
  async function handleSaveProfile() {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: profileSettings.name,
          email: profileSettings.email,
          role: profileSettings.role,
          matricNo: profileSettings.matricNo,
        }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  }

  // Save academic/institution settings — all three fields must be filled in.
  async function handleSaveSystem() {
    if (
      !systemSettings.schoolName.trim() ||
      !systemSettings.session.trim() ||
      !systemSettings.semester.trim()
    ) {
      alert(
        "Please fill in all academic & institutional details before saving.",
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/settings/system`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(systemSettings),
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error("Error saving system info", err);
      alert("Failed to save system info");
    }
  }

  return {
    profileSettings,
    setProfileSettings,
    systemSettings,
    setSystemSettings,
    appearance,
    setAppearance,
    notifications,
    setNotifications,
    handleSaveProfile,
    handleSaveSystem,
  };
}
