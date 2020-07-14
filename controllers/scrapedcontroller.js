var router = require("express").Router();
var article = require("./../models/article.js");
var db = require("./../models");

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = {
    router,
    create: function (req, res) {
        db.Article.create(req.body).then(function (dbArticle) {
            res.json(dbArticle);
        });
    }
};


