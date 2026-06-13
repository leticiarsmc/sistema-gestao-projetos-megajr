import { useState } from "react";
import "./DashboardGerente.css";
import avatar from "./assets/avatar.png";
import DashboardTab from "./components/DashboardTab";

const DashboardGerente = ({ onLogout }) => {
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [projetoDetalhe, setProjetoDetalhe] = useState(null);

  const trocarAba = (aba) => {
    setAbaAtiva(aba);
    setProjetoDetalhe(null);
  };

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
    },
    {
      nome: "App Mobile",
      resp: "Mariana S.",
      status: "Pendente",
      prazo: "15/06/2026",
    },
    {
      nome: "Plataforma Web",
      resp: "Lucas R.",
      status: "Atrasado",
      prazo: "20/03/2026",
    },
    {
      nome: "Painel Administrativo",
      resp: "Ana Clara",
      status: "Concluido",
      prazo: "18/02/2026",
    },
  ];

  const projetosCatalogo = [
    {
      nome: "Plataforma Web",
      tipo: "Full Stack",
      prazo: "20/03/2026",
      status: "Atrasado",
      descricao:
        "Portal institucional com área pública e painel administrativo para gestão de conteúdo.",
      responsavel: "Lucas R.",
      membros: ["Lucas R.", "Beatriz L."],
    },
    {
      nome: "App Mobile",
      tipo: "Mobile",
      prazo: "15/06/2026",
      status: "Pendente",
      descricao:
        "Aplicativo para acompanhamento de projetos e alocações dos membros em tempo real.",
      responsavel: "Mariana S.",
      membros: ["Mariana S.", "Pedrao H."],
    },
    {
      nome: "Sistema de Gestão",
      tipo: "Full Stack",
      prazo: "30/03/2026",
      status: "Pendente",
      descricao:
        "Sistema interno para cadastro de membros, projetos e alocações da Mega Jr.",
      responsavel: "João Victor",
      membros: ["João Victor", "Ana Clara", "Bruna M."],
    },
    {
      nome: "Painel Administrativo",
      tipo: "Front-end",
      prazo: "18/02/2026",
      status: "Concluido",
      descricao:
        "Dashboard com indicadores de carga de trabalho e status dos projetos ativos.",
      responsavel: "Ana Clara",
      membros: ["Ana Clara", "João Victor"],
    },
  ];

  const statusDotClass = (status) => {
    if (status === "Atrasado") return "status-dot status-dot-red";
    if (status === "Concluido") return "status-dot status-dot-green";
    return "status-dot status-dot-orange";
  };

  return (
    <div className="gerente-container">
      <aside className="gerente-sidebar">
        <div className="logo-container">
          <div className="logo-mega-gerente">MEGA JR.</div>
        </div>

        <nav className="gerente-nav">
          <button
            className={abaAtiva === "dashboard" ? "active" : ""}
            onClick={() => trocarAba("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={abaAtiva === "membros" ? "active" : ""}
            onClick={() => trocarAba("membros")}
          >
            Membros
          </button>

          <button
            className={abaAtiva === "lista" ? "active" : ""}
            onClick={() => trocarAba("lista")}
          >
            Lista de Projetos
          </button>

          <button
            className={abaAtiva === "carga" ? "active" : ""}
            onClick={() => trocarAba("carga")}
          >
            Painel de carga
          </button>
        </nav>

        <button className="btn-sair-gerente" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="gerente-main">
        <header className="gerente-header">
          <div className="perfil-gerente">
            <div className="texto-perfil">
              <span className="nome-gerente">Olá, Roberto</span>
              <span className="cargo-gerente">Diretor</span>
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
                      <div className="dot red"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Projeto Plataforma Web marcado como atrasado.
                        </span>
                        <span className="atividade-subtexto">
                          Revisar prazo e responsável.
                        </span>
                      </div>
                    </div>

                    <div className="atividade-item">
                      <div className="dot green"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Pedro H. foi adicionado à equipe.
                        </span>
                        <span className="atividade-subtexto">
                          Novo membro disponível para alocação.
                        </span>
                      </div>
                    </div>

                    <div className="atividade-item">
                      <div className="dot orange"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Projeto App Mobile foi concluído.
                        </span>
                        <span className="atividade-subtexto">
                          Entrega registrada por Mariana S.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="secao-grafico">
                  <h3>Total de trabalhos: 12</h3>

                  <div className="legenda-grafico">
                    <div>
                      <div className="dot green"></div> Concluídos: 4
                    </div>

                    <div>
                      <div className="dot orange"></div> Em andamento: 6
                    </div>

                    <div>
                      <div className="dot red"></div> Atrasados: 2
                    </div>
                  </div>

                  <div className="barras-container">
                    <div
                      className="barra-item barra-verde"
                      style={{ height: "67%" }}
                    ></div>
                    <div
                      className="barra-item barra-laranja"
                      style={{ height: "100%" }}
                    ></div>
                    <div
                      className="barra-item barra-vermelha"
                      style={{ height: "33%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="secao-projetos-ativos">
                <div className="flex-h">
                  <h3>Projetos ativos</h3>
                </div>

                <table className="tabela-gerente">
                  <thead>
                    <tr>
                      <th>Projeto</th>
                      <th>Responsável</th>
                      <th>Status</th>
                      <th>Prazo</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projetosAtivos.map((p, i) => (
                      <tr key={i}>
                        <td>{p.nome}</td>
                        <td className="resp-cell">
                          <img
                            src={avatar}
                            alt={p.resp}
                            className="avatar-resp"
                          />
                          {p.resp}
                        </td>
                        <td className={`status-${p.status.toLowerCase()}`}>
                          {p.status}
                        </td>
                        <td>{p.prazo}</td>
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "lista" && projetoDetalhe === null && (
            <div className="view-lista-projetos">
              <div className="busca-gerente-container">
                <input
                  type="text"
                  placeholder="Buscar Projeto"
                  className="input-membros"
                />
              </div>

              <h1 className="titulo-central-gerente">Selecione Um Projeto</h1>

              <div className="grid-projetos-gerente">
                {projetosCatalogo.map((p, i) => (
                  <div className="card-projeto-gerente" key={i}>
                    <div className={statusDotClass(p.status)}></div>

                    <h3>{p.nome}</h3>

                    <div className="tags-gerente">
                      <span className="t-orange">{p.tipo}</span>
                      <span className="t-gray">{p.status}</span>
                    </div>

                    <p>Prazo: {p.prazo}</p>

                    <p className="desc-p">{p.descricao}</p>

                    <div className="btns-card">
                      <button onClick={() => setProjetoDetalhe(i)}>
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "lista" && projetoDetalhe !== null && (
            <div className="view-detalhe-projeto">
              <div className="busca-gerente-container">
                <button
                  className="btn-back-circle"
                  onClick={() => setProjetoDetalhe(null)}
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
              </div>

              <h1 className="titulo-central-gerente">
                {projetosCatalogo[projetoDetalhe].nome}
              </h1>

              <div className="card-detalhe-projeto">
                <div className="tags-gerente">
                  <span className="t-orange">
                    {projetosCatalogo[projetoDetalhe].tipo}
                  </span>
                  <span className="t-gray">
                    {projetosCatalogo[projetoDetalhe].status}
                  </span>
                </div>

                <p className="desc-p">
                  {projetosCatalogo[projetoDetalhe].descricao}
                </p>

                <div className="dados-detalhe-projeto">
                  <div className="coluna-dado">
                    <span className="label-dado">Prazo</span>
                    <span className="valor-dado">
                      {projetosCatalogo[projetoDetalhe].prazo}
                    </span>
                  </div>

                  <div className="coluna-dado">
                    <span className="label-dado">Status</span>
                    <span className="valor-dado">
                      {projetosCatalogo[projetoDetalhe].status}
                    </span>
                  </div>
                </div>

                <div className="secao-pessoas-projeto">
                  <h3>Responsável</h3>

                  <div className="membro-row">
                    <div className="membro-info">
                      <img src={avatar} alt="Responsável" />
                      <span>{projetosCatalogo[projetoDetalhe].responsavel}</span>
                    </div>
                  </div>
                </div>

                <div className="secao-pessoas-projeto">
                  <h3>Membros envolvidos</h3>

                  {projetosCatalogo[projetoDetalhe].membros.map((m, i) => (
                    <div className="membro-row" key={i}>
                      <div className="membro-info">
                        <img src={avatar} alt={m} />
                        <span>{m}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {abaAtiva === "carga" && (
            <DashboardTab titulo="Painel de carga dos membros" />
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