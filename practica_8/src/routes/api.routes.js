const router = require("express").Router();

// Define your routes here
router.use("/posts", require("./api/post.routes"));
router.use("/authors", require("./api/authors.routes"));

module.exports = router;
