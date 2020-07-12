require ("./models/article");


$("#savebutton").on("click", function(){
    console.log("hello world");
    var saved = $('#titleID').val();
    console.log(saved);
    var links = $('#linkID').val();
    console.log(links);
});
// create object from title and link
// post to routes articles.js
// articles.js post endpoint is mapped to scrapedcontroller.create which saves to database
// 