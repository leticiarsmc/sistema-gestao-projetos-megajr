const prisma = require('../lib/prisma');

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isEmpty(value) {
  return !value || value.trim() === '';
}

function validateCreateProjectData(data) {
  if (isEmpty(data.name)) {
    throw createError('Nome é obrigatório');
  }

  if (isEmpty(data.description)) {
    throw createError('Descrição é obrigatória');
  }

  if (!data.startDate) {
    throw createError('Data de início é obrigatória');
  }
}

function validateUpdateProjectData(data) {
  if (data.name !== undefined && isEmpty(data.name)) {
    throw createError('Nome não pode ser vazio');
  }

  if (data.description !== undefined && isEmpty(data.description)) {
    throw createError('Descrição não pode ser vazia');
  }
}

async function createProject(data) {
  validateCreateProjectData(data);

  return prisma.project.create({
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      status: data.status || 'PLANNING',
    },
  });
}

async function getAllProjects() {
  return prisma.project.findMany({
    include: {
      allocations: {
        include: {
          member: true,
        },
      },
    },
  });
}

async function getProjectById(id) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      allocations: {
        include: {
          member: true,
        },
      },
    },
  });
}

async function updateProject(id, data) {
  validateUpdateProjectData(data);

  const updateData = {};

  if (data.name !== undefined) {
    updateData.name = data.name.trim();
  }

  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  if (data.startDate !== undefined) {
    updateData.startDate = new Date(data.startDate);
  }

  if (data.endDate !== undefined) {
    updateData.endDate = data.endDate
      ? new Date(data.endDate)
      : null;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  return prisma.project.update({
    where: {
      id,
    },
    data: updateData,
  });
}

async function deleteProject(id) {
  return prisma.project.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};