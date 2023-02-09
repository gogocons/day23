Installing Express with Typescript:

We want to install express with `npm install express --save`, and ten the Typescript types for it with `npm i -D typescript @types/express @types/node`.

then `npx tsc --init`

DAY 23:
Backend development begins! Backend development is a lot more logic based, has no "browser" runtime, and is run the way we talked about initially: node {filename}.js or tsx {filename}.ts!
We use software called Postman for easily sending requests with data for .post, and for fetching data via .get.
We use express in javascript to create web servers, const app = express(); to create an new instance of a web server, and app.get("routeName", function(req,res) {} and app.post("routeName", function(req,res) {} to create routes themselves!

EXAMPLE REPO FOR CREATING A NEW USER AND GETTIGN USER BY NAME, WITH DEPENDENCIES INSTALLED:
https://github.com/cyberhorsey/day23

HOMEWORK:
1) Create a new express server that has a route for creating Discord users, and a route for getting Discord user's by name.
The discord user should have a name, isAdmin, roles, and createdAt where createdAt is the current timestamp when the user is created. The user should be stored into a users array.

The .get route should look in that user array for the provided name.

2) Do the same for discord messages, and a route to edit discord message texts. 
So, a post route to create a discord message, and you pass in data to it like: {message: "hello", user: "Horseman", keks: 0}. Then create a new discord message, push it to a messages array, and return it with res.send. give each discord message a unique ID as well, it can just be a number, incrementing from 0.

Then, a route to get discord messages by username. Pass in a username, and look through the messages array to find all messages from that user and  return them.

Then, a new ".put" route (different from get or post, put is for editing existing records). It should accept an ID of a message in the route name, "/message/:I'd The route should find the message by ID in the messages array, and update the text to the new text. It should accept data like {newMessage: "newMessage here"} 
