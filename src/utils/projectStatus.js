export const projectStatusLabels = {
  PLANNING: "Planejamento",
  IN_PROGRESS: "Em andamento",
  DONE: "Concluído",
  CANCELLED: "Cancelado",
};

export function formatProjectStatus(status) {
  return projectStatusLabels[status] || status;
}
