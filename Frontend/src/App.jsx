import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentManagementSystem from "./StudentManagementSystem";

// Each sidebar section gets its own URL. StudentManagementSystem reads the
// current path (useLocation) and shows the matching view.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentManagementSystem />} />
        <Route path="/dashboard" element={<StudentManagementSystem />} />
        <Route path="/students" element={<StudentManagementSystem />} />
        <Route path="/departments" element={<StudentManagementSystem />} />
        <Route path="/levels" element={<StudentManagementSystem />} />
        <Route path="/reports" element={<StudentManagementSystem />} />
        <Route path="/settings" element={<StudentManagementSystem />} />

        {/* Unknown URLs fall back to the Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
