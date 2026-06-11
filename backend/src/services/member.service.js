const prisma = require('../lib/prisma');

async function createMember(data) {
  return prisma.member.create({
    data: {
      name: data.name,
      email: data.email,
      position: data.position,
      skills: data.skills || [],
    },
  });
}

async function getAllMembers() {
  return prisma.member.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function getMemberById(id) {
  return prisma.member.findUnique({
    where: {
      id,
    },
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
  return prisma.member.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      email: data.email,
      position: data.position,
      skills: data.skills,
    },
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