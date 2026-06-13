import { useState, useEffect } from "react";
import {
  getAllAllocations,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} from "../services/allocationService";
import { getMembers } from "../services/memberService";
import { getProjects } from "../services/projectService";
import { formatProjectStatus } from "../utils/projectStatus";
import patoTriste from "../assets/patotriste.png";
import avatar from "../assets/avatar.png";

const ProjetosTab = () => {
  const [subAba, setSubAba] = useState("lista");
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [modal, setModal] = useState({ aberto: false, id: null, nomeProjeto: "" });

  // Estado para o formulário
  const [formData, setFormData] = useState({
    id: "",
    memberId: "",
    projectId: "",
    responsibility: "",
  });

  const carregarAlocacoes = async () => {
    setLoading(true);
    try {
      const data = await getAllAllocations();
      setAllocations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const carregarOpcoes = async () => {
    try {
      const [membersData, projectsData] = await Promise.all([getMembers(), getProjects()]);
      setMembers(membersData);
      setProjects(projectsData);
    } catch (err) {
      alert("Erro ao carregar membros/projetos: " + err.message);
    }
  };

  useEffect(() => {
    carregarAlocacoes();
    carregarOpcoes();
  }, []);

  const abrirModalExcluir = (id, nomeProjeto) => setModal({ aberto: true, id, nomeProjeto });
  const fecharModal = () => setModal({ aberto: false, id: null, nomeProjeto: "" });

  const confirmarExclusao = async () => {
    try {
      await deleteAllocation(modal.id);
      fecharModal();
      carregarAlocacoes();
    } catch (err) {
      alert("Erro ao excluir: " + err.message);
    }
  };

  const navegarParaCadastro = () => {
    setFormData({ id: "", memberId: "", projectId: "", responsibility: "" });
    setSubAba("cadastro");
  };

  const navegarParaEdicao = (aloc) => {
    setFormData({
      id: aloc.id,
      memberId: aloc.memberId,
      projectId: aloc.projectId,
      responsibility: aloc.responsibility || "",
    });
    setSubAba("editar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subAba === "cadastro") {
        await createAllocation({
          memberId: formData.memberId,
          projectId: formData.projectId,
          responsibility: formData.responsibility,
        });
      } else {
        await updateAllocation(formData.id, {
          responsibility: formData.responsibility,
        });
      }
      setSubAba("lista");
      carregarAlocacoes();
    } catch (err) {
      alert(err.message);
    }
  };

  // NOVA FUNÇÃO: Transforma o texto cru do Prisma em uma etiqueta (badge) colorida
  const renderStatus = (status) => {
    const baseStyle = { padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" };
    const label = formatProjectStatus(status);

    switch (status) {
      case "PLANNING":
        return <span style={{ ...baseStyle, backgroundColor: "#e2e8f0", color: "#475569" }}>{label}</span>;
      case "IN_PROGRESS":
        return <span style={{ ...baseStyle, backgroundColor: "#fef08a", color: "#854d0e" }}>{label}</span>;
      case "DONE":
        return <span style={{ ...baseStyle, backgroundColor: "#bbf7d0", color: "#166534" }}>{label}</span>;
      case "CANCELLED":
        return <span style={{ ...baseStyle, backgroundColor: "#fecaca", color: "#991b1b" }}>{label}</span>;
      default:
        return <span style={{ ...baseStyle, backgroundColor: "#f3f4f6", color: "#374151" }}>{label || "Indefinido"}</span>;
    }
  };

  return (
    <div className="membros-tab-container">
      {/* MODAL DE REMOÇÃO */}
      {modal.aberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-pato">
              <img src={patoTriste} alt="Pato Triste" />
            </div>
            <h3>Projeto: {modal.nomeProjeto}</h3>
            <div className="modal-body-pergunta">
              <p>
                Deseja <span className="destaque-remover">REMOVER</span> essa alocação?
              </p>
            </div>
            <div className="modal-footer-btns">
              <button className="btn-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarExclusao}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TELA 1: LISTA EXPANDIDA */}
      {subAba === "lista" && (
        <div className="tabela-container-admin">
          <div className="admin-card-header">
            <h3>Lista de Alocações</h3>
            <button className="btn-submit-admin" onClick={navegarParaCadastro}>
              + Nova Alocação
            </button>
          </div>

          <table className="tabela-admin">
            <thead>
              <tr>
                <th>Projeto</th>
                <th>Status</th>
                <th>Membro</th>
                <th>Responsabilidade</th>
                <th>Config</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="5">Carregando alocações...</td></tr>}
              {error && <tr><td colSpan="5" style={{ color: "red" }}>{error}</td></tr>}
              {!loading && !error && allocations.length === 0 && <tr><td colSpan="5">Nenhuma alocação encontrada.</td></tr>}

              {!loading && !error && allocations.map((aloc) => (
                <tr key={aloc.id}>
                  <td>{aloc.project?.name || "N/A"}</td>
                  {/* EXIBINDO A ETIQUETA DE STATUS */}
                  <td>
                    {renderStatus(aloc.project?.status)}
                  </td>
                  <td className="td-membro">
                    <span className="cel-pessoa">
                      {aloc.member?.name && <img src={avatar} alt={aloc.member.name} />}
                      {aloc.member?.name || "N/A"}
                    </span>
                  </td>
                  <td>{aloc.responsibility || "Não definida"}</td>
                  <td className="td-config">
                    <button className="btn-link-edit" onClick={() => navegarParaEdicao(aloc)}>Editar</button>
                    <span className="divisor">/</span>
                    <button className="btn-link-del" onClick={() => abrirModalExcluir(aloc.id, aloc.project?.name)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TELA 2: FORMULÁRIO DE CADASTRO/EDIÇÃO */}
      {(subAba === "cadastro" || subAba === "editar") && (
        <div className="view-cadastro-membro" style={{ padding: 0 }}>
          <button className="btn-back-circle-admin" onClick={() => setSubAba("lista")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#df8a43" strokeWidth="3">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="titulo-central-admin">
            {subAba === "cadastro" ? "Nova Alocação" : "Editar Alocação"}
          </h1>

          <form onSubmit={handleSubmit} className="form-admin">
            {subAba === "cadastro" && (
              <div className="form-row-admin">
                <div className="form-group">
                  <label>Membro</label>
                  <select className="input-admin" value={formData.memberId} onChange={(e) => setFormData({ ...formData, memberId: e.target.value })} required>
                    <option value="">Selecione um membro</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Projeto</label>
                  <select className="input-admin" value={formData.projectId} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })} required>
                    <option value="">Selecione um projeto</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {formatProjectStatus(project.status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="form-row-admin">
              <div className="form-group" style={{ width: "100%" }}>
                <label>Responsabilidade (Ex: Desenvolvedor Front-end, Tech Lead)</label>
                <input type="text" className="input-admin" value={formData.responsibility} onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })} required />
              </div>
            </div>
            <button type="submit" className="btn-submit-admin">
              {subAba === "cadastro" ? "Criar Alocação" : "Salvar Alterações"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjetosTab;