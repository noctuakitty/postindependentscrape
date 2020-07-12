var router = require("express").Router();
var scrapedController = require("../../controller/scrapedcontroller.js");
router.get("/:id", scrapedController.find);
router.post("/", scrapedController.create);
// ^^^ IMPORTANT ^^^ //
router.delete("/:id", scrapedController.delete);
module.exports = router;
