const API_URL = "http://localhost:3000";

export async function getMembers() {
  const response = await fetch(`${API_URL}/members`);
  if (!response.ok) {
    throw new Error("Erro ao buscar membros");
  }
  return response.json();
}

export async function getMemberById(id) {
  const response = await fetch(`${API_URL}/members/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar o membro");
  }
  return response.json();
}

export async function createMember(data) {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar membro");
  }
  
  return response.json();
}

export async function updateMember(id, data) {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao atualizar membro");
  }
  
  return response.json();
}

export async function deleteMember(id) {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Erro ao deletar membro");
  }
  
  return true; 
}