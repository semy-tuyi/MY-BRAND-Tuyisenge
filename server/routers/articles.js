const express = require("express");
const {getAllArticles, createNewArticle, getOneArticle, updateArticle, deleteArticle, commentingOnArticle} = require("../controllers/articleController")
const {protect} = require('../middlewares/auth')
const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getOneArticle);
router.post('/add', protect, createNewArticle);
router.patch('/update/:id', protect, updateArticle)
router.delete('/delete/:id', protect, deleteArticle)

router.post('/comment/:id',protect, commentingOnArticle)

module.exports = router;
