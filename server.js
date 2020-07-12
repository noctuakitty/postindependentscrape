const express = require("express");
const app = express();
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("view engine", "handlebars");

const routes = require("./routes/index.js");
const bodyParser = require("body-parser");
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
