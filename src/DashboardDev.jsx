import { useEffect, useState } from "react";
import "./DashboardDev.css";
import avatar from "./assets/avatar.png";
import { getMembers } from "./services/memberService";
import { getProjects } from "./services/projectService";
import { formatProjectStatus } from "./utils/projectStatus";

const formatarData = (dataIso) => {
  if (!dataIso) return "Sem prazo definido";
  return new Date(dataIso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const seedProjectsFallback = [
  {
    id: "mega-junior",
    name: "Mega Junior",
    description:
      "Sistema de gestao de projetos, membros, alocacoes e carga de trabalho da Mega Jr.",
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-06-30T00:00:00.000Z",
    status: "IN_PROGRESS",
    allocations: [
      { member: { name: "Samyr" }, responsibility: "Front-end" },
      { member: { name: "Yan" }, responsibility: "Design" },
      { member: { name: "Letícia" }, responsibility: "Back-end" },
      { member: { name: "Elias" }, responsibility: "Back-end" },
    ],
  },
  {
    id: "portal-institucional",
    name: "Portal Institucional",
    description:
      "Portal institucional para divulgacao de projetos e conteudos da Mega Jr.",
    startDate: "2026-07-01T00:00:00.000Z",
    endDate: "2026-09-30T00:00:00.000Z",
    status: "PLANNING",
    allocations: [{ member: { name: "Mariana S." }, responsibility: "UI/UX" }],
  },
  {
    id: "dashboard-indicadores",
    name: "Dashboard de Indicadores",
    description:
      "Dashboard de indicadores e metricas de desempenho dos projetos da Mega Jr.",
    startDate: "2026-05-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    status: "IN_PROGRESS",
    allocations: [{ member: { name: "Ana Clara" }, responsibility: "Full Stack" }],
  },
  {
    id: "app-interno",
    name: "App Interno",
    description:
      "Aplicativo interno para gestao de tarefas e comunicacao entre membros da Mega Jr.",
    startDate: "2026-01-01T00:00:00.000Z",
    endDate: "2026-05-30T00:00:00.000Z",
    status: "DONE",
    allocations: [{ member: { name: "Pedro H." }, responsibility: "QA" }],
  },
  {
    id: "sistema-chamados",
    name: "Sistema de Chamados",
    description:
      "Sistema de abertura e acompanhamento de chamados internos da Mega Jr.",
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    status: "IN_PROGRESS",
    allocations: [
      { member: { name: "João Victor" }, responsibility: "Product Owner" },
    ],
  },
];

const pedroFallback = {
  id: "pedro-h",
  name: "Pedro H.",
  email: "pedroh@megajr.com",
  position: "QA",
  allocations: [
    {
      id: "pedro-app-interno",
      responsibility: "QA",
      project: seedProjectsFallback[3],
    },
  ],
};

const criarChecklistPadrao = () => [
  {
    item: "Funcionalidades implementadas",
    desc: "Todas as funcionalidades foram implementadas e testadas.",
    status: "Completo",
  },
  {
    item: "Testes realizados",
    desc: "Testes unitarios e de integracao concluidos.",
    status: "Completo",
  },
  {
    item: "Documentacao",
    desc: "Documentacao do codigo e da API atualizada.",
    status: "Completo",
  },
  {
    item: "Revisao do codigo",
    desc: "Aguardando a revisao e aprovacao do codigo",
    status: "Pendente",
  },
];

const normalizarProjeto = (project) => ({
  id: project.id,
  projeto: project.name,
  cliente: "Mega Jr",
  tipo: `${project.allocations?.length || 0} membro(s)`,
  descricao: project.description,
  inicio: formatarData(project.startDate),
  prazo: formatarData(project.endDate),
  status: formatProjectStatus(project.status),
  membros:
    project.allocations?.map((allocation) => allocation.member?.name).filter(Boolean) ||
    [],
});

const normalizarAlocacao = (allocation) => ({
  id: allocation.id,
  projeto: allocation.project.name,
  cliente: "Mega Jr",
  tipo: `${allocation.project.allocations?.length || 0} membro(s)`,
  funcao: allocation.responsibility,
  data: formatarData(allocation.project.startDate),
  prazo: formatarData(allocation.project.endDate),
  status: formatProjectStatus(allocation.project.status),
  descricao: allocation.project.description,
  checklist: criarChecklistPadrao(),
});

const DashboardDev = ({ onLogout }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem("user") || "{}");
  const membroLogado = usuarioLogado.member || null;

  const [abaAtiva, setAbaAtiva] = useState("projetos");
  const [telaAtual, setTelaAtual] = useState("lista");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [alocacaoSelecionada, setAlocacaoSelecionada] = useState(0);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [projetosGerais, setProjetosGerais] = useState([]);
  const [alocacoes, setAlocacoes] = useState([]);
  const [usuarioMembro, setUsuarioMembro] = useState(membroLogado || pedroFallback);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro("");

      try {
        const [projectsData, membersData] = await Promise.all([
          getProjects(),
          getMembers(),
        ]);
        const membroAtual =
          membersData.find((member) => member.email === membroLogado?.email) ||
          membersData.find((member) => member.id === membroLogado?.id);

        setProjetosGerais(projectsData.map(normalizarProjeto));
        setUsuarioMembro(membroAtual || membroLogado || pedroFallback);
        setAlocacoes(
          (membroAtual?.allocations || membroLogado?.allocations || []).map(
            normalizarAlocacao
          )
        );
      } catch (err) {
        setErro(`${err.message}. Exibindo fallback coerente com a seed.`);
        setProjetosGerais(seedProjectsFallback.map(normalizarProjeto));
        setUsuarioMembro(membroLogado || pedroFallback);
        setAlocacoes(
          (membroLogado?.allocations || pedroFallback.allocations || []).map(
            normalizarAlocacao
          )
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const trocarAba = (aba) => {
    setAbaAtiva(aba);
    setTelaAtual("lista");
    setProjetoSelecionado(null);
  };

  const abrirDetalhesProjeto = (index) => {
    setProjetoSelecionado(index);
    setTelaAtual("detalhes-projeto");
  };

  const abrirQuadroEntregas = (index) => {
    setAlocacaoSelecionada(index);
    setTelaAtual("quadro-entregas");
  };

  const voltarParaLista = () => {
    setTelaAtual("lista");
    setProjetoSelecionado(null);
  };

  const alternarTarefa = (tarefaIndex) => {
    setAlocacoes((atual) =>
      atual.map((aloc, i) => {
        if (i !== alocacaoSelecionada) return aloc;

        return {
          ...aloc,
          checklist: aloc.checklist.map((tarefa, t) =>
            t === tarefaIndex
              ? {
                  ...tarefa,
                  status:
                    tarefa.status === "Completo" ? "Pendente" : "Completo",
                }
              : tarefa
          ),
        };
      })
    );
  };

  const adicionarTarefa = () => {
    const texto = novaTarefa.trim();

    if (!texto) {
      return;
    }

    setAlocacoes((atual) =>
      atual.map((aloc, i) => {
        if (i !== alocacaoSelecionada) return aloc;

        return {
          ...aloc,
          checklist: [
            ...aloc.checklist,
            { item: texto, desc: "Tarefa adicionada por você.", status: "Pendente" },
          ],
        };
      })
    );

    setNovaTarefa("");
  };

  const projetoAtual =
    projetoSelecionado !== null ? projetosGerais[projetoSelecionado] : null;
  const alocacaoAtual = alocacoes[alocacaoSelecionada];

  return (
    <div className="layout-principal">
      <aside className="sidebar">
        <div className="logo-mega">MEGA JR.</div>

        <nav className="nav-botoes">
          <button
            className={`btn-sidebar ${abaAtiva === "projetos" ? "ativo" : ""}`}
            onClick={() => trocarAba("projetos")}
          >
            Projetos
          </button>

          <button
            className={`btn-sidebar ${
              abaAtiva === "alocacoes" ? "ativo" : ""
            }`}
            onClick={() => trocarAba("alocacoes")}
          >
            Minhas alocações
          </button>
        </nav>

        <button className="btn-sair" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="conteudo-principal">
        <header className="cabecalho">
          <div className="busca-container">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="text"
              placeholder={
                abaAtiva === "projetos" ? "Buscar projetos" : "Buscar alocações"
              }
              className="input-busca"
            />
          </div>

          <div className="perfil-usuario">
            <img src={avatar} alt="Avatar" className="avatar-header" />

            <div className="info-usuario">
              <span className="nome-usuario">{usuarioMembro.name}</span>
              <span className="cargo-usuario">{usuarioMembro.position}</span>
            </div>
          </div>
        </header>

        <div className="area-telas">
          {/* ABA PROJETOS - lista somente leitura */}
          {abaAtiva === "projetos" && telaAtual === "lista" && (
            <div className="tela-dashboard">
              <h2>Projetos</h2>

              <p className="subtitulo">
                Todos os projetos cadastrados (somente leitura).
              </p>
              {carregando && <p className="subtitulo">Carregando projetos...</p>}
              {erro && <p className="dashboard-error">{erro}</p>}

              <div className="grid-projetos">
                {projetosGerais.map((proj, i) => (
                  <div key={i} className="card-projeto">
                    <div className="bolinha-status"></div>

                    <h3>{proj.projeto}</h3>

                    <div className="tags">
                      <span className="tag laranja">{proj.cliente}</span>
                      <span className="tag cinza">{proj.tipo}</span>
                    </div>

                    <p className="prazo">Prazo: {proj.prazo}</p>
                    <p className="descricao">{proj.descricao}</p>

                    <button
                      className="btn-detalhes"
                      onClick={() => abrirDetalhesProjeto(i)}
                    >
                      Ver detalhes
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA PROJETOS - detalhes somente leitura */}
          {abaAtiva === "projetos" &&
            telaAtual === "detalhes-projeto" &&
            projetoAtual && (
              <div className="tela-detalhes">
                <div className="cabecalho-detalhes">
                  <div>
                    <h2>Detalhes do projeto</h2>

                    <p className="subtitulo">Informações gerais (somente leitura).</p>
                  </div>

                  <button className="btn-voltar" onClick={voltarParaLista}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#df8a43"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 19-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                  </button>
                </div>

                <div className="card-resumo">
                  <div className="info-principal-resumo">
                    <div className="icone-globo">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>

                    <div>
                      <h3>{projetoAtual.projeto}</h3>

                      <div className="tags">
                        <span className="tag laranja">{projetoAtual.cliente}</span>
                        <span className="tag cinza">{projetoAtual.tipo}</span>
                      </div>

                      <p className="descricao-resumo">{projetoAtual.descricao}</p>
                    </div>
                  </div>

                  <div className="dados-resumo">
                    <div className="coluna-dado">
                      <span className="label-dado">Início</span>
                      <span className="valor-dado">{projetoAtual.inicio}</span>
                    </div>

                    <div className="coluna-dado">
                      <span className="label-dado">Prazo</span>
                      <span className="valor-dado">{projetoAtual.prazo}</span>
                    </div>

                    <div className="coluna-dado">
                      <span className="label-dado">Status atual</span>
                      <span className="valor-dado status-andamento">
                        {projetoAtual.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-checklist">
                  <h3>Membros envolvidos</h3>

                  <div className="lista-checklist">
                    {projetoAtual.membros.map((membro, i) => (
                      <div key={i} className="item-checklist">
                        <div className="bolinha-verde"></div>

                        <div className="textos-checklist">
                          <img src={avatar} alt={membro} className="avatar-membro-projeto" />
                          <strong>{membro}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {/* ABA MINHAS ALOCAÇÕES - lista */}
          {abaAtiva === "alocacoes" && telaAtual === "lista" && (
            <div className="tela-dashboard">
              <h2>Minhas Alocações</h2>

              <p className="subtitulo">
                Projetos em que você está alocado atualmente.
              </p>
              {carregando && <p className="subtitulo">Carregando alocacoes...</p>}
              {erro && <p className="dashboard-error">{erro}</p>}
              {!carregando && alocacoes.length === 0 && (
                <p className="subtitulo">Nenhuma alocacao encontrada para este membro.</p>
              )}

              <div className="grid-projetos">
                {alocacoes.map((aloc, i) => (
                  <div key={i} className="card-projeto">
                    <div className="bolinha-status"></div>

                    <h3>{aloc.projeto}</h3>

                    <div className="tags">
                      <span className="tag laranja">{aloc.cliente}</span>
                      <span className="tag cinza">{aloc.funcao}</span>
                    </div>

                    <p className="prazo">Prazo: {aloc.prazo}</p>

                    <p className="descricao">Status: {aloc.status}</p>

                    <button
                      className="btn-detalhes"
                      onClick={() => abrirQuadroEntregas(i)}
                    >
                      Abrir quadro de entregas
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA MINHAS ALOCAÇÕES - quadro de entregas */}
          {abaAtiva === "alocacoes" && telaAtual === "quadro-entregas" && (
            <div className="tela-detalhes">
              <div className="cabecalho-detalhes">
                <div>
                  <h2>Quadro de entregas</h2>

                  <p className="subtitulo">
                    Acompanhamento pessoal da sua entrega neste projeto.
                  </p>
                </div>

                <button className="btn-voltar" onClick={voltarParaLista}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#df8a43"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                </button>
              </div>

              <div className="card-resumo">
                <div className="info-principal-resumo">
                  <div className="icone-globo">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>

                  <div>
                    <h3>{alocacaoAtual.projeto}</h3>

                    <div className="tags">
                      <span className="tag laranja">{alocacaoAtual.cliente}</span>
                      <span className="tag cinza">{alocacaoAtual.funcao}</span>
                    </div>

                    <p className="descricao-resumo">{alocacaoAtual.descricao}</p>
                  </div>
                </div>

                <div className="dados-resumo">
                  <div className="coluna-dado">
                    <span className="label-dado">Pegue em</span>
                    <span className="valor-dado">{alocacaoAtual.data}</span>
                  </div>

                  <div className="coluna-dado">
                    <span className="label-dado">Prazo</span>
                    <span className="valor-dado">{alocacaoAtual.prazo}</span>
                  </div>

                  <div className="coluna-dado">
                    <span className="label-dado">Status atual</span>
                    <span className="valor-dado status-andamento">
                      {alocacaoAtual.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid-inferior">
                <div className="card-checklist">
                  <h3>Minhas tarefas de entrega</h3>

                  <p className="subtitulo">
                    Clique em uma tarefa para alternar entre pendente e concluída.
                  </p>

                  <div className="lista-checklist">
                    {alocacaoAtual.checklist.map((tarefa, i) => (
                      <div
                        key={i}
                        className="item-checklist"
                        onClick={() => alternarTarefa(i)}
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className={`bolinha-${
                            tarefa.status === "Completo" ? "verde" : "amarelo"
                          }`}
                        ></div>

                        <div className="textos-checklist">
                          <strong>{tarefa.item}</strong>
                        </div>

                        <span
                          className={`badge-${tarefa.status.toLowerCase()}`}
                        >
                          {tarefa.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="alerta-checklist">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#df8a43"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>

                    <span>
                      As tarefas marcadas aqui são apenas um acompanhamento
                      local da sua entrega.
                    </span>
                  </div>
                </div>

                <div className="card-descricao">
                  <h3>Adicionar tarefa</h3>

                  <p className="subtitulo">
                    Inclua uma nova tarefa de acompanhamento para esta alocação.
                  </p>

                  <input
                    type="text"
                    placeholder="Descreva a tarefa..."
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #444",
                      background: "#1f1f1f",
                      color: "white",
                      marginBottom: "12px",
                      boxSizing: "border-box",
                    }}
                  />

                  <button className="btn-enviar" onClick={adicionarTarefa}>
                    Adicionar tarefa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="footer-dev">
          <p>Vamos trabalhar juntos.</p>

          <div className="logo-footer">MEGA JR.</div>

          <div className="icones-sociais" aria-label="Redes sociais">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
              strokeLinecap="round"
              strokeLinejoin="round"
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
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardDev;
