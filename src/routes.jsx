import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login/login";
import CardapioPage from "./pages/dashboard/cardapio/Cardapio";
import CozinhaPage from "./pages/dashboard/cozinha/Cozinha";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/cardapio" element={<CardapioPage />} />
      <Route path="/cozinha" element={<CozinhaPage />} />
    </Routes>
  );
}

export default AppRoutes;
