var express = require("express");
var app = express();
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

var routes = require("./routes/index.js");
var bodyParser = require("body-parser");
app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/newsscraper", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function(){
        console.log("Connected to database.");
    }
);

app.listen(PORT, function () {
    console.log("listening on port: " + PORT);
});
