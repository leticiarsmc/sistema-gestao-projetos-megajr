require('dotenv').config();
const prisma = require('../src/lib/prisma');

// ======================================
// USUÁRIOS DO SISTEMA
// ======================================
// ADMIN e DIRECTOR sem memberId
// Cada membro recebe seu próprio user com memberId único

const users = [
  // -------- ACESSOS PRIVILEGIADOS --------
  {
    name: 'Administrador',
    email: 'admin@megajr.com',
    password: '123456',
    role: 'ADMIN',
    memberEmail: null,
  },
  {
    name: 'Diretor Mega',
    email: 'diretor@megajr.com',
    password: '123456',
    role: 'DIRECTOR',
    memberEmail: null,
  },

  // -------- ACESSOS DOS MEMBROS --------
  {
    name: 'Samyr',
    email: 'samyr@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'samyr@megajr.com',
  },
  {
    name: 'Yan',
    email: 'yan@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'yan@megajr.com',
  },
  {
    name: 'Letícia',
    email: 'leticia@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'leticia@megajr.com',
  },
  {
    name: 'Elias',
    email: 'elias@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'elias@megajr.com',
  },
  {
    name: 'Ana Clara',
    email: 'anaclara@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'anaclara@megajr.com',
  },
  {
    name: 'Pedro H.',
    email: 'pedroh@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'pedroh@megajr.com',
  },
  {
    name: 'Mariana S.',
    email: 'marianas@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'marianas@megajr.com',
  },
  {
    name: 'João Victor',
    email: 'joaovictor@megajr.com',
    password: '123456',
    role: 'MEMBER',
    memberEmail: 'joaovictor@megajr.com',
  },

  {
    name: 'Mariana',
    email: 'mariana.manager@megajr.com',
    password: '123456',
    role: 'MANAGER',
    memberEmail: 'marianas@megajr.com',
  }
  
];

const members = [
  {
    name: 'Samyr',
    email: 'samyr@megajr.com',
    position: 'Front-end',
    skills: ['React', 'Interface', 'Responsividade'],
  },
  {
    name: 'Yan',
    email: 'yan@megajr.com',
    position: 'Design',
    skills: ['UI/UX', 'Figma', 'Prototipação'],
  },
  {
    name: 'Letícia',
    email: 'leticia@megajr.com',
    position: 'Back-end',
    skills: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
  },
  {
    name: 'Elias',
    email: 'elias@megajr.com',
    position: 'Back-end',
    skills: ['Node.js', 'API REST', 'Integração'],
  },
  {
    name: 'Ana Clara',
    email: 'anaclara@megajr.com',
    position: 'Full Stack',
    skills: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Pedro H.',
    email: 'pedroh@megajr.com',
    position: 'QA',
    skills: ['Testes', 'Automação', 'Qualidade'],
  },
  {
    name: 'Mariana S.',
    email: 'marianas@megajr.com',
    position: 'UI/UX',
    skills: ['Figma', 'UI/UX', 'Design System'],
  },
  {
    name: 'João Victor',
    email: 'joaovictor@megajr.com',
    position: 'Product Owner',
    skills: ['Gestão de Produto', 'Scrum', 'Backlog'],
  },
];

const projects = [
  {
    name: 'Mega Junior',
    description:
      'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-06-30'),
    status: 'IN_PROGRESS',
  },
  {
    name: 'Portal Institucional',
    description:
      'Portal institucional para divulgação de projetos e conteúdos da Mega Jr.',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-09-30'),
    status: 'PLANNING',
  },
  {
    name: 'Dashboard de Indicadores',
    description:
      'Dashboard de indicadores e métricas de desempenho dos projetos da Mega Jr.',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-08-31'),
    status: 'IN_PROGRESS',
  },
  {
    name: 'App Interno',
    description:
      'Aplicativo interno para gestão de tarefas e comunicação entre membros da Mega Jr.',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-05-30'),
    status: 'DONE',
  },
  {
    name: 'Sistema de Chamados',
    description:
      'Sistema de abertura e acompanhamento de chamados internos da Mega Jr.',
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-08-31'),
    status: 'IN_PROGRESS',
  },
];

const allocations = [
  // Samyr (4 projetos)
  {
    email: 'samyr@megajr.com',
    project: 'Mega Junior',
    responsibility: 'Front-end',
  },
  {
    email: 'samyr@megajr.com',
    project: 'Portal Institucional',
    responsibility: 'Front-end',
  },
  {
    email: 'samyr@megajr.com',
    project: 'Dashboard de Indicadores',
    responsibility: 'Front-end',
  },
  {
    email: 'samyr@megajr.com',
    project: 'Sistema de Chamados',
    responsibility: 'Front-end',
  },

  // Yan (3 projetos)
  {
    email: 'yan@megajr.com',
    project: 'Mega Junior',
    responsibility: 'Design',
  },
  {
    email: 'yan@megajr.com',
    project: 'Portal Institucional',
    responsibility: 'UI/UX',
  },
  {
    email: 'yan@megajr.com',
    project: 'Dashboard de Indicadores',
    responsibility: 'Design System',
  },

  // Letícia (3 projetos)
  {
    email: 'leticia@megajr.com',
    project: 'Mega Junior',
    responsibility: 'Back-end',
  },
  {
    email: 'leticia@megajr.com',
    project: 'Dashboard de Indicadores',
    responsibility: 'API',
  },
  {
    email: 'leticia@megajr.com',
    project: 'Sistema de Chamados',
    responsibility: 'Arquitetura Backend',
  },

  // Elias (1 projeto apenas 😎)
  {
    email: 'elias@megajr.com',
    project: 'Mega Junior',
    responsibility: 'Integração Backend',
  },

  // Ana Clara (2 projetos)
  {
    email: 'anaclara@megajr.com',
    project: 'Dashboard de Indicadores',
    responsibility: 'Full Stack',
  },
  {
    email: 'anaclara@megajr.com',
    project: 'Portal Institucional',
    responsibility: 'Full Stack',
  },

  // Pedro (1 projeto)
  {
    email: 'pedroh@megajr.com',
    project: 'App Interno',
    responsibility: 'QA',
  },

  // Mariana (2 projetos)
  {
    email: 'marianas@megajr.com',
    project: 'Portal Institucional',
    responsibility: 'UI/UX',
  },
  {
    email: 'marianas@megajr.com',
    project: 'Mega Junior',
    responsibility: 'Design System',
  },

  // João Victor (2 projetos)
  {
    email: 'joaovictor@megajr.com',
    project: 'Sistema de Chamados',
    responsibility: 'Product Owner',
  },
  {
    email: 'joaovictor@megajr.com',
    project: 'Mega Junior',
    responsibility: 'Gestão do Produto',
  },
];

async function main() {
  const memberByEmail = {};

  for (const member of members) {
    const record = await prisma.member.upsert({
      where: { email: member.email },
      update: {
        name: member.name,
        position: member.position,
        skills: member.skills,
      },
      create: member,
    });

    memberByEmail[member.email] = record;
  }

  for (const user of users) {
    const member = user.memberEmail ? memberByEmail[user.memberEmail] : null;

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        name: user.name,
        role: user.role,
        memberId: member ? member.id : null,
        password: user.password,
      },
      create: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        memberId: member ? member.id : null,
      },
    });
  }

  const projectByName = {};

  for (const projectData of projects) {
    let project = await prisma.project.findFirst({
      where: { name: projectData.name },
    });

    if (!project) {
      project = await prisma.project.create({ data: projectData });
    }

    projectByName[projectData.name] = project;
  }

  for (const allocation of allocations) {
    const member = memberByEmail[allocation.email];
    const project = projectByName[allocation.project];

    await prisma.allocation.upsert({
      where: {
        memberId_projectId: {
          memberId: member.id,
          projectId: project.id,
        },
      },
      update: {
        responsibility: allocation.responsibility,
      },
      create: {
        memberId: member.id,
        projectId: project.id,
        responsibility: allocation.responsibility,
      },
    });
  }

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((error) => {
    console.error('Erro ao executar o seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });