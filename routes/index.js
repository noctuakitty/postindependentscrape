var router = require("express").Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/", function (req, res) {
    res.render("index.handlebars");
});

router.get("/scrape", function (req, res) {
            let results = [];
            axios.get("https://www.postindependent.com/").then(function (response) {
                    $ = cheerio.load(response.data);
                    $("article").each((i, element) => {
                            var title = $(element).find("h6").text();
                            var a = $(element).find("a").attr("href");
                            if (a && title) {
                                results.push({
                                    title: title,
                                    a: a
                                });
                            }
                    }); 
                    console.log(results);
                    res.render("index", {
                    scrapedResults: results
                });
            });
        });

router.post("/saved", function(req, res){
    db.Article.create(req.body).then((dbModel)=> res.json(dbModel)).catch((error)=>res.status(422).json(error));
});
router.get("/saved", function(req, res){
    db.Article.find().lean().then((dbModel)=>{
        res.render("saved", {savedArticles:dbModel});

    }).catch((error)=>res.status(422).json(error));
});

router.post("/saved/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{note: dbNote._id} }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
})

module.exports = router;