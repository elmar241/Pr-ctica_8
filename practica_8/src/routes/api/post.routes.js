const router = require('express').Router();
const { getAll, create, getById, update, remove } = require('../../controllers/controllers/post.controller');

// Define your routes here

router.get('/', getAll);
router.get('/:postId', getById),
router.post('/', create)
router.put('/portId', update)
router.put('/:postId', remove)

module.exports = router;
