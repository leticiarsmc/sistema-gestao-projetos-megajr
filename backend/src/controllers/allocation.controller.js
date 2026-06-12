const allocationService = require('../services/allocation.service');

async function createAllocation(req, res) {
  try {
    const allocation =
      await allocationService.createAllocation(req.body);

    return res.status(201).json(allocation);
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: 'Erro ao criar alocação',
      error: error.message,
    });
  }
}

async function getAllAllocations(req, res) {
  try {
    const allocations =
      await allocationService.getAllAllocations();

    return res.json(allocations);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar alocações',
      error: error.message,
    });
  }
}

async function getAllocationById(req, res) {
  try {
    const allocation =
      await allocationService.getAllocationById(
        req.params.id
      );

    if (!allocation) {
      return res.status(404).json({
        message: 'Alocação não encontrada',
      });
    }

    return res.json(allocation);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar alocação',
      error: error.message,
    });
  }
}

async function updateAllocation(req, res) {
  try {
    const allocation =
      await allocationService.getAllocationById(
        req.params.id
      );

    if (!allocation) {
      return res.status(404).json({
        message: 'Alocação não encontrada',
      });
    }

    const updated =
      await allocationService.updateAllocation(
        req.params.id,
        req.body
      );

    return res.json(updated);
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: 'Erro ao atualizar alocação',
      error: error.message,
    });
  }
}

async function deleteAllocation(req, res) {
  try {
    const allocation =
      await allocationService.getAllocationById(
        req.params.id
      );

    if (!allocation) {
      return res.status(404).json({
        message: 'Alocação não encontrada',
      });
    }

    await allocationService.deleteAllocation(
      req.params.id
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao remover alocação',
      error: error.message,
    });
  }
}

module.exports = {
  createAllocation,
  getAllAllocations,
  getAllocationById,
  updateAllocation,
  deleteAllocation,
};