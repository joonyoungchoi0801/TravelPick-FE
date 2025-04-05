import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./page/Home";
import SearchPage from "./page/Search";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
