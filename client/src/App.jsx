// src/App.jsx

"use client";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Halaman-halaman Anda
import HomePage from "./pages/HomePage";
import Case1Page from "./pages/Case1Page";
import Case2Page from "./pages/Case2Page";
import AdminDashboard from "./pages/AdminDashboard";
import RestaurantPage from "./pages/RestaurantPage";

// Import layout yang baru dibuat
import RestaurantLayout from "./layouts/RestaurantLayout";
// Jangan lupa import AOS
import AOS from "aos";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    // Navbar dan Footer sudah dihapus dari sini
    <Routes>
      {/* Rute-rute ini tidak memiliki Navbar dan Footer */}
      <Route path="/" element={<HomePage />} />
      <Route path="/case1" element={<Case1Page />} />
      <Route path="/case2" element={<Case2Page />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Rute ini dan semua anaknya akan menggunakan RestaurantLayout */}
      <Route element={<RestaurantLayout />}>
        <Route path="/restaurant" element={<RestaurantPage />} />
      </Route>
    </Routes>
  );
}

export default App;
