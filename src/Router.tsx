import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./page/Home";
import SearchPage from "./page/Search";
import DestinationPage from "./page/Destination";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
