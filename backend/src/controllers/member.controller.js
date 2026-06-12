const memberService = require('../services/member.service');

async function createMember(req, res) {
  try {
    const member = await memberService.createMember(req.body);

    return res.status(201).json(member);
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: 'Erro ao criar membro',
      error: error.message,
    });
  }
}

async function getAllMembers(req, res) {
  try {
    const members = await memberService.getAllMembers();

    return res.json(members);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar membros',
      error: error.message,
    });
  }
}

async function getMemberById(req, res) {
  try {
    const { id } = req.params;

    const member = await memberService.getMemberById(id);

    if (!member) {
      return res.status(404).json({
        message: 'Membro não encontrado',
      });
    }

    return res.json(member);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar membro',
      error: error.message,
    });
  }
}

async function updateMember(req, res) {
  try {
    const { id } = req.params;

    const memberExists = await memberService.getMemberById(id);

    if (!memberExists) {
      return res.status(400).json({
        message: 'Membro não encontrado',
      });
    }

    const member = await memberService.updateMember(id, req.body);

    return res.json(member);
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: 'Erro ao atualizar membro',
      error: error.message,
    });
  }
}

async function deleteMember(req, res) {
  try {
    const { id } = req.params;

    const memberExists = await memberService.getMemberById(id);

    if (!memberExists) {
      return res.status(404).json({
        message: 'Membro não encontrado',
      });
    }

    await memberService.deleteMember(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message: 'Erro ao remover membro',
      error: error.message,
    });
  }
}

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};