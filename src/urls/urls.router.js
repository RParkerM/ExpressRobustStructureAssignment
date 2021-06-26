const router = require("express").Router();
const usesRouter = require("../uses/uses.router");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { list, read, create, update, urlExists } = require("./urls.controller");

router.route("/").get(list).post(create).all(methodNotAllowed);
router.use("/:urlId/uses", urlExists, usesRouter);
router.route("/:urlId").get(read).put(update).all(methodNotAllowed);

module.exports = router;
