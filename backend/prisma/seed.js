require('dotenv').config();
const prisma = require('../src/lib/prisma');

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
  { email: 'samyr@megajr.com', project: 'Mega Junior', responsibility: 'Front-end' },
  { email: 'yan@megajr.com', project: 'Mega Junior', responsibility: 'Design' },
  { email: 'leticia@megajr.com', project: 'Mega Junior', responsibility: 'Back-end' },
  { email: 'elias@megajr.com', project: 'Mega Junior', responsibility: 'Back-end' },
  { email: 'anaclara@megajr.com', project: 'Dashboard de Indicadores', responsibility: 'Full Stack' },
  { email: 'pedroh@megajr.com', project: 'App Interno', responsibility: 'QA' },
  { email: 'marianas@megajr.com', project: 'Portal Institucional', responsibility: 'UI/UX' },
  { email: 'joaovictor@megajr.com', project: 'Sistema de Chamados', responsibility: 'Product Owner' },
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
