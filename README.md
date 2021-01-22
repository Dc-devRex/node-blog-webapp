# node-blog-webapp
Web app built with Node and Express, which allows a user to create a new blog post, and renders it to the home page dynamically

In order to run this project, you will need to run the express server by cd-ing into the project folder after cloning, and
typing "node app.js" in your terminal. You can also download Nodemon using npm, and run "nodemon ." to run the express server

From there you will be greeted by a simple hompage with Lorem ipsum filler.
The true magic happens when you click on the "Compose new post" button.

This will then lead you to the "/compose" route, where you will be able to create you first blog post. After you publish your post, you will
be redirected to your hompage where you will be able to see a shortened version of your post. By clicking "Read More" you will be redirected to a dynamically rendered
page for the selected blog post.

You can repeat the entire process with each blog post you create
