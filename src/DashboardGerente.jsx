import { useState } from "react";
import "./DashboardGerente.css";
import avatar from "./assets/avatar.png";

const DashboardGerente = ({ onLogout }) => {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const membros = [
    { nome: "João Victor", projetos: "3 Projetos" },
    { nome: "Mariana S.", projetos: "2 Projetos" },
    { nome: "Lucas R.", projetos: "2 Projetos" },
    { nome: "Ana Clara", projetos: "2 Projetos" },
    { nome: "Beatriz L.", projetos: "1 Projetos" },
    { nome: "Bruna M.", projetos: "1 Projetos" },
    { nome: "Pedrao H.", projetos: "0 Projetos" },
  ];

  const projetosAtivos = [
    {
      nome: "Sistema de Gestão",
      resp: "João Victor",
      status: "Pendente",
      prazo: "30/03/2026",
      progresso: "89%",
    },
    {
      nome: "App Mobile",
      resp: "Mariana S.",
      status: "Pendente",
      prazo: "15/06/2026",
      progresso: "40%",
    },
    {
      nome: "Plataforma Web",
      resp: "Lucas R.",
      status: "Atrasado",
      prazo: "20/03/2026",
      progresso: "70%",
    },
    {
      nome: "Painel Administrativo",
      resp: "Ana Clara",
      status: "Concluido",
      prazo: "18/02/2026",
      progresso: "100%",
    },
  ];

  return (
    <div className="gerente-container">
      <aside className="gerente-sidebar">
        <div className="logo-container">
          <div className="logo-mega-gerente">MEGA JR.</div>
        </div>

        <nav className="gerente-nav">
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
            className={abaAtiva === "add" ? "active" : ""}
            onClick={() => setAbaAtiva("add")}
          >
            Projeto +
          </button>
        </nav>

        <button className="btn-sair-gerente" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="gerente-main">
        <header className="gerente-header">
          <div className="header-left">
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
          </div>

          <div className="perfil-gerente">
            <div className="texto-perfil">
              <span className="nome-gerente">Olá, Roberto</span>
              <span className="cargo-gerente">Gerente</span>
            </div>

            <img src={avatar} alt="Roberto" className="avatar-gerente" />
          </div>
        </header>

        <section className="gerente-content">
          {abaAtiva === "dashboard" && (
            <div className="view-dashboard">
              <h2>Bem-vindo(a), Roberto!</h2>

              <div className="cards-resumo-gerente">
                <div className="card-mini">
                  <span className="numero">27</span> Membros ativos
                </div>

                <div className="card-mini">
                  <span className="numero">12</span> Projetos ativos
                </div>

                <div className="card-mini">
                  <span className="numero">2</span> Atrasados
                </div>
              </div>

              <div className="grid-dashboard-gerente">
                <div className="secao-atividades">
                  <h3>Atividades recentes</h3>

                  <div className="lista-atividades">
                    <div className="atividade-item">
                      <div className="dot green"></div> Projeto Plataforma Web
                      está com atrasado <br />
                      <span>por Lucas R.</span>
                    </div>

                    <div className="atividade-item">
                      <div className="dot orange"></div> Novo membro Pedro H
                      entrou na equipe <br />
                      <span>por Gerente Roberto</span>
                    </div>

                    <div className="atividade-item">
                      <div className="dot orange"></div> Projeto App Mobile foi
                      concluído <br />
                      <span>por Mariana S.</span>
                    </div>
                  </div>
                </div>

                <div className="secao-grafico">
                  <h3>Total de trabalhos: 12</h3>

                  <div className="legenda-grafico">
                    <div>
                      <div className="dot green"></div> Concluidos 4 (33%)
                    </div>

                    <div>
                      <div className="dot orange"></div> Em andamento 6 (50%)
                    </div>

                    <div>
                      <div className="dot red"></div> Atrasados 2 (17%)
                    </div>
                  </div>

                  <div className="barras-container">
                    <div className="barra-item" style={{ height: "60%" }}></div>
                    <div className="barra-item" style={{ height: "80%" }}></div>
                    <div className="barra-item" style={{ height: "40%" }}></div>
                    <div className="barra-item" style={{ height: "90%" }}></div>
                  </div>
                </div>
              </div>

              <div className="secao-projetos-ativos">
                <div className="flex-h">
                  <h3>Projeto ativos</h3>
                  <button className="btn-projeto-small">Projeto +</button>
                </div>

                <table className="tabela-gerente">
                  <thead>
                    <tr>
                      <th>Projetos</th>
                      <th>Responsável</th>
                      <th>Status</th>
                      <th>Prazo</th>
                      <th>Progresso</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projetosAtivos.map((p, i) => (
                      <tr key={i}>
                        <td>{p.nome}</td>
                        <td>{p.resp}</td>
                        <td className={`status-${p.status.toLowerCase()}`}>
                          {p.status}
                        </td>
                        <td>{p.prazo}</td>
                        <td>
                          <div className="barra-progresso">
                            <div
                              className="fill"
                              style={{ width: p.progresso }}
                            ></div>
                          </div>
                          {p.progresso}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {abaAtiva === "membros" && (
            <div className="view-membros">
              <div className="busca-gerente-container">
                <input
                  type="text"
                  placeholder="Buscar membros"
                  className="input-membros"
                />

                <button className="btn-back-circle">
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
              </div>

              <h1 className="titulo-central-gerente">Mega membros</h1>

              <div className="lista-membros-container">
                <div className="membros-header">
                  <span>Nome</span>
                  <span>Projetos alocados</span>
                </div>

                {membros.map((m, i) => (
                  <div className="membro-row" key={i}>
                    <div className="membro-info">
                      <img src={avatar} alt="User" />
                      <span>{m.nome}</span>
                    </div>

                    <span>{m.projetos}</span>

                    <button className="btn-alocar-small">Alocar +</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "lista" && (
            <div className="view-lista-projetos">
              <div className="busca-gerente-container">
                <input
                  type="text"
                  placeholder="Buscar Projeto"
                  className="input-membros"
                />

                <button className="btn-back-circle">
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
              </div>

              <h1 className="titulo-central-gerente">Selecione Um Projeto</h1>

              <div className="grid-projetos-gerente">
                {[1, 2, 3, 4, 5, 6].map((p) => (
                  <div className="card-projeto-gerente" key={p}>
                    <div className="status-dot-red"></div>

                    <h3>Plataforma Web</h3>

                    <div className="tags-gerente">
                      <span className="t-orange">Facebook</span>
                      <span className="t-gray">Full Stack</span>
                    </div>

                    <p>Prazo: 12/06/2023</p>

                    <p className="desc-p">
                      Desenvolvimento de nova plataforma web institucional.
                    </p>

                    <div className="btns-card">
                      <button>Ver detalhes</button>
                      <button className="btn-alocar-fill">Alocar +</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "add" && (
            <div className="view-add-projeto">
              <div className="cabecalho-add-projeto">
                <button className="btn-back-circle">
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

                <h1 className="titulo-central-gerente">Detalhes do Projeto</h1>
              </div>

              <div className="form-gerente">
                <div className="row">
                  <input
                    type="text"
                    placeholder="Nome do projeto"
                    className="input-f"
                  />

                  <input
                    type="text"
                    placeholder="Back/front/fullstack"
                    className="input-f"
                  />
                </div>

                <div className="row">
                  <input
                    type="text"
                    placeholder="Responsável pelo projeto"
                    className="input-f"
                  />

                  <input
                    type="text"
                    placeholder="Prazo (MM/DD/AAAA)"
                    className="input-f"
                  />
                </div>

                <textarea
                  placeholder="Descrição do projeto"
                  className="text-f"
                ></textarea>

                <div className="secao-funcoes">
                  <div className="flex-h">
                    <h3>Adicionar Funções</h3>
                    <button className="btn-plus-orange">+</button>
                  </div>

                  <div className="row">
                    <input
                      type="text"
                      placeholder="Nome da função"
                      className="input-f"
                    />

                    <input type="text" placeholder="Tag" className="input-f" />
                  </div>

                  <textarea
                    placeholder="Descrição da função"
                    className="text-f"
                    style={{ height: "80px" }}
                  ></textarea>

                  <button className="btn-add-lista">Adicionar</button>
                </div>

                <div className="lista-revisao">
                  <div className="revisao-item">
                    <div>
                      <strong>Revisão do código</strong>
                      <p>Aguardando revisão...</p>
                    </div>

                    <span className="rem-btn">Remover</span>
                  </div>

                  <div className="revisao-item">
                    <div>
                      <strong>Revisão do código</strong>
                      <p>Aguardando revisão...</p>
                    </div>

                    <span className="rem-btn">Remover</span>
                  </div>
                </div>

                <button className="btn-criar-projeto">Criar</button>
              </div>
            </div>
          )}
        </section>

        <footer className="footer-gerente">
          <p>Vamos trabalhar juntos.</p>

          <div className="logo-footer">MEGA JR.</div>

          <div className="social-icons-gerente">
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

export default DashboardGerente;