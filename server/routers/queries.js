const express = require('express');
const {getAllQueries, getOneQuery, createQuery} = require('../controllers/queryController');
const router = express.Router()

router.get('/', getAllQueries);
router.get('/:id', getOneQuery);
router.post('/add',createQuery);

module.exports = router;