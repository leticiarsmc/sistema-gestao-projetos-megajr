const projectService = require('../services/project.service');

async function createProject(req, res) {
  try {
    const project = await projectService.createProject(req.body);

    return res.status(201).json(project);
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: 'Erro ao criar projeto',
      error: error.message,
    });
  }
}

async function getAllProjects(req, res) {
  try {
    const projects = await projectService.getAllProjects();

    return res.json(projects);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar projetos',
      error: error.message,
    });
  }
}

async function getProjectById(req, res) {
  try {
    const { id } = req.params;

    const project = await projectService.getProjectById(id);

    if (!project) {
      return res.status(404).json({
        message: 'Projeto não encontrado',
      });
    }

    return res.json(project);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar projeto',
      error: error.message,
    });
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;

    const projectExists = await projectService.getProjectById(id);

    if (!projectExists) {
      return res.status(404).json({
        message: 'Projeto não encontrado',
      });
    }

    const project = await projectService.updateProject(
      id,
      req.body
    );

    return res.json(project);
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: 'Erro ao atualizar projeto',
      error: error.message,
    });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const projectExists = await projectService.getProjectById(id);

    if (!projectExists) {
      return res.status(404).json({
        message: 'Projeto não encontrado',
      });
    }

    await projectService.deleteProject(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao remover projeto',
      error: error.message,
    });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};