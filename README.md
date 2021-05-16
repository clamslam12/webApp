# webApp

social media web app for Web Application Development class

Access Here: https://clamslam12.github.io/webApp/.

The markdown document must provide a detailed description of the project, what technologies you’ve used, how the team has divided the tasks between them, the justification for design choices, installation guides, and any other details that are needed for understanding the project, its implementation, etc.

Project: Social Media

Team Member: Minh Durbin, Long Sen

Responsibility:

Final Project - All requirements working

Minh Durbin: About page, signup and client side validation using Vue.js, login and validation, sessions with validations and dynamic rendering of navigation, edit account with server-side validation, error messages and flash messages, delete account, custom error routes for 404 and 500 errors, routes management through routes directory, user in seed.js

Long Sen: This web site is server-side populated. I'm responsible for home page, explore page, notification page, profile page, and updating trending hashtag.

Assignment 4 - All requirements working

Directions: Database is locally hosted at mongodb://localhost:27017/iMedia . You can download MongoDB Compass and connect to it. The database name is "iMedia" and the collections are "users" and "posts".

Minh Durbin: Add CR actions to users, sessions/cookies, passport for handling user sign-up/sign-in, express-validator for server side validation, flash messages for user signup error/success handling.

Long Sen: I'm responseible for home page feutures:
None-loggined user can only see all posts in home page, or explore all other users in explore tab, and login in home page.
Loggined users can post and delete their own posts, see totals number of posts.
Loggined users can click on others to visit other home pages. Then can follow/unfollow others.
Loggined users can click profile tab to total posts, total following and bio.
Loggined users can click explore tab to see all others users, and follow/unfollow them with button.
Notifications, Message, and More tabs do not have any features now.

Assignment 3 - All requirements working.

Directions: Database is locally hosted at mongodb://localhost:27017/iMedia . You can download MongoDB Compass and connect to it. The database name is "iMedia" and the collection is "users".

Since I, Minh Durbin, was the most familiar with the signup/signin, I added MVC architecture(controllers, models, public, views), main.js, seed.js). Long Sen worked on home.ejs, messages.ejs, modified existing controllers to include separate layouts for signup/signin page and the home/messages page and changed background color.

Assignment 2- Part2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Minh Durbin: signup page form validation and dynamically show response text

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Technologies: Vue.js and Bootstrap.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Summary: Every input text with invalid values will be highlighted in red with an error message. As the user corrects an input, it will appear normal/unhighlighted. If both passwords match but not a valid value, an invalid message will appear. Else, a password does not match message appears.

Assignment 1

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Minh Durbin: signin page, signup page (signin.html, signup.html, styles.css)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Long Sen: home page, message page (home.html, message.html, page-styles.css)

Language/Framework: HTML, CSS, Bootstrap

Features:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Homepage page: Link to Message page, Link to some hot trends, news in the right sidebar

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Message page: Link to Home page.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signin: Link to signup

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signup: Link to signin

Justification For Design Choices:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signup/Signin:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;These pages includes appropriate forms alongside with a collapsible navigation containing a logo, all of which are inside a header. This is a common theme in a webpage where one has a navigation inside a header that contains different links which introduce users to different information about your page. Possible future modifications include: removing home link and merge with signup when a user is not authenticated, previous authenticated users will be directed to the home page and not required to log in, etc...

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home/Message:
The home page contains two sidebars, navigation and trending news, along with a main content in the center that displays tweets from other users. This is a common theme in a social media web app, in which users can navigate to different functions of the web app on the left, see its content in the center, and visit articles of links/ads on the right, which are independent of the current page. The message page contains the same as above, except the right aside will display the focused message. This functions as a single page and users need not navigate elsewhere after selecting a message.

Summary:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is stricly not an exhaustive nor conclusive list of design choices. These design choices are subjected to future modifications.

Directions:

    git clone https://github.com/clamslam12/webApp.git

    Navigate to root directory and run browser-sync start --server --directory --files "**/*"
