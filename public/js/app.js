var model = ('./models/article.js');
var index = ('./routes/index.js');

// $(".savebutton").on("click", function(){
//     console.log("hello world");
//     var titleId = $('#titleID').val();
//     console.log(titleId);
//     var linksId = $('#linkID').val();
//     console.log(linksId);
//     var thisLink = $(this).attr("href");
//    $.ajax({
//         method: "POST",
//         url: "/saved/",
//         data: {
//             title: $("#titleinput").val(),
//             body: $("#bodyinput").val()
//         }
//     }).then(function (data) {
//             console.log(data);
//         });

// });


// create object from title and link
// post to routes articles.js
// articles.js post endpoint is mapped to scrapedcontroller.create which saves to database
// 