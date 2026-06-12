const prisma = require('../lib/prisma');

async function getDashboardSummary() {
  const totalMembers = await prisma.member.count();

  const totalProjects = await prisma.project.count();

  const totalActiveProjects = await prisma.project.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });

  const members = await prisma.member.findMany({
    include: {
      allocations: {
        include: {
          project: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const membersWorkload = members.map((member) => {
    const activeProjects = member.allocations.filter((allocation) => {
      return allocation.project.status === 'IN_PROGRESS';
    }).length;

    let workloadStatus = 'FREE';
    let color = 'GREEN';

    if (activeProjects >= 3) {
      workloadStatus = 'OVERLOADED';
      color = 'RED';
    } else if (activeProjects >= 1) {
      workloadStatus = 'NORMAL';
      color = 'YELLOW';
    }

    return {
      memberId: member.id,
      name: member.name,
      position: member.position,
      activeProjects,
      workloadStatus,
      color,
    };
  });

  const freeMembers = membersWorkload.filter((member) => {
  return member.workloadStatus === 'FREE';
}).length;

const normalMembers = membersWorkload.filter((member) => {
  return member.workloadStatus === 'NORMAL';
}).length;

const overloadedMembers = membersWorkload.filter((member) => {
  return member.workloadStatus === 'OVERLOADED';
}).length;

return {
  totalMembers,
  totalProjects,
  totalActiveProjects,
  freeMembers,
  normalMembers,
  overloadedMembers,
  membersWorkload,
};
}

module.exports = {
  getDashboardSummary,
};