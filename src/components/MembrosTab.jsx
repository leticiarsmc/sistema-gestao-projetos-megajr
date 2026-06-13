import { useState, useEffect } from "react";
import { getMembers, createMember, updateMember, deleteMember } from "../services/memberService";
import avatar from "../assets/avatar.png";
import patoTriste from "../assets/patotriste.png";

const MembrosTab = () => {
  // Sub-abas locais do gerenciamento de membros: 'lista', 'cadastro' ou 'editar'
  const [subAba, setSubAba] = useState("lista");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado para o modal de confirmação de exclusão
  const [modal, setModal] = useState({ aberto: false, memberId: null, nome: "" });

  // Estado unificado para os inputs do formulário (Criar / Editar)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    position: "",
    skills: []
  });

  // Função para carregar os membros da API
  const carregarMembros = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMembros();
  }, []);

  // Handlers para o Modal de Exclusão
  const abrirModalExcluir = (id, nome) => setModal({ aberto: true, memberId: id, nome });
  const fecharModal = () => setModal({ aberto: false, memberId: null, nome: "" });

  const confirmarExclusao = async () => {
    try {
      await deleteMember(modal.memberId);
      fecharModal();
      carregarMembros(); // Atualiza a lista após deletar
    } catch (err) {
      alert(err.message);
    }
  };

  // Preparar formulário para criação
  const navegarParaCadastro = () => {
    setFormData({ id: "", name: "", email: "", position: "", skills: [] });
    setSubAba("cadastro");
  };

  // Preparar formulário para edição com os dados atuais do membro
  const navegarParaEdicao = (member) => {
    setFormData({
      id: member.id,
      name: member.name,
      email: member.email || "",
      position: member.position,
      skills: member.skills || []
    });
    setSubAba("editar");
  };

  // Envio do formulário (POST ou PUT dependendo do modo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subAba === "cadastro") {
        await createMember({
          name: formData.name,
          email: formData.email,
          position: formData.position,
          skills: formData.skills
        });
      } else {
        await updateMember(formData.id, {
          name: formData.name,
          email: formData.email,
          position: formData.position,
          skills: formData.skills
        });
      }
      setSubAba("lista");
      carregarMembros(); // Recarrega a tabela atualizada
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="membros-tab-container">
      {/* MODAL DE REMOÇÃO ESPECÍFICO DE MEMBROS */}
      {modal.aberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-pato">
              <img src={patoTriste} alt="Pato Triste" />
            </div>
            <h3>{modal.nome}</h3>
            <div className="modal-body-pergunta">
              <p>
                Deseja <span className="destaque-remover">REMOVER</span> esse membro?
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

      {/* SUB-TELA 1: LISTAGEM DE MEMBROS */}
      {subAba === "lista" && (
        <div className="tabela-container-admin">
          <div className="admin-card-header">
            <h3>Membros Cadastrados</h3>
            <button className="btn-submit-admin" onClick={navegarParaCadastro}>
              + Cadastrar Membro
            </button>
          </div>
          
          <div className="table-wrapper">
            <table className="tabela-admin">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Cargo</th>
                  <th>Config</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="4">Carregando membros...</td>
                  </tr>
                )}

                {error && (
                  <tr>
                    <td colSpan="4" style={{ color: "red" }}>{error}</td>
                  </tr>
                )}

                {!loading && !error && members.length === 0 && (
                  <tr>
                    <td colSpan="4">Nenhum membro cadastrado.</td>
                  </tr>
                )}

                {!loading && !error && members.map((member) => (
                  <tr key={member.id}>
                    <td className="td-membro">
                      <span className="cel-pessoa">
                        <img src={avatar} alt="User" /> {member.name}
                      </span>
                    </td>
                    <td>{member.email}</td>
                    <td>{member.position}</td>
                    <td className="td-config">
                      <button className="btn-link-edit" onClick={() => navegarParaEdicao(member)}>
                        Editar
                      </button>
                      <span className="divisor">/</span>
                      <button className="btn-link-del" onClick={() => abrirModalExcluir(member.id, member.name)}>
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

      {/* SUB-TELA 2: FORMULÁRIO DE CADASTRO OU EDIÇÃO */}
      {(subAba === "cadastro" || subAba === "editar") && (
        <div className="view-cadastro-membro" style={{ padding: 0 }}>
          <button className="btn-back-circle-admin" onClick={() => setSubAba("lista")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#df8a43" strokeWidth="3">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="titulo-central-admin">
            {subAba === "cadastro" ? "Mega Cadastro" : "Editar Membro"}
          </h1>

          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-row-admin">
              <div className="form-group">
                <label>Nome do membro</label>
                <input
                  type="text"
                  className="input-admin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-mail do membro</label>
                <input
                  type="email"
                  className="input-admin"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row-admin">
              <div className="form-group">
                <label>Cargo / Posição (Ex: Diretor, Dev Front-End)</label>
                <input
                  type="text"
                  className="input-admin"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-submit-admin">
              {subAba === "cadastro" ? "Criar" : "Salvar Alterações"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MembrosTab;