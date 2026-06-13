import { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../services/projectService";
import { formatProjectStatus } from "../utils/projectStatus";
import patoTriste from "../assets/patotriste.png";

const GestaoProjetos = () => {
  const [subAba, setSubAba] = useState("lista");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modal, setModal] = useState({ aberto: false, projectId: null, nome: "" });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "PLANNING"
  });

  const carregarProjetos = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  const abrirModalExcluir = (id, nome) => setModal({ aberto: true, projectId: id, nome });
  const fecharModal = () => setModal({ aberto: false, projectId: null, nome: "" });

  const confirmarExclusao = async () => {
    try {
      await deleteProject(modal.projectId);
      fecharModal();
      carregarProjetos();
    } catch (err) {
      alert("Erro ao excluir: " + err.message);
    }
  };

  const navegarParaCadastro = () => {
    setFormData({ id: "", name: "", description: "", startDate: "", endDate: "", status: "PLANNING" });
    setSubAba("cadastro");
  };

  const navegarParaEdicao = (project) => {
    // Convertendo as datas que vêm do banco (ISO) para o formato YYYY-MM-DD para o input type="date"
    const start = project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "";
    const end = project.endDate ? new Date(project.endDate).toISOString().split("T")[0] : "";

    setFormData({
      id: project.id,
      name: project.name,
      description: project.description || "",
      startDate: start,
      endDate: end,
      status: project.status || "PLANNING"
    });
    setSubAba("editar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // O Prisma espera as datas em formato ISO-8601
      const payload = {
        name: formData.name,
        description: formData.description,
        startDate: new Date(formData.startDate).toISOString(),
        status: formData.status
      };
      
      if (formData.endDate) {
        payload.endDate = new Date(formData.endDate).toISOString();
      }

      if (subAba === "cadastro") {
        await createProject(payload);
      } else {
        await updateProject(formData.id, payload);
      }
      setSubAba("lista");
      carregarProjetos();
    } catch (err) {
      alert("Erro ao salvar projeto: " + err.message);
    }
  };

  return (
    <div className="membros-tab-container">
      {modal.aberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-pato">
              <img src={patoTriste} alt="Pato Triste" />
            </div>
            <h3>{modal.nome}</h3>
            <div className="modal-body-pergunta">
              <p>Deseja <span className="destaque-remover">REMOVER</span> esse projeto?</p>
            </div>
            <div className="modal-footer-btns">
              <button className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
              <button className="btn-confirmar" onClick={confirmarExclusao}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {subAba === "lista" && (
        <div className="tabela-container-admin">
          <div className="admin-card-header">
            <h3>Gerenciamento de Projetos</h3>
            <button className="btn-submit-admin" onClick={navegarParaCadastro}>
              + Criar Projeto
            </button>
          </div>
          
          <table className="tabela-admin">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Início</th>
                <th>Config</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="4">Carregando projetos...</td></tr>}
              {error && <tr><td colSpan="4" style={{ color: "red" }}>{error}</td></tr>}
              {!loading && !error && projects.length === 0 && <tr><td colSpan="4">Nenhum projeto cadastrado.</td></tr>}

              {!loading && !error && projects.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.name}</td>
                  <td>{formatProjectStatus(proj.status)}</td>
                  <td>{new Date(proj.startDate).toLocaleDateString('pt-BR')}</td>
                  <td className="td-config">
                    <button className="btn-link-edit" onClick={() => navegarParaEdicao(proj)}>Editar</button>
                    <span className="divisor">/</span>
                    <button className="btn-link-del" onClick={() => abrirModalExcluir(proj.id, proj.name)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(subAba === "cadastro" || subAba === "editar") && (
        <div className="view-cadastro-membro" style={{ padding: 0 }}>
          <button className="btn-back-circle-admin" onClick={() => setSubAba("lista")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#df8a43" strokeWidth="3">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="titulo-central-admin">
            {subAba === "cadastro" ? "Criar Projeto" : "Editar Projeto"}
          </h1>

          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-row-admin">
              <div className="form-group">
                <label>Nome do Projeto</label>
                <input type="text" className="input-admin" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="input-admin" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="PLANNING">Planejamento</option>
                  <option value="IN_PROGRESS">Em andamento</option>
                  <option value="DONE">Concluído</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>
            </div>
            
            <div className="form-row-admin">
              <div className="form-group" style={{ width: "100%" }}>
                <label>Descrição</label>
                <input type="text" className="input-admin" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
            </div>

            <div className="form-row-admin">
              <div className="form-group">
                <label>Data de Início</label>
                <input type="date" className="input-admin" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Data de Fim (Opcional)</label>
                <input type="date" className="input-admin" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>

            <button type="submit" className="btn-submit-admin">
              {subAba === "cadastro" ? "Criar Projeto" : "Salvar Alterações"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestaoProjetos;