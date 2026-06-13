import { useState, useEffect } from "react";
import "./DashboardAdmin.css";
import avatar from "./assets/avatar.png";
import patoTriste from "./assets/patotriste.png";
import MembrosTab from "./components/MembrosTab";
import { getAllAllocations, deleteAllocation } from "./services/allocationService";
import ProjetosTab from "./components/ProjetosTab";
import GestaoProjetos from "./components/GestaoProjetos";

const DashboardAdmin = () => {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [modal, setModal] = useState({ aberto: false, tipo: "", nome: "", id: null });

  const abrirModal = (tipo, nome, id) => setModal({ aberto: true, tipo, nome, id });
  const fecharModal = () => setModal({ aberto: false, tipo: "", nome: "", id: null });

  const handleConfirmarRemocao = async () => {
    if (modal.tipo === "alocação" && modal.id) {
      try {
        await deleteAllocation(modal.id);
        // Remove da tela sem precisar recarregar a página inteira
        setAllocations((prev) => prev.filter((aloc) => aloc.id !== modal.id));
        fecharModal();
      } catch (error) {
        alert("Erro ao remover: " + error.message);
      }
    }
  };

  const [allocations, setAllocations] = useState([]);
  const [allocationsLoading, setAllocationsLoading] = useState(true);
  const [allocationsError, setAllocationsError] = useState("");

  useEffect(() => {
    async function loadAllocations() {
      try {
        setAllocationsLoading(true);
        const data = await getAllAllocations();
        setAllocations(data);
      } catch (error) {
        setAllocationsError(error.message);
      } finally {
        setAllocationsLoading(false);
      }
    }

    loadAllocations();
  }, []);

  return (
    <div className="admin-container">
      {/* MODAL DE REMOÇÃO */}
      {modal.aberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-pato">
              <img src={patoTriste} alt="Pato Triste" />
            </div>
            <h3>
              {modal.tipo === "projeto" ? "Sistema de Gestão" : modal.nome}
            </h3>
            <div className="modal-body-pergunta">
              <p>
                Deseja <span className="destaque-remover">REMOVER</span> esse{" "}
                {modal.tipo}?
              </p>
            </div>
            <div className="modal-footer-btns">
              <button className="btn-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={handleConfirmarRemocao}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="logo-mega-admin">MEGA JR.</div>
          <nav className="admin-nav">
            <button className={abaAtiva === "dashboard" ? "active" : ""} onClick={() => setAbaAtiva("dashboard")}>
              Dashboard
            </button>
            <button className={abaAtiva === "membros" ? "active" : ""} onClick={() => setAbaAtiva("membros")}>
              Membros
            </button>
            <button className={abaAtiva === "projetos" ? "active" : ""} onClick={() => setAbaAtiva("projetos")}>
              Projetos
            </button>
            <button className={abaAtiva === "lista" ? "active" : ""} onClick={() => setAbaAtiva("lista")}>
              Alocações
            </button>
          </nav>
          <button className="btn-sair-admin">Sair</button>
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
          {/* TELA 1: DASHBOARD (Tabelas de Gestão) */}
          {abaAtiva === "dashboard" && (
            <div className="view-admin-dash">
              <h2>Bem-vindo(a), Lucas!</h2>

              <div className="tabela-container-admin">
                <h3>Projetos Cadastrados</h3>
                <table className="tabela-admin">
                  <thead>
                    <tr>
                      <th>Projetos</th>
                      <th>Responsável</th>
                      <th>Status</th>
                      <th>Editar Projeto</th>
                      <th>Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocationsLoading && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>Carregando projetos...</td>
                      </tr>
                    )}

                    {allocationsError && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", color: "red" }}>{allocationsError}</td>
                      </tr>
                    )}

                    {!allocationsLoading && !allocationsError && allocations.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>Nenhuma alocação encontrada.</td>
                      </tr>
                    )}

                    {!allocationsLoading &&
                      !allocationsError &&
                      allocations.map((aloc) => (
                        <tr key={aloc.id}>
                          {/* Verificamos se o projeto e membro existem, caso algum tenha sido deletado do banco */}
                          <td>{aloc.project?.name || "Projeto Desconhecido"}</td>
                          <td>{aloc.member?.name || "Membro Desconhecido"}</td>
                          <td>
                            {/* Como a alocação não trouxe 'status', vou deixar um genérico, ou podemos ajustar se houver status no DB */}
                            <span className="status-p">Alocado</span>
                          </td>
                          <td>
                            <button className="btn-link-edit">Editar</button>
                          </td>
                          <td>
                            <button
                              className="btn-link-del"
                              onClick={() => abrirModal("alocação", aloc.project?.name, aloc.id)}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              
            </div>
          )}

          {/* TELA DE MEMBROS (Lista e Formulários) */}
          {(abaAtiva === "membros" || abaAtiva === "cadastro" || abaAtiva === "editar") && (
            <MembrosTab />
          )}

          {/* TELA DE PROJETOS/ALOCAÇÕES */}
          {abaAtiva === "lista" && (
            <ProjetosTab />
          )}

          {/* TELA DE GESTÃO DE PROJETOS REAIS */}
          {abaAtiva === "projetos" && (
            <GestaoProjetos />
          )}

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
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
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