const express = require('express');

const memberController = require('../controllers/member.controller');

const router = express.Router();

router.post('/', memberController.createMember);
router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;