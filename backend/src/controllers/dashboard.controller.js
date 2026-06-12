const dashboardService = require('../services/dashboard.service');

async function getDashboardSummary(req, res) {
  try {
    const summary = await dashboardService.getDashboardSummary();

    return res.json(summary);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar dados do dashboard',
      error: error.message,
    });
  }
}

module.exports = {
  getDashboardSummary,
};