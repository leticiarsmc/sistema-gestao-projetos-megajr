import { useEffect, useState } from "react";
import "./DashboardAdmin.css";
import avatar from "./assets/avatar.png";
import patoTriste from "./assets/patotriste.png";
import { getMembers } from "./services/memberService";

const DashboardAdmin = () => {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [modal, setModal] = useState({ aberto: false, tipo: "", nome: "" });

  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState("");

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        setMembersError(error.message);
      } finally {
        setMembersLoading(false);
      }
    }

    loadMembers();
  }, []);

  const abrirModal = (tipo, nome) => setModal({ aberto: true, tipo, nome });
  const fecharModal = () => setModal({ aberto: false, tipo: "", nome: "" });

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
              <button className="btn-confirmar" onClick={fecharModal}>
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
            className={abaAtiva === "lista" ? "active" : ""}
            onClick={() => setAbaAtiva("lista")}
          >
            Lista de Projetos
          </button>
          <button
            className={abaAtiva === "cadastro" ? "active" : ""}
            onClick={() => setAbaAtiva("cadastro")}
          >
            Cadastrar Membros
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
                    <tr>
                      <td>Sistema de Gestão</td>
                      <td>João Victor</td>
                      <td>
                        <span className="status-p">Pendente</span>
                      </td>
                      <td>
                        <button className="btn-link-edit">Editar</button>
                      </td>
                      <td>
                        <button
                          className="btn-link-del"
                          onClick={() =>
                            abrirModal("projeto", "Sistema de Gestão")
                          }
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>App Mobile</td>
                      <td>Mariana S.</td>
                      <td>
                        <span className="status-p">Pendente</span>
                      </td>
                      <td>
                        <button className="btn-link-edit">Editar</button>
                      </td>
                      <td>
                        <button
                          className="btn-link-del"
                          onClick={() => abrirModal("projeto", "App Mobile")}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Plataforma Web</td>
                      <td>Lucas R.</td>
                      <td>
                        <span className="status-a">Atrasado</span>
                      </td>
                      <td>
                        <button className="btn-link-edit">Editar</button>
                      </td>
                      <td>
                        <button
                          className="btn-link-del"
                          onClick={() =>
                            abrirModal("projeto", "Plataforma Web")
                          }
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="tabela-container-admin">
                <h3>Membros Cadastrados</h3>
                <table className="tabela-admin">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>Config</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membersLoading && (
                      <tr>
                        <td colSpan="3">Carregando membros...</td>
                      </tr>
                    )}

                    {membersError && (
                      <tr>
                        <td colSpan="3">{membersError}</td>
                      </tr>
                    )}

                    {!membersLoading &&
                      !membersError &&
                      members.length === 0 && (
                        <tr>
                          <td colSpan="3">Nenhum membro cadastrado.</td>
                        </tr>
                      )}

                    {!membersLoading &&
                      !membersError &&
                      members.map((member) => (
                        <tr key={member.id}>
                          <td className="td-membro">
                            <img src={avatar} alt="User" /> {member.name}
                          </td>
                          <td>{member.position}</td>
                          <td>
                            <button
                              className="btn-link-edit"
                              onClick={() => setAbaAtiva("editar")}
                            >
                              Editar
                            </button>
                            <span className="divisor">/</span>
                            <button
                              className="btn-link-del"
                              onClick={() =>
                                abrirModal("membro", member.name)
                              }
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

          {/* TELA 2: CADASTRO / EDITAR MEMBRO */}
          {(abaAtiva === "cadastro" || abaAtiva === "editar") && (
            <div className="view-cadastro-membro">
              <button
                className="btn-back-circle-admin"
                onClick={() => setAbaAtiva("dashboard")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#df8a43"
                  strokeWidth="3"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="titulo-central-admin">
                {abaAtiva === "cadastro" ? "Mega Cadastro" : "Editar Membro"}
              </h1>

              <div className="form-admin">
                <div className="form-row-admin">
                  <div className="form-group">
                    <label>Nome do membro</label>
                    <input type="text" className="input-admin" />
                  </div>
                  <div className="form-group">
                    <label>Back/front/fullstack</label>
                    <input type="text" className="input-admin" />
                  </div>
                </div>
                <div className="form-row-admin">
                  <div className="form-group">
                    <label>Hora semanal</label>
                    <input type="text" className="input-admin" />
                  </div>
                  <div className="form-group">
                    <label>Gerente/Adm/Dev</label>
                    <input type="text" className="input-admin" />
                  </div>
                </div>
                <div className="form-row-admin">
                  <div className="form-group">
                    <label>Data de Admissão</label>
                    <input type="text" className="input-admin" />
                  </div>
                </div>
                <button className="btn-submit-admin">
                  {abaAtiva === "cadastro" ? "Criar" : "Editar"}
                </button>
              </div>
            </div>
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