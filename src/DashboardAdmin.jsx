import { useState } from "react";
import "./DashboardAdmin.css";
import avatar from "./assets/avatar.png";
import MembrosTab from "./components/MembrosTab";
import ProjetosTab from "./components/ProjetosTab";
import GestaoProjetos from "./components/GestaoProjetos";
import DashboardTab from "./components/DashboardTab";

const DashboardAdmin = () => {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="logo-mega-admin">MEGA JR.</div>

        <nav className="admin-nav">
          <button
            className={abaAtiva === "dashboard" ? "active" : ""}
            onClick={() => setAbaAtiva("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={abaAtiva === "membros" ? "active" : ""}
            onClick={() => setAbaAtiva("membros")}
          >
            Membros
          </button>

          <button
            className={abaAtiva === "projetos" ? "active" : ""}
            onClick={() => setAbaAtiva("projetos")}
          >
            Projetos
          </button>

          <button
            className={abaAtiva === "lista" ? "active" : ""}
            onClick={() => setAbaAtiva("lista")}
          >
            Alocações
          </button>
        </nav>

        <button className="btn-sair-admin" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <header className="admin-header">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>

          <div className="perfil-admin">
            <div className="texto-perfil">
              <span className="nome-admin">Olá, Lucas</span>
              <span className="cargo-admin">Administrador</span>
            </div>

            <img src={avatar} alt="Admin" className="avatar-admin" />
          </div>
        </header>

        <section className="admin-content">
          {abaAtiva === "dashboard" && <DashboardTab />}

          {(abaAtiva === "membros" ||
            abaAtiva === "cadastro" ||
            abaAtiva === "editar") && <MembrosTab />}

          {abaAtiva === "lista" && <ProjetosTab />}

          {abaAtiva === "projetos" && <GestaoProjetos />}
        </section>

        <footer className="footer-admin">
          <p>Vamos trabalhar juntos.</p>

          <div className="logo-footer-admin">MEGA JR.</div>

          <div className="social-icons-admin">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardAdmin;