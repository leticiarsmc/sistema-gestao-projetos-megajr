const API_URL = "http://localhost:3000";

export async function getAllAllocations() {
  const response = await fetch(`${API_URL}/allocations`);
  if (!response.ok) {
    throw new Error("Erro ao buscar alocações");
  }
  return response.json();
}

export async function getAllocationById(id) {
  const response = await fetch(`${API_URL}/allocations/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar a alocação");
  }
  return response.json();
}

export async function createAllocation(data) {
  const response = await fetch(`${API_URL}/allocations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar alocação");
  }
  
  return response.json();
}

export async function updateAllocation(id, data) {
  const response = await fetch(`${API_URL}/allocations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao atualizar alocação");
  }
  
  return response.json();
}

export async function deleteAllocation(id) {
  const response = await fetch(`${API_URL}/allocations/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Erro ao deletar alocação");
  }
  
  return true; 
}