import { useState } from "react";
import "./DashboardDev.css";
import avatar from "./assets/avatar.png";

const DashboardDev = ({ onLogout }) => {
  const [abaAtiva, setAbaAtiva] = useState("projetos");
  const [telaAtual, setTelaAtual] = useState("lista");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [alocacaoSelecionada, setAlocacaoSelecionada] = useState(0);
  const [novaTarefa, setNovaTarefa] = useState("");

  const projetosGerais = [
    {
      projeto: "Sistema de Gestão de Projetos",
      cliente: "Mega Jr",
      tipo: "Full Stack",
      descricao: "Sistema interno para cadastro de membros, projetos e alocações da Mega Jr.",
      inicio: "01/01/2026",
      prazo: "30/03/2026",
      status: "Em andamento",
      membros: ["Letícia Cardoso", "Felipe Souza"],
    },
    {
      projeto: "Portal Institucional",
      cliente: "Mega Jr",
      tipo: "Front-end",
      descricao: "Portal institucional com área pública e painel administrativo para gestão de conteúdo.",
      inicio: "10/02/2026",
      prazo: "15/06/2026",
      status: "Planejamento",
      membros: ["Mariana S."],
    },
    {
      projeto: "App Interno",
      cliente: "Mega Jr",
      tipo: "Mobile",
      descricao: "Aplicativo interno para acompanhamento de tarefas e alocações dos membros.",
      inicio: "23/9/2024",
      prazo: "07/2/2025",
      status: "Concluído",
      membros: ["Pedro H."],
    },
    {
      projeto: "Dashboard de Indicadores",
      cliente: "Mega Jr",
      tipo: "Full Stack",
      descricao: "Dashboard com indicadores de carga de trabalho e status dos projetos ativos.",
      inicio: "05/03/2026",
      prazo: "10/05/2026",
      status: "Em andamento",
      membros: ["Ana Clara"],
    },
    {
      projeto: "Plataforma Web",
      cliente: "Mega Jr",
      tipo: "Full Stack",
      descricao: "Plataforma web para clientes externos, atualmente com prazo em atraso.",
      inicio: "20/01/2026",
      prazo: "20/03/2026",
      status: "Atrasado",
      membros: ["Felipe Souza"],
    },
  ];

  const [alocacoes, setAlocacoes] = useState([
    {
      projeto: "Sistema de Gestão de Projetos",
      cliente: "Mega Jr",
      tipo: "Full Stack",
      funcao: "Front-end",
      data: "01/01/2026",
      prazo: "30/03/2026",
      status: "Em andamento",
      descricao: "Sistema interno para cadastro de membros, projetos e alocações da Mega Jr.",
      checklist: [
        {
          item: "Funcionalidades implementadas",
          desc: "Todas as funcionalidades foram implementadas e testadas.",
          status: "Completo",
        },
        {
          item: "Testes realizados",
          desc: "Testes unitários e de integração concluídos.",
          status: "Completo",
        },
        {
          item: "Documentação",
          desc: "Documentação do código e da API atualizada.",
          status: "Completo",
        },
        {
          item: "Revisão do código",
          desc: "Aguardando a revisão e aprovação do código",
          status: "Pendente",
        },
      ],
    },
    {
      projeto: "App Interno",
      cliente: "Mega Jr",
      tipo: "Mobile",
      funcao: "QA",
      data: "23/9/2024",
      prazo: "07/2/2025",
      status: "Concluído",
      descricao: "Aplicativo interno para acompanhamento de tarefas e alocações dos membros.",
      checklist: [
        {
          item: "Funcionalidades implementadas",
          desc: "Todas as funcionalidades foram implementadas e testadas.",
          status: "Completo",
        },
        {
          item: "Testes realizados",
          desc: "Testes unitários e de integração concluídos.",
          status: "Completo",
        },
      ],
    },
  ]);

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
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icone-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>

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
              <span className="nome-usuario">Letícia Cardoso</span>
              <span className="cargo-usuario">Front-end</span>
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

          <div className="icones-sociais">
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
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardDev;
