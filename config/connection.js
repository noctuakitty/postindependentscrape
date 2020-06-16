const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/newsscraper", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function(){
        console.log("Connected to database.");
    }
);

// module.exports = connection;
