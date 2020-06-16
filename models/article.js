const orm = require("./../config/orm.js");
const article = {
    create: function(cols, vals, cb){
        orm.create("articles", cols, vals, function(res){
            cb(res);
        });
    }
};