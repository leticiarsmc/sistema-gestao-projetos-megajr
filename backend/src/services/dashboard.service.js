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

  return {
    totalMembers,
    totalProjects,
    totalActiveProjects,
    membersWorkload,
  };
}

module.exports = {
  getDashboardSummary,
};