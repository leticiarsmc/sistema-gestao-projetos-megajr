const prisma = require('../lib/prisma');

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isEmpty(value) {
  return !value || value.trim() === '';
}

async function createAllocation(data) {
  const { memberId, projectId, responsibility } = data;

  if (!memberId) {
    throw createError('Membro é obrigatório');
  }

  if (!projectId) {
    throw createError('Projeto é obrigatório');
  }

  if (isEmpty(responsibility)) {
    throw createError('Responsabilidade é obrigatória');
  }

  const member = await prisma.member.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw createError('Membro não encontrado', 404);
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw createError('Projeto não encontrado', 404);
  }

  const existingAllocation = await prisma.allocation.findFirst({
    where: {
      memberId,
      projectId,
    },
  });

  if (existingAllocation) {
    throw createError(
      'Membro já está alocado neste projeto'
    );
  }

  return prisma.allocation.create({
    data: {
      memberId,
      projectId,
      responsibility: responsibility.trim(),
    },
    include: {
      member: true,
      project: true,
    },
  });
}

async function getAllAllocations() {
  return prisma.allocation.findMany({
    include: {
      member: true,
      project: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function getAllocationById(id) {
  return prisma.allocation.findUnique({
    where: { id },
    include: {
      member: true,
      project: true,
    },
  });
}

async function updateAllocation(id, data) {
  if (
    data.responsibility !== undefined &&
    isEmpty(data.responsibility)
  ) {
    throw createError(
      'Responsabilidade não pode ser vazia'
    );
  }

  return prisma.allocation.update({
    where: { id },
    data: {
      responsibility: data.responsibility?.trim(),
    },
    include: {
      member: true,
      project: true,
    },
  });
}

async function deleteAllocation(id) {
  return prisma.allocation.delete({
    where: { id },
  });
}

module.exports = {
  createAllocation,
  getAllAllocations,
  getAllocationById,
  updateAllocation,
  deleteAllocation,
};