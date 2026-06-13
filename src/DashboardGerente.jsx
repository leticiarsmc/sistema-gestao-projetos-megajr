import { useState, useEffect } from "react";
import "./DashboardGerente.css";
import avatar from "./assets/avatar.png";
import DashboardTab from "./components/DashboardTab";
import { getProjects } from "./services/projectService";
import { getMembers } from "./services/memberService";
import { formatProjectStatus } from "./utils/projectStatus";
import { getRoleLabel } from "./utils/permissions";

const formatarData = (dataIso) => {
  if (!dataIso) return "Sem prazo definido";
  return new Date(dataIso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const DashboardGerente = ({ onLogout }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem("user") || "{}");
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [projetoDetalhe, setProjetoDetalhe] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const [membros, setMembros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro("");
      try {
        const [projetosData, membrosData] = await Promise.all([
          getProjects(),
          getMembers(),
        ]);
        setProjetos(projetosData);
        setMembros(membrosData);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const trocarAba = (aba) => {
    setAbaAtiva(aba);
    setProjetoDetalhe(null);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const projetosAtivos = projetos
    .filter((p) => p.status === "IN_PROGRESS")
    .map((p) => ({
      id: p.id,
      nome: p.name,
      resp: p.allocations[0]?.member?.name || "Equipe Mega Jr.",
      status: formatProjectStatus(p.status),
      prazo: formatarData(p.endDate),
    }));

  const totalAtivos = projetosAtivos.length;
  const totalConcluidos = projetos.filter((p) => p.status === "DONE").length;
  const totalAtrasados = projetos.filter(
    (p) =>
      p.status !== "DONE" &&
      p.status !== "CANCELLED" &&
      p.endDate &&
      new Date(p.endDate) < new Date()
  ).length;
  const totalProjetos = projetos.length;

  const percentual = (valor) =>
    totalProjetos === 0 ? 0 : Math.round((valor / totalProjetos) * 100);

  const statusTabelaClass = (status) => {
    switch (status) {
      case "Em andamento":
        return "status-andamento";
      case "Planejamento":
        return "status-planejamento";
      case "Concluído":
        return "status-concluido";
      case "Cancelado":
        return "status-atrasado";
      default:
        return "";
    }
  };

  const projetosCatalogo = projetos.map((p) => ({
    id: p.id,
    nome: p.name,
    tipo: `${p.allocations.length} membro(s) alocado(s)`,
    prazo: formatarData(p.endDate),
    status: formatProjectStatus(p.status),
    descricao: p.description,
    responsavel: p.allocations[0]?.member?.name || "Equipe Mega Jr.",
    membros: p.allocations.map((a) => a.member.name),
  }));

  const projetoSelecionado = projetosCatalogo.find(
    (p) => p.id === projetoDetalhe
  );

  const statusDotClass = (status) => {
    if (status === "Cancelado") return "status-dot status-dot-red";
    if (status === "Concluído") return "status-dot status-dot-green";
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
              <span className="nome-gerente">Olá, {usuarioLogado.name}</span>
              <span className="cargo-gerente">{getRoleLabel(usuarioLogado.role)}</span>
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
                  <span className="numero">{membros.length}</span> Membros ativos
                </div>

                <div className="card-mini">
                  <span className="numero">{totalAtivos}</span> Projetos ativos
                </div>

                <div className="card-mini">
                  <span className="numero">{totalAtrasados}</span> Atrasados
                </div>
              </div>

              <div className="grid-dashboard-gerente">
                <div className="secao-atividades">
                  <h3>Resumo operacional</h3>

                  <div className="lista-atividades">
                    <div className="atividade-item">
                      <div className="dot orange"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Projeto Mega Junior está em andamento.
                        </span>
                        <span className="atividade-subtexto">
                          Acompanhamento de prazos e entregas em curso.
                        </span>
                      </div>
                    </div>

                    <div className="atividade-item">
                      <div className="dot green"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Novo membro cadastrado na equipe.
                        </span>
                        <span className="atividade-subtexto">
                          Disponível para alocação em projetos.
                        </span>
                      </div>
                    </div>

                    <div className="atividade-item">
                      <div className="dot blue"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Alocações da equipe revisadas no projeto Mega Junior.
                        </span>
                        <span className="atividade-subtexto">
                          Responsabilidades atualizadas conforme demanda.
                        </span>
                      </div>
                    </div>

                    <div className="atividade-item">
                      <div className="dot green"></div>
                      <div className="atividade-texto-container">
                        <span className="atividade-texto">
                          Carga de trabalho da equipe atualizada.
                        </span>
                        <span className="atividade-subtexto">
                          Indicadores recalculados no painel de carga.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="secao-grafico">
                  <h3>Total de trabalhos: {totalProjetos}</h3>

                  <div className="legenda-grafico">
                    <div>
                      <div className="dot green"></div> Concluídos: {totalConcluidos}
                    </div>

                    <div>
                      <div className="dot orange"></div> Em andamento: {totalAtivos}
                    </div>

                    <div>
                      <div className="dot red"></div> Atrasados: {totalAtrasados}
                    </div>
                  </div>

                  <div className="barras-container">
                    <div
                      className="barra-item barra-verde"
                      style={{ height: `${percentual(totalConcluidos)}%` }}
                    ></div>
                    <div
                      className="barra-item barra-laranja"
                      style={{ height: `${percentual(totalAtivos)}%` }}
                    ></div>
                    <div
                      className="barra-item barra-vermelha"
                      style={{ height: `${percentual(totalAtrasados)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="secao-projetos-ativos">
                <div className="flex-h">
                  <h3>Projetos ativos</h3>
                </div>

                {carregando && <p className="subtitulo">Carregando projetos...</p>}
                {erro && <p className="dashboard-error">{erro}</p>}

                {!carregando && !erro && (
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
                      {projetosAtivos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.nome}</td>
                          <td className="resp-cell">
                            <img
                              src={avatar}
                              alt={p.resp}
                              className="avatar-resp"
                            />
                            {p.resp}
                          </td>
                          <td className={statusTabelaClass(p.status)}>
                            {p.status}
                          </td>
                          <td>{p.prazo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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

              {carregando && <p className="subtitulo">Carregando membros...</p>}
              {erro && <p className="dashboard-error">{erro}</p>}

              {!carregando && !erro && (
                <div className="lista-membros-container">
                  <div className="membros-header">
                    <span>Nome</span>
                    <span>Projetos alocados</span>
                  </div>

                  {membros.map((m) => (
                    <div className="membro-row" key={m.id}>
                      <div className="membro-info">
                        <img src={avatar} alt="User" />
                        <span>{m.name}</span>
                      </div>

                      <span>{m.allocations.length} Projeto(s)</span>
                    </div>
                  ))}
                </div>
              )}
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

              {carregando && <p className="subtitulo">Carregando projetos...</p>}
              {erro && <p className="dashboard-error">{erro}</p>}

              {!carregando && !erro && (
                <div className="grid-projetos-gerente">
                  {projetosCatalogo.map((p) => (
                    <div className="card-projeto-gerente" key={p.id}>
                      <div className={statusDotClass(p.status)}></div>

                      <h3>{p.nome}</h3>

                      <div className="tags-gerente">
                        <span className="t-orange">{p.tipo}</span>
                        <span className="t-gray">{p.status}</span>
                      </div>

                      <p>Prazo: {p.prazo}</p>

                      <p className="desc-p">{p.descricao}</p>

                      <div className="btns-card">
                        <button onClick={() => setProjetoDetalhe(p.id)}>
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {abaAtiva === "lista" && projetoSelecionado && (
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
                {projetoSelecionado.nome}
              </h1>

              <div className="card-detalhe-projeto">
                <div className="tags-gerente">
                  <span className="t-orange">
                    {projetoSelecionado.tipo}
                  </span>
                  <span className="t-gray">
                    {projetoSelecionado.status}
                  </span>
                </div>

                <p className="desc-p">
                  {projetoSelecionado.descricao}
                </p>

                <div className="dados-detalhe-projeto">
                  <div className="coluna-dado">
                    <span className="label-dado">Prazo</span>
                    <span className="valor-dado">
                      {projetoSelecionado.prazo}
                    </span>
                  </div>

                  <div className="coluna-dado">
                    <span className="label-dado">Status</span>
                    <span className="valor-dado">
                      {projetoSelecionado.status}
                    </span>
                  </div>
                </div>

                <div className="secao-pessoas-projeto">
                  <h3>Responsável</h3>

                  <div className="membro-row">
                    <div className="membro-info">
                      <img src={avatar} alt="Responsável" />
                      <span>{projetoSelecionado.responsavel}</span>
                    </div>
                  </div>
                </div>

                <div className="secao-pessoas-projeto">
                  <h3>Membros envolvidos</h3>

                  {projetoSelecionado.membros.map((m, i) => (
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