import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

function DashboardTab({ titulo = "Bem-vindo(a), Lucas!" }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="view-admin-dash">
        <h2>Carregando dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-admin-dash">
        <h2>Erro ao carregar dashboard</h2>
        <p className="dashboard-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="view-admin-dash">
      <h2>{titulo}</h2>

      <div className="dashboard-summary-grid">
        <div className="dashboard-card">
          <span>Total de membros</span>
          <strong>{summary.totalMembers}</strong>
        </div>

        <div className="dashboard-card">
          <span>Total de projetos</span>
          <strong>{summary.totalProjects}</strong>
        </div>

        <div className="dashboard-card">
          <span>Projetos ativos</span>
          <strong>{summary.totalActiveProjects}</strong>
        </div>

        <div className="dashboard-card dashboard-card-free">
          <span>Membros livres</span>
          <strong>{summary.freeMembers}</strong>
        </div>

        <div className="dashboard-card dashboard-card-normal">
          <span>Carga normal</span>
          <strong>{summary.normalMembers}</strong>
        </div>

        <div className="dashboard-card dashboard-card-overloaded">
          <span>Sobrecarregados</span>
          <strong>{summary.overloadedMembers}</strong>
        </div>
      </div>

      <div className="tabela-container-admin dashboard-workload-card">
        <h3>Termômetro de carga</h3>

        <table className="tabela-admin">
          <thead>
            <tr>
              <th>Membro</th>
              <th>Cargo</th>
              <th>Projetos ativos</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {summary.membersWorkload.map((member) => (
              <tr key={member.memberId}>
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>{member.activeProjects}</td>
                <td>
                  <span
                    className={`status-workload status-workload-${member.color.toLowerCase()}`}
                  >
                    {member.workloadStatus === "FREE" && "Livre"}
                    {member.workloadStatus === "NORMAL" && "Normal"}
                    {member.workloadStatus === "OVERLOADED" && "Sobrecarregado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTab;