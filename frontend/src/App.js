import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import your Landing Page component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
