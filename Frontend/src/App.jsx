import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

// Each sidebar section gets its own URL. Home reads the
// current path (useLocation) and shows the matching view.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/students" element={<Home />} />
        <Route path="/departments" element={<Home />} />
        <Route path="/levels" element={<Home />} />
        <Route path="/reports" element={<Home />} />
        <Route path="/settings" element={<Home />} />

        {/* Unknown URLs fall back to the Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
