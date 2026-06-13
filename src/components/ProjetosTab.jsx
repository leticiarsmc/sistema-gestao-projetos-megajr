import { useState, useEffect } from "react";
import {
  getAllAllocations,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} from "../services/allocationService";
import patoTriste from "../assets/patotriste.png";

const ProjetosTab = () => {
  const [subAba, setSubAba] = useState("lista");
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    carregarAlocacoes();
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

  const copiarId = (id) => {
    navigator.clipboard.writeText(id);
    alert("ID copiado com sucesso: " + id);
  };

  // NOVA FUNÇÃO: Transforma o texto cru do Prisma em uma etiqueta (badge) colorida
  const renderStatus = (status) => {
    const baseStyle = { padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" };
    
    switch (status) {
      case "PLANNING":
        return <span style={{ ...baseStyle, backgroundColor: "#e2e8f0", color: "#475569" }}>Planejamento</span>;
      case "IN_PROGRESS":
        return <span style={{ ...baseStyle, backgroundColor: "#fef08a", color: "#854d0e" }}>Em Progresso</span>;
      case "DONE":
        return <span style={{ ...baseStyle, backgroundColor: "#bbf7d0", color: "#166534" }}>Concluído</span>;
      case "CANCELLED":
        return <span style={{ ...baseStyle, backgroundColor: "#fecaca", color: "#991b1b" }}>Cancelado</span>;
      default:
        return <span style={{ ...baseStyle, backgroundColor: "#f3f4f6", color: "#374151" }}>Indefinido</span>;
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>Lista de Alocações</h3>
            <button className="btn-submit-admin" onClick={navegarParaCadastro} style={{ width: "auto", margin: 0, padding: "8px 16px" }}>
              + Nova Alocação
            </button>
          </div>

          <table className="tabela-admin">
            <thead>
              <tr>
                <th>ID Alocação</th>
                <th>Projeto</th>
                <th>Status</th> {/* NOVA COLUNA DE STATUS */}
                <th>Membro</th>
                <th>Responsabilidade</th>
                <th>Config</th>
              </tr>
            </thead>
            <tbody>
              {/* Ajustei o colSpan para 6 por causa da nova coluna */}
              {loading && <tr><td colSpan="6">Carregando alocações...</td></tr>}
              {error && <tr><td colSpan="6" style={{ color: "red" }}>{error}</td></tr>}
              {!loading && !error && allocations.length === 0 && <tr><td colSpan="6">Nenhuma alocação encontrada.</td></tr>}
              
              {!loading && !error && allocations.map((aloc) => (
                <tr key={aloc.id}>
                  {/* COLUNA DE ID COM BOTÃO DE COPIAR */}
                  <td>
                    <span style={{ fontSize: "0.85rem", opacity: 0.8, marginRight: "8px" }}>
                      {aloc.id.substring(0, 8)}...
                    </span>
                    <button 
                      onClick={() => copiarId(aloc.id)} 
                      title="Copiar ID completo"
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
                    >
                      📋
                    </button>
                  </td>
                  <td>
                    {aloc.project?.name || "N/A"}
                    {aloc.projectId && (
                      <button 
                        onClick={() => copiarId(aloc.projectId)} 
                        title="Copiar ID do Projeto"
                        style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "8px", fontSize: "1rem" }}
                        type="button"
                      >
                        📋
                      </button>
                    )}
                  </td>
                  {/* EXIBINDO A ETIQUETA DE STATUS */}
                  <td>
                    {renderStatus(aloc.project?.status)}
                  </td>
                  <td>{aloc.member?.name || "N/A"}</td>
                  <td>{aloc.responsibility || "Não definida"}</td>
                  <td>
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
                  <label>ID do Membro (Copie na aba de Membros)</label>
                  <input type="text" className="input-admin" value={formData.memberId} onChange={(e) => setFormData({ ...formData, memberId: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>ID do Projeto</label>
                  <input type="text" className="input-admin" value={formData.projectId} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })} required />
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