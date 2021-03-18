# webApp

social media web app for Web Application Development class

Access Here: https://clamslam12.github.io/webApp/.

The markdown document must provide a detailed description of the project, what technologies you’ve used, how the team has divided the tasks between them, the justification for design choices, installation guides, and any other details that are needed for understanding the project, its implementation, etc.

Project: Social Media

Team Member: Minh Durbin, Long Sen

Responsibility:

Assignment 2- Part2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Minh Durbin: signup page form validation and dynamically show response text

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
