var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    a: {
        type:String,
        required:true
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
      }]
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;