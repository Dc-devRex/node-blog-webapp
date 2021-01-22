//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

// This will populate our home, about, and contact pages once they're rendered with EJS
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();  // create our app

app.set('view engine', 'ejs');  // Set the view engine

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));    // Tell express that our static files are in public folder

let posts = [];

app.get("/", function(req, res) {

  res.render("home", {
    starterText: homeStartingContent,
    posts: posts
  });


});

// app.get("/compose", function(req, res) {
//   res.render("compose", {

//   })
// })

app.get("/about", function(req, res) {
  
  res.render("about", {
    aboutContent: aboutContent
  });

});

app.get("/contact", function(req, res) {
  
  res.render("contact", {
    contactContent: contactContent
  });
  
});

app.get("/compose", function(req, res) {

  res.render("compose");  

});

app.get('/posts/:postName', function(req, res) {  // This is a route parameter. which makes it possible to create web pages/routes dynamically
  const requestedTitle = _.lowerCase(req.params.postName);  // This is the first step to creating a dynamic website

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);  // Make sure to store this value before comparing

    if(storedTitle === requestedTitle) {  // After creating a blog post, we pass the new blog Title as "postName" which is what we store in a const. 
        
      res.render("post", {    // What we are doing here is creating/rendering a brand new page dynamically
        postTitle: post.title,  // Now when we add /posts/{post_title}, We create a new page for our individual on the fly, dynamically
        fullPost: post.content  // We are able to render the new post title and content in our post.ejs file
      });

    }

  });

});  // This is down with nothing but Node and Express

app.post("/compose", function(req,res) {

  const post = {
    title: req.body.postTitle,   // This object is created to pass over the blog post content in compose.ejs which is triggered by a post request
    content: req.body.blogPost   // We're using a combination of Express, ejs, and body-parser here
  };

  posts.push(post);

  res.redirect("/");

});







app.listen(3000, function() {
  console.log("Server started on port 3000");  // Server as usual
});