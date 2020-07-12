const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

router.get("/", function (req, res) {
    res.render("index.handlebars");
});
router.get("/scrape", function (req, res) {
            let results = [];
            axios.get("https://www.postindependent.com/").then(function (response) {
                    $ = cheerio.load(response.data);
                    $("article").each((i, element) => {
                            const title = $(element).find("h6").text()
                            const a = $(element).find("a").attr("href")
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

router.post("/articles/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{note: dbNote._id} }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
})

module.exports = router;