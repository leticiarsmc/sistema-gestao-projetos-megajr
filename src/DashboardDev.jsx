import { useState } from "react";
import "./DashboardDev.css";
import avatar from "./assets/avatar.png";

const DashboardDev = () => {
  const [telaAtual, setTelaAtual] = useState("dashboard");

  const projetos = Array(6).fill({
    titulo: "Plataforma Web",
    cliente: "Facebook",
    tipo: "Full Stack",
    prazo: "12/06/2023",
    descricao: "Desenvolvimento de nova plataforma web institucional.",
  });

  const alocacoes = [
    {
      projeto: "Painel Administrativo",
      cliente: "Facebook",
      funcao: "Back-end",
      data: "09/3/2025",
      prazo: "12/7/2025",
      status: "Em andamento",
    },
    {
      projeto: "App Interno",
      cliente: "Facebook",
      funcao: "Mobile",
      data: "23/9/2024",
      prazo: "07/2/2025",
      status: "Concluído",
    },
  ];

  const checklist = [
    {
      item: "Funcionalidades implementadas",
      desc: "Todas as funcionalidades foram implementadas e testadas.",
      status: "Completo",
      cor: "verde",
    },
    {
      item: "Testes realizados",
      desc: "Testes unitários e de integração concluídos.",
      status: "Completo",
      cor: "verde",
    },
    {
      item: "Documentação",
      desc: "Documentação do código e da API atualizada.",
      status: "Completo",
      cor: "verde",
    },
    {
      item: "Revisão do código",
      desc: "Aguardando a revisão e aprovação do código",
      status: "Pendente",
      cor: "amarelo",
    },
    {
      item: "Revisão do código",
      desc: "Aguardando a revisão e aprovação do código",
      status: "Pendente",
      cor: "vermelho",
    },
  ];

  return (
    <div className="layout-principal">
      <aside className="sidebar">
        <div className="logo-mega">MEGA JR.</div>
        <nav className="nav-botoes">
          <button className="btn-sidebar ativo">Projetos</button>
          <button className="btn-sidebar">Minhas alocações</button>
        </nav>
        <button className="btn-sair">Sair</button>
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
              placeholder="Buscar projetos"
              className="input-busca"
            />
          </div>
          <div className="perfil-usuario">
            <img src={avatar} alt="Avatar" className="avatar-header" />
            <div className="info-usuario">
              <span className="nome-usuario">Fabio Akita</span>
              <span className="cargo-usuario">Desenvolvedor</span>
            </div>
          </div>
        </header>

        <div className="area-telas">
          {telaAtual === "dashboard" ? (
            <div className="tela-dashboard">
              <h2>Dashboard-Projetos</h2>

              <div className="grid-projetos">
                {projetos.map((proj, i) => (
                  <div key={i} className="card-projeto">
                    <div className="bolinha-status"></div>
                    <h3>{proj.titulo}</h3>
                    <div className="tags">
                      <span className="tag laranja">{proj.cliente}</span>
                      <span className="tag cinza">{proj.tipo}</span>
                    </div>
                    <p className="prazo">Prazo: {proj.prazo}</p>
                    <p className="descricao">{proj.descricao}</p>
                    <button
                      className="btn-detalhes"
                      onClick={() => setTelaAtual("detalhes")}
                    >
                      Ver detalhes
                    </button>
                  </div>
                ))}
              </div>

              <h2>Minhas Alocações</h2>
              <p className="subtitulo">
                Projetos que você já pegou para desenvolver.
              </p>

              <table className="tabela-alocacoes">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Função</th>
                    <th>Peguei em</th>
                    <th>Prazo</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {alocacoes.map((aloc, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{aloc.projeto}</strong>
                        <br />
                        <span className="cliente-tabela">{aloc.cliente}</span>
                      </td>
                      <td>{aloc.funcao}</td>
                      <td>{aloc.data}</td>
                      <td>{aloc.prazo}</td>
                      <td
                        className={
                          aloc.status === "Concluído"
                            ? "texto-branco"
                            : "texto-laranja"
                        }
                      >
                        {aloc.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tela-detalhes">
              <div className="cabecalho-detalhes">
                <div>
                  <h2>Finalizar Projeto</h2>
                  <p className="subtitulo">
                    Projetos que você já pegou para desenvolver.
                  </p>
                </div>
                <button
                  className="btn-voltar"
                  onClick={() => setTelaAtual("dashboard")}
                >
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
                    <h3>Painel Administrativo</h3>
                    <div className="tags">
                      <span className="tag laranja">Facebook</span>
                      <span className="tag cinza">Full Stack</span>
                    </div>
                    <p className="descricao-resumo">
                      Desenvolvimento de nova plataforma web institucional.
                    </p>
                  </div>
                </div>

                <div className="dados-resumo">
                  <div className="coluna-dado">
                    <span className="label-dado">Pegue em</span>
                    <span className="valor-dado">09/3/2025</span>
                  </div>
                  <div className="coluna-dado">
                    <span className="label-dado">Prazo</span>
                    <span className="valor-dado">12/7/2025</span>
                  </div>
                  <div className="coluna-dado">
                    <span className="label-dado">Status atual</span>
                    <span className="valor-dado status-andamento">
                      Em andamento
                    </span>
                  </div>
                  <div className="coluna-porcentagem">
                    <span className="porcentagem">
                      67<span className="simbolo-porcento">%</span>
                    </span>
                    <span className="label-dado">Processo geral</span>
                  </div>
                </div>
              </div>

              <div className="grid-inferior">
                <div className="card-checklist">
                  <h3>Checklist de entrega</h3>
                  <p className="subtitulo">
                    Verifique se todos os itens foram concluídos.
                  </p>
                  <div className="lista-checklist">
                    {checklist.map((item, i) => (
                      <div key={i} className="item-checklist">
                        <div className={`bolinha-${item.cor}`}></div>
                        <div className="textos-checklist">
                          <strong>{item.item}</strong>
                          <p>{item.desc}</p>
                        </div>
                        <span className={`badge-${item.status.toLowerCase()}`}>
                          {item.status}
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
                      Após enviar, o projeto será avaliado pelo gerente
                      responsável.
                    </span>
                  </div>
                </div>

                <div className="card-descricao">
                  <h3>Descrição do projeto</h3>
                  <textarea placeholder="Escrever um descrição do projeto..."></textarea>
                  <button className="btn-enviar">Enviar</button>
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
