import { useState } from "react";
import Login from "./Login";
import DashboardAdmin from "./DashboardAdmin";
import DashboardGerente from "./DashboardGerente";
import DashboardDev from "./DashboardDev";

function App() {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "";
  });

  const handleLogin = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    sessionStorage.clear();
    setUserRole("");
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === "admin") {
    return <DashboardAdmin onLogout={handleLogout} />;
  }

  if (userRole === "gerente") {
    return <DashboardGerente onLogout={handleLogout} />;
  }

  if (userRole === "dev") {
    return <DashboardDev onLogout={handleLogout} />;
  }

  return <Login onLogin={handleLogin} />;
}

export default App;