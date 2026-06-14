const express = require('express');
const router = express.Router();
const studentControllers = require('../controllers/studentControllers');

const {
    Studentcreate,
    StudentgetAll,
    StudentgetById,
    StudentupdateById,
    StudentdeleteById
} = require('../controllers/studentControllers');

router.post('/', Studentcreate);
router.get('/', StudentgetAll);
router.get('/:id', StudentgetById);
router.put('/:id', StudentupdateById);
router.delete('/:id', StudentdeleteById);

module.exports = router;