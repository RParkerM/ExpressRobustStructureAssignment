const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const { read, list, destroy } = require("./uses.controller");

router.route("/").get(list).all(methodNotAllowed);
router.route("/:useId").get(read).delete(destroy).all(methodNotAllowed);

module.exports = router;
