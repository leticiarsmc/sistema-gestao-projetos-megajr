const API_URL = "http://localhost:3000";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error("Erro ao buscar projetos");
  }
  return response.json();
}

export async function getProjectById(id) {
  const response = await fetch(`${API_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar o projeto");
  }
  return response.json();
}

export async function createProject(data) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar projeto");
  }
  
  return response.json();
}

export async function updateProject(id, data) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao atualizar projeto");
  }
  
  return response.json();
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Erro ao deletar projeto");
  }
  
  return true; 
}