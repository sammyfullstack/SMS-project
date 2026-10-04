// StudentRegistry — the app shell (top-level component).
//
// Layout: Sidebar + TopBar + the view for the active route + the Add/Edit
// student drawer. All data logic lives in two custom hooks so this file stays
// focused on composition:
//   • useStudentRecords — students, filters, pagination, drawer CRUD
//   • useAdminSettings  — admin profile, system settings, theme, toggles
//
// Routing: the active section is driven entirely by the URL (react-router),
// e.g. "/settings" renders the Settings view. Unknown URLs are redirected to
// the Dashboard in App.jsx.

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getStyles } from "./styles";
import useStudentRecords from "./hooks/useStudentRecords";
import useAdminSettings from "./hooks/useAdminSettings";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import StudentsView from "./components/StudentsView";
import StudentDrawer from "./components/StudentDrawer";
import DepartmentsView from "./views/DepartmentsView";
import LevelsView from "./views/LevelsView";
import ReportsView from "./views/ReportsView";
import SettingsView from "./views/SettingsView";

// Each sidebar section maps to a URL. The active tab is derived from the URL
// via useLocation, so back/forward buttons and deep links work out of the box.
const TAB_BY_PATH = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/students": "Students",
  "/departments": "Departments",
  "/levels": "Levels",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function StudentRegistry() {
  // ----- data layer (custom hooks) -----
  const records = useStudentRecords();
  const settings = useAdminSettings();

  //Mobile sidebar drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // ----- routing-derived active tab + local Settings sub-tab -----
  const location = useLocation();
  const activeTab = TAB_BY_PATH[location.pathname] ?? "Dashboard";
  const [settingsSubTab, setSettingsSubTab] = useState("Profile");

  const { appearance, profileSettings } = settings;
  const styles = getStyles(appearance);

  return (
    <div style={styles.appContainer}>
      <Sidebar
        activeTab={activeTab}
        appearance={appearance}
        onAddStudent={records.openAdd}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div style={styles.mainWrapper}>
        <TopBar
          activeTab={activeTab}
          search={records.search}
          setSearch={records.setSearch}
          profileSettings={profileSettings}
          theme={appearance}
          onToggleSidebar={toggleSidebar}
        />

        {/* Dynamic content area — the view for the active URL */}
        <main style={styles.contentArea}>
          {records.saveError && (
            <div style={styles.alertError}>{records.saveError}</div>
          )}

          {(activeTab === "Dashboard" || activeTab === "Students") && (
            <StudentsView
              students={records.students}
              departmentsInUse={records.departmentsInUse}
              theme={appearance}
              search={records.search}
              setSearch={records.setSearch}
              deptFilter={records.deptFilter}
              setDeptFilter={records.setDeptFilter}
              levelFilter={records.levelFilter}
              setLevelFilter={records.setLevelFilter}
              loaded={records.loaded}
              filtered={records.filtered}
              pageItems={records.pageItems}
              pageStart={records.pageStart}
              pageSize={records.pageSize}
              totalPages={records.totalPages}
              currentPage={records.currentPage}
              setPage={records.setPage}
              openAdd={records.openAdd}
              confirmDeleteId={records.confirmDeleteId}
              setConfirmDeleteId={records.setConfirmDeleteId}
              openEdit={records.openEdit}
              handleDelete={records.handleDelete}
            />
          )}

          {activeTab === "Departments" && (
            <DepartmentsView
              departmentsInUse={records.departmentsInUse}
              students={records.students}
              theme={appearance}
            />
          )}
          {activeTab === "Levels" && (
            <LevelsView students={records.students} theme={appearance} />
          )}
          {activeTab === "Reports" && <ReportsView theme={appearance} />}
          {activeTab === "Settings" && (
            <SettingsView
              settingsSubTab={settingsSubTab}
              setSettingsSubTab={setSettingsSubTab}
              profileSettings={settings.profileSettings}
              setProfileSettings={settings.setProfileSettings}
              systemSettings={settings.systemSettings}
              setSystemSettings={settings.setSystemSettings}
              appearance={settings.appearance}
              setAppearance={settings.setAppearance}
              notifications={settings.notifications}
              setNotifications={settings.setNotifications}
              handleSaveProfile={settings.handleSaveProfile}
              handleSaveSystem={settings.handleSaveSystem}
              theme={appearance}
            />
          )}
        </main>
      </div>

      {/* Add/Edit student drawer */}
      <StudentDrawer
        drawerOpen={records.drawerOpen}
        editingId={records.editingId}
        form={records.form}
        errors={records.errors}
        closeDrawer={records.closeDrawer}
        handleSubmit={records.handleSubmit}
        setForm={records.setForm}
        theme={appearance}
      />
    </div>
  );
}
