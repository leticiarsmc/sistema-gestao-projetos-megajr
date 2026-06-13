const API_URL = "http://localhost:3000";

async function getDashboardSummary() {
  const response = await fetch(`${API_URL}/dashboard/summary`);

  if (!response.ok) {
    throw new Error("Erro ao buscar resumo do dashboard");
  }

  return response.json();
}

export { getDashboardSummary };