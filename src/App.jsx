import { useState } from "react";
import Login from "./Login";
import DashboardAdmin from "./DashboardAdmin";
import DashboardGerente from "./DashboardGerente";
import DashboardDev from "./DashboardDev";
import { ROLES } from "./utils/permissions";

function App() {
  const [userRole, setUserRole] = useState(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      return "";
    }

    return JSON.parse(user).role;
  });

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    setUserRole("");
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === ROLES.ADMIN) {
    return <DashboardAdmin onLogout={handleLogout} />;
  }

  if (
    userRole === ROLES.DIRECTOR ||
    userRole === ROLES.MANAGER
  ) {
    return <DashboardGerente onLogout={handleLogout} />;
  }

  if (userRole === ROLES.MEMBER) {
    return <DashboardDev onLogout={handleLogout} />;
  }

  return <Login onLogin={handleLogin} />;
}

export default App;