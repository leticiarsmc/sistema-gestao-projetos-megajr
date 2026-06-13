const API_URL = "http://localhost:3000";

async function getMembers() {
  const response = await fetch(`${API_URL}/members`);

  if (!response.ok) {
    throw new Error("Erro ao buscar membros");
  }

  return response.json();
}

export { getMembers };