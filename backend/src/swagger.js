const swaggerUi = require('swagger-ui-express');

const examples = {
  member: {
    id: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
    name: 'Pedro H.',
    email: 'pedroh@megajr.com',
    position: 'QA',
    skills: ['Testes', 'Qualidade'],
    createdAt: '2026-06-13T08:38:45.415Z',
    updatedAt: '2026-06-13T08:38:45.415Z',
    allocations: [],
  },

  project: {
    id: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
    name: 'Mega Junior',
    description:
      'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
    startDate: '2026-06-01T00:00:00.000Z',
    endDate: '2026-06-30T00:00:00.000Z',
    status: 'IN_PROGRESS',
    createdAt: '2026-06-13T08:38:45.415Z',
    updatedAt: '2026-06-13T08:38:45.415Z',
    allocations: [],
  },

  allocation: {
    id: 'c2f4a621-7d13-46b6-9df4-3407a2c3f111',
    memberId: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
    projectId: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
    responsibility: 'Back-end',
    createdAt: '2026-06-13T08:38:45.415Z',
    updatedAt: '2026-06-13T08:38:45.415Z',
    member: {
      id: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
      name: 'Letícia',
      email: 'leticia@megajr.com',
      position: 'Back-end',
      skills: ['Node.js', 'Prisma'],
    },
    project: {
      id: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
      name: 'Mega Junior',
      description:
        'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
      startDate: '2026-06-01T00:00:00.000Z',
      endDate: '2026-06-30T00:00:00.000Z',
      status: 'IN_PROGRESS',
    },
  },

  dashboardSummary: {
    totalMembers: 8,
    totalProjects: 5,
    totalActiveProjects: 3,
    freeMembers: 2,
    normalMembers: 6,
    overloadedMembers: 0,
    membersWorkload: [
      {
        memberId: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
        name: 'Pedro H.',
        position: 'QA',
        activeProjects: 0,
        workloadStatus: 'FREE',
        color: 'GREEN',
      },
      {
        memberId: '8e44d3f9-7d45-4e8e-a16f-8e1c9e221111',
        name: 'Letícia',
        position: 'Back-end',
        activeProjects: 1,
        workloadStatus: 'NORMAL',
        color: 'YELLOW',
      },
    ],
  },
};

function jsonResponse(description, schema, example) {
  return {
    description,
    content: {
      'application/json': {
        schema,
        example,
      },
    },
  };
}

function jsonExamplesResponse(description, schema, responseExamples) {
  return {
    description,
    content: {
      'application/json': {
        schema,
        examples: responseExamples,
      },
    },
  };
}

function requestBody(schema, example) {
  return {
    required: true,
    content: {
      'application/json': {
        schema,
        example,
      },
    },
  };
}

const swaggerDocument = {
  openapi: '3.0.0',

  info: {
    title: 'API Mega Jr - Gestão de Projetos',
    version: '1.0.0',
    description:
      'Documentação simples da API de membros, projetos, alocações e dashboard.',
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],

  tags: [
    {
      name: 'Status',
      description: 'Rotas básicas para verificar se a API está funcionando.',
    },
    {
      name: 'Membros',
      description: 'Cadastro, listagem, edição e remoção de membros.',
    },
    {
      name: 'Projetos',
      description: 'Cadastro, listagem, edição e remoção de projetos.',
    },
    {
      name: 'Alocações',
      description: 'Alocação de membros em projetos.',
    },
    {
      name: 'Dashboard',
      description: 'Resumo operacional e carga de trabalho dos membros.',
    },
  ],

  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verifica se a API está rodando',
        responses: {
          200: jsonResponse(
            'API respondendo normalmente.',
            { $ref: '#/components/schemas/MessageResponse' },
            {
              message: 'rodando',
            }
          ),
        },
      },
    },

    '/health': {
      get: {
        tags: ['Status'],
        summary: 'Health check da API',
        responses: {
          200: jsonResponse(
            'Status da API.',
            { $ref: '#/components/schemas/HealthResponse' },
            {
              status: 'ok',
              message: 'API Mega Jr rodando',
            }
          ),
        },
      },
    },

    '/members': {
      get: {
        tags: ['Membros'],
        summary: 'Lista todos os membros',
        responses: {
          200: jsonResponse(
            'Lista de membros cadastrados.',
            {
              type: 'array',
              items: { $ref: '#/components/schemas/Member' },
            },
            [examples.member]
          ),
          500: jsonResponse(
            'Erro interno ao listar membros.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao listar membros',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },

      post: {
        tags: ['Membros'],
        summary: 'Cria um novo membro',
        requestBody: requestBody(
          { $ref: '#/components/schemas/MemberInput' },
          {
            name: 'Pedro H.',
            email: 'pedroh@megajr.com',
            position: 'QA',
            skills: ['Testes', 'Qualidade'],
          }
        ),
        responses: {
          201: jsonResponse(
            'Membro criado com sucesso.',
            { $ref: '#/components/schemas/Member' },
            examples.member
          ),
          400: jsonExamplesResponse(
            'Dados inválidos ou erro de validação.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              nomeObrigatorio: {
                summary: 'Nome obrigatório',
                value: {
                  message: 'Erro ao criar membro',
                  error: 'Nome é obrigatório',
                },
              },
              emailObrigatorio: {
                summary: 'E-mail obrigatório',
                value: {
                  message: 'Erro ao criar membro',
                  error: 'E-mail é obrigatório',
                },
              },
              cargoObrigatorio: {
                summary: 'Cargo obrigatório',
                value: {
                  message: 'Erro ao criar membro',
                  error: 'Cargo é obrigatório',
                },
              },
              skillsInvalidas: {
                summary: 'Skills inválidas',
                value: {
                  message: 'Erro ao criar membro',
                  error: 'Skills deve ser uma lista',
                },
              },
            }
          ),
          409: jsonResponse(
            'Conflito de dados, como e-mail já cadastrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao criar membro',
              error: 'Já existe um membro cadastrado com este e-mail',
            }
          ),
        },
      },
    },

    '/members/{id}': {
      get: {
        tags: ['Membros'],
        summary: 'Busca um membro pelo id',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        responses: {
          200: jsonResponse(
            'Membro encontrado.',
            { $ref: '#/components/schemas/Member' },
            examples.member
          ),
          404: jsonResponse(
            'Membro não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Membro não encontrado',
            }
          ),
          500: jsonResponse(
            'Erro interno ao buscar membro.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao buscar membro',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },

      put: {
        tags: ['Membros'],
        summary: 'Atualiza um membro',
        description:
          'Permite atualização parcial. Envie apenas os campos que deseja alterar.',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        requestBody: requestBody(
          { $ref: '#/components/schemas/MemberUpdateInput' },
          {
            name: 'Pedro H.',
            email: 'pedroh@megajr.com',
            position: 'QA',
            skills: ['Testes', 'Qualidade'],
          }
        ),
        responses: {
          200: jsonResponse(
            'Membro atualizado com sucesso.',
            { $ref: '#/components/schemas/Member' },
            examples.member
          ),
          400: jsonExamplesResponse(
            'Dados inválidos ou membro não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              nomeVazio: {
                summary: 'Nome vazio',
                value: {
                  message: 'Erro ao atualizar membro',
                  error: 'Nome não pode ser vazio',
                },
              },
              emailVazio: {
                summary: 'E-mail vazio',
                value: {
                  message: 'Erro ao atualizar membro',
                  error: 'E-mail não pode ser vazio',
                },
              },
              cargoVazio: {
                summary: 'Cargo vazio',
                value: {
                  message: 'Erro ao atualizar membro',
                  error: 'Cargo não pode ser vazio',
                },
              },
              skillsInvalidas: {
                summary: 'Skills inválidas',
                value: {
                  message: 'Erro ao atualizar membro',
                  error: 'Skills deve ser uma lista',
                },
              },
              membroNaoEncontrado: {
                summary: 'Membro não encontrado',
                value: {
                  message: 'Membro não encontrado',
                },
              },
            }
          ),
          409: jsonResponse(
            'Conflito de dados, como e-mail já cadastrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao atualizar membro',
              error: 'Já existe um membro cadastrado com este e-mail',
            }
          ),
        },
      },

      delete: {
        tags: ['Membros'],
        summary: 'Remove um membro',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        responses: {
          204: {
            description: 'Membro removido com sucesso. Sem conteúdo no corpo da resposta.',
          },
          404: jsonResponse(
            'Membro não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Membro não encontrado',
            }
          ),
          400: jsonResponse(
            'Erro ao remover membro.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao remover membro',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },
    },

    '/projects': {
      get: {
        tags: ['Projetos'],
        summary: 'Lista todos os projetos',
        responses: {
          200: jsonResponse(
            'Lista de projetos cadastrados.',
            {
              type: 'array',
              items: { $ref: '#/components/schemas/Project' },
            },
            [examples.project]
          ),
          500: jsonResponse(
            'Erro interno ao listar projetos.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao listar projetos',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },

      post: {
        tags: ['Projetos'],
        summary: 'Cria um novo projeto',
        requestBody: requestBody(
          { $ref: '#/components/schemas/ProjectInput' },
          {
            name: 'Mega Junior',
            description:
              'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
            startDate: '2026-06-01T00:00:00.000Z',
            endDate: '2026-06-30T00:00:00.000Z',
            status: 'IN_PROGRESS',
          }
        ),
        responses: {
          201: jsonResponse(
            'Projeto criado com sucesso.',
            { $ref: '#/components/schemas/Project' },
            examples.project
          ),
          400: jsonExamplesResponse(
            'Dados inválidos ou erro de validação.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              nomeObrigatorio: {
                summary: 'Nome obrigatório',
                value: {
                  message: 'Erro ao criar projeto',
                  error: 'Nome é obrigatório',
                },
              },
              descricaoObrigatoria: {
                summary: 'Descrição obrigatória',
                value: {
                  message: 'Erro ao criar projeto',
                  error: 'Descrição é obrigatória',
                },
              },
              dataInicioObrigatoria: {
                summary: 'Data de início obrigatória',
                value: {
                  message: 'Erro ao criar projeto',
                  error: 'Data de início é obrigatória',
                },
              },
            }
          ),
        },
      },
    },

    '/projects/{id}': {
      get: {
        tags: ['Projetos'],
        summary: 'Busca um projeto pelo id',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        responses: {
          200: jsonResponse(
            'Projeto encontrado.',
            { $ref: '#/components/schemas/Project' },
            examples.project
          ),
          404: jsonResponse(
            'Projeto não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Projeto não encontrado',
            }
          ),
          500: jsonResponse(
            'Erro interno ao buscar projeto.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao buscar projeto',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },

      put: {
        tags: ['Projetos'],
        summary: 'Atualiza um projeto',
        description:
          'Permite atualização parcial. Envie apenas os campos que deseja alterar.',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        requestBody: requestBody(
          { $ref: '#/components/schemas/ProjectUpdateInput' },
          {
            name: 'Mega Junior',
            description:
              'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
            startDate: '2026-06-01T00:00:00.000Z',
            endDate: '2026-06-30T00:00:00.000Z',
            status: 'IN_PROGRESS',
          }
        ),
        responses: {
          200: jsonResponse(
            'Projeto atualizado com sucesso.',
            { $ref: '#/components/schemas/Project' },
            examples.project
          ),
          400: jsonExamplesResponse(
            'Dados inválidos ou erro de validação.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              nomeVazio: {
                summary: 'Nome vazio',
                value: {
                  message: 'Erro ao atualizar projeto',
                  error: 'Nome não pode ser vazio',
                },
              },
              descricaoVazia: {
                summary: 'Descrição vazia',
                value: {
                  message: 'Erro ao atualizar projeto',
                  error: 'Descrição não pode ser vazia',
                },
              },
            }
          ),
          404: jsonResponse(
            'Projeto não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Projeto não encontrado',
            }
          ),
        },
      },

      delete: {
        tags: ['Projetos'],
        summary: 'Remove um projeto',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        responses: {
          204: {
            description: 'Projeto removido com sucesso. Sem conteúdo no corpo da resposta.',
          },
          404: jsonResponse(
            'Projeto não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Projeto não encontrado',
            }
          ),
          400: jsonResponse(
            'Erro ao remover projeto.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao remover projeto',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },
    },

    '/allocations': {
      get: {
        tags: ['Alocações'],
        summary: 'Lista todas as alocações',
        responses: {
          200: jsonResponse(
            'Lista de alocações cadastradas.',
            {
              type: 'array',
              items: { $ref: '#/components/schemas/Allocation' },
            },
            [examples.allocation]
          ),
          500: jsonResponse(
            'Erro interno ao listar alocações.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao listar alocações',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },

      post: {
        tags: ['Alocações'],
        summary: 'Cria uma nova alocação',
        requestBody: requestBody(
          { $ref: '#/components/schemas/AllocationInput' },
          {
            memberId: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
            projectId: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
            responsibility: 'Back-end',
          }
        ),
        responses: {
          201: jsonResponse(
            'Alocação criada com sucesso.',
            { $ref: '#/components/schemas/Allocation' },
            examples.allocation
          ),
          400: jsonExamplesResponse(
            'Dados inválidos, erro de validação ou alocação duplicada.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              membroObrigatorio: {
                summary: 'Membro obrigatório',
                value: {
                  message: 'Erro ao criar alocação',
                  error: 'Membro é obrigatório',
                },
              },
              projetoObrigatorio: {
                summary: 'Projeto obrigatório',
                value: {
                  message: 'Erro ao criar alocação',
                  error: 'Projeto é obrigatório',
                },
              },
              responsabilidadeObrigatoria: {
                summary: 'Responsabilidade obrigatória',
                value: {
                  message: 'Erro ao criar alocação',
                  error: 'Responsabilidade é obrigatória',
                },
              },
              alocacaoDuplicada: {
                summary: 'Alocação duplicada',
                value: {
                  message: 'Erro ao criar alocação',
                  error: 'Membro já está alocado neste projeto',
                },
              },
            }
          ),
          404: jsonExamplesResponse(
            'Membro ou projeto não encontrado.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              membroNaoEncontrado: {
                summary: 'Membro não encontrado',
                value: {
                  message: 'Erro ao criar alocação',
                  error: 'Membro não encontrado',
                },
              },
              projetoNaoEncontrado: {
                summary: 'Projeto não encontrado',
                value: {
                  message: 'Erro ao criar alocação',
                  error: 'Projeto não encontrado',
                },
              },
            }
          ),
        },
      },
    },

    '/allocations/{id}': {
      get: {
        tags: ['Alocações'],
        summary: 'Busca uma alocação pelo id',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        responses: {
          200: jsonResponse(
            'Alocação encontrada.',
            { $ref: '#/components/schemas/Allocation' },
            examples.allocation
          ),
          404: jsonResponse(
            'Alocação não encontrada.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Alocação não encontrada',
            }
          ),
          500: jsonResponse(
            'Erro interno ao buscar alocação.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao buscar alocação',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },

      put: {
        tags: ['Alocações'],
        summary: 'Atualiza a responsabilidade de uma alocação',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        requestBody: requestBody(
          { $ref: '#/components/schemas/AllocationUpdateInput' },
          {
            responsibility: 'Back-end',
          }
        ),
        responses: {
          200: jsonResponse(
            'Alocação atualizada com sucesso.',
            { $ref: '#/components/schemas/Allocation' },
            examples.allocation
          ),
          400: jsonResponse(
            'Dados inválidos ou erro de validação.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao atualizar alocação',
              error: 'Responsabilidade não pode ser vazia',
            }
          ),
          404: jsonResponse(
            'Alocação não encontrada.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Alocação não encontrada',
            }
          ),
        },
      },

      delete: {
        tags: ['Alocações'],
        summary: 'Remove uma alocação',
        parameters: [{ $ref: '#/components/parameters/IdParam' }],
        responses: {
          204: {
            description: 'Alocação removida com sucesso. Sem conteúdo no corpo da resposta.',
          },
          404: jsonResponse(
            'Alocação não encontrada.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Alocação não encontrada',
            }
          ),
          400: jsonResponse(
            'Erro ao remover alocação.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao remover alocação',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },
    },

    '/dashboard/summary': {
      get: {
        tags: ['Dashboard'],
        summary: 'Retorna resumo do dashboard',
        responses: {
          200: jsonResponse(
            'Resumo com totais e carga dos membros.',
            { $ref: '#/components/schemas/DashboardSummary' },
            examples.dashboardSummary
          ),
          500: jsonResponse(
            'Erro interno ao buscar dados do dashboard.',
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              message: 'Erro ao buscar dados do dashboard',
              error: 'Erro interno inesperado',
            }
          ),
        },
      },
    },
  },

  components: {
    parameters: {
      IdParam: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Identificador UUID do recurso.',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    },

    schemas: {
      MessageResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'rodando',
          },
        },
      },

      HealthResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok',
          },
          message: {
            type: 'string',
            example: 'API Mega Jr rodando',
          },
        },
      },

      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Erro ao processar a requisição',
          },
          error: {
            type: 'string',
            example: 'Detalhes do erro',
          },
        },
      },

      MemberInput: {
        type: 'object',
        required: ['name', 'email', 'position'],
        properties: {
          name: {
            type: 'string',
            example: 'Pedro H.',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'pedroh@megajr.com',
          },
          position: {
            type: 'string',
            example: 'QA',
          },
          skills: {
            type: 'array',
            items: { type: 'string' },
            example: ['Testes', 'Qualidade'],
          },
        },
      },

      MemberUpdateInput: {
        type: 'object',
        description:
          'Campos opcionais para atualização parcial de um membro.',
        properties: {
          name: {
            type: 'string',
            example: 'Pedro H.',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'pedroh@megajr.com',
          },
          position: {
            type: 'string',
            example: 'QA',
          },
          skills: {
            type: 'array',
            items: { type: 'string' },
            example: ['Testes', 'Qualidade'],
          },
        },
      },

      Member: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
          },
          name: {
            type: 'string',
            example: 'Pedro H.',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'pedroh@megajr.com',
          },
          position: {
            type: 'string',
            example: 'QA',
          },
          skills: {
            type: 'array',
            items: { type: 'string' },
            example: ['Testes', 'Qualidade'],
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-13T08:38:45.415Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-13T08:38:45.415Z',
          },
          allocations: {
            type: 'array',
            items: { type: 'object' },
            example: [],
          },
        },
      },

      ProjectInput: {
        type: 'object',
        required: ['name', 'description', 'startDate'],
        properties: {
          name: {
            type: 'string',
            example: 'Mega Junior',
          },
          description: {
            type: 'string',
            example:
              'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
          },
          startDate: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-01T00:00:00.000Z',
          },
          endDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: '2026-06-30T00:00:00.000Z',
          },
          status: {
            type: 'string',
            enum: ['PLANNING', 'IN_PROGRESS', 'DONE', 'CANCELLED'],
            example: 'IN_PROGRESS',
          },
        },
      },

      ProjectUpdateInput: {
        type: 'object',
        description:
          'Campos opcionais para atualização parcial de um projeto.',
        properties: {
          name: {
            type: 'string',
            example: 'Mega Junior',
          },
          description: {
            type: 'string',
            example:
              'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
          },
          startDate: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-01T00:00:00.000Z',
          },
          endDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: '2026-06-30T00:00:00.000Z',
          },
          status: {
            type: 'string',
            enum: ['PLANNING', 'IN_PROGRESS', 'DONE', 'CANCELLED'],
            example: 'IN_PROGRESS',
          },
        },
      },

      Project: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
          },
          name: {
            type: 'string',
            example: 'Mega Junior',
          },
          description: {
            type: 'string',
            example:
              'Sistema de gestão de projetos, membros, alocações e carga de trabalho da Mega Jr.',
          },
          startDate: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-01T00:00:00.000Z',
          },
          endDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: '2026-06-30T00:00:00.000Z',
          },
          status: {
            type: 'string',
            enum: ['PLANNING', 'IN_PROGRESS', 'DONE', 'CANCELLED'],
            example: 'IN_PROGRESS',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-13T08:38:45.415Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-13T08:38:45.415Z',
          },
          allocations: {
            type: 'array',
            items: { type: 'object' },
            example: [],
          },
        },
      },

      AllocationInput: {
        type: 'object',
        required: ['memberId', 'projectId', 'responsibility'],
        properties: {
          memberId: {
            type: 'string',
            format: 'uuid',
            example: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
          },
          projectId: {
            type: 'string',
            format: 'uuid',
            example: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
          },
          responsibility: {
            type: 'string',
            example: 'Back-end',
          },
        },
      },

      AllocationUpdateInput: {
        type: 'object',
        properties: {
          responsibility: {
            type: 'string',
            example: 'Back-end',
          },
        },
      },

      Allocation: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'c2f4a621-7d13-46b6-9df4-3407a2c3f111',
          },
          memberId: {
            type: 'string',
            format: 'uuid',
            example: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
          },
          projectId: {
            type: 'string',
            format: 'uuid',
            example: 'a7f6f123-3a7d-4c44-8b8a-7b98d1f00111',
          },
          responsibility: {
            type: 'string',
            example: 'Back-end',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-13T08:38:45.415Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-06-13T08:38:45.415Z',
          },
          member: {
            type: 'object',
            example: examples.allocation.member,
          },
          project: {
            type: 'object',
            example: examples.allocation.project,
          },
        },
      },

      DashboardSummary: {
        type: 'object',
        properties: {
          totalMembers: {
            type: 'integer',
            example: 8,
          },
          totalProjects: {
            type: 'integer',
            example: 5,
          },
          totalActiveProjects: {
            type: 'integer',
            example: 3,
          },
          freeMembers: {
            type: 'integer',
            example: 2,
          },
          normalMembers: {
            type: 'integer',
            example: 6,
          },
          overloadedMembers: {
            type: 'integer',
            example: 0,
          },
          membersWorkload: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                memberId: {
                  type: 'string',
                  format: 'uuid',
                  example: '3f8a5f64-f717-4652-b3fc-2c963f6afa5f',
                },
                name: {
                  type: 'string',
                  example: 'Pedro H.',
                },
                position: {
                  type: 'string',
                  example: 'QA',
                },
                activeProjects: {
                  type: 'integer',
                  example: 0,
                },
                workloadStatus: {
                  type: 'string',
                  enum: ['FREE', 'NORMAL', 'OVERLOADED'],
                  example: 'FREE',
                },
                color: {
                  type: 'string',
                  enum: ['GREEN', 'YELLOW', 'RED'],
                  example: 'GREEN',
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  swaggerUi,
  swaggerDocument,
};