const prisma = require('../lib/prisma');

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isEmpty(value) {
  return !value || value.trim() === '';
}

function validateCreateMemberData(data) {
  if (isEmpty(data.name)) {
    throw createError('Nome é obrigatório');
  }

  if (isEmpty(data.email)) {
    throw createError('E-mail é obrigatório');
  }

  if (isEmpty(data.position)) {
    throw createError('Cargo é obrigatório');
  }

  if (data.skills !== undefined && !Array.isArray(data.skills)) {
    throw createError('Skills deve ser uma lista');
  }
}

function validateUpdateMemberData(data) {
  if (data.name !== undefined && isEmpty(data.name)) {
    throw createError('Nome não pode ser vazio');
  }

  if (data.email !== undefined && isEmpty(data.email)) {
    throw createError('E-mail não pode ser vazio');
  }

  if (data.position !== undefined && isEmpty(data.position)) {
    throw createError('Cargo não pode ser vazio');
  }

  if (data.skills !== undefined && !Array.isArray(data.skills)) {
    throw createError('Skills deve ser uma lista');
  }
}

async function emailAlreadyExists(email, memberIdToIgnore) {
  const member = await prisma.member.findUnique({
    where: {
      email,
    },
  });

  if (!member) {
    return false;
  }

  return member.id !== memberIdToIgnore;
}

async function createMember(data) {
  validateCreateMemberData(data);

  const email = data.email.trim();

  const duplicatedEmail = await emailAlreadyExists(email);

  if (duplicatedEmail) {
    throw createError('Já existe um membro cadastrado com este e-mail', 409);
  }

  return prisma.member.create({
    data: {
      name: data.name.trim(),
      email,
      position: data.position.trim(),
      skills: data.skills || [],
    },
  });
}

async function getAllMembers() {
  return prisma.member.findMany({
    include: {
      allocations: {
        include: {
          project: true,
        },
      },
    },
  });
}

async function getMemberById(id) {
  return prisma.member.findUnique({
    where: { id },
    include: {
      allocations: {
        include: {
          project: true,
        },
      },
    },
  });
}

async function updateMember(id, data) {
  validateUpdateMemberData(data);

  const updateData = {};

  if (data.name !== undefined) {
    updateData.name = data.name.trim();
  }

  if (data.email !== undefined) {
    const email = data.email.trim();

    const duplicatedEmail = await emailAlreadyExists(email, id);

    if (duplicatedEmail) {
      throw createError('Já existe um membro cadastrado com este e-mail', 409);
    }

    updateData.email = email;
  }

  if (data.position !== undefined) {
    updateData.position = data.position.trim();
  }

  if (data.skills !== undefined) {
    updateData.skills = data.skills;
  }

  return prisma.member.update({
    where: {
      id,
    },
    data: updateData,
  });
}

async function deleteMember(id) {
  return prisma.member.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};