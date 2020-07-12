const router = require("express").Router();
const article = require("./../models/article.js");
const db = require("./../models");

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


