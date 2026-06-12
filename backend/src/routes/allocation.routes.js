const express = require('express');

const allocationController = require('../controllers/allocation.controller');

const router = express.Router();

router.post('/', allocationController.createAllocation);
router.get('/', allocationController.getAllAllocations);
router.get('/:id', allocationController.getAllocationById);
router.put('/:id', allocationController.updateAllocation);
router.delete('/:id', allocationController.deleteAllocation);

module.exports = router;