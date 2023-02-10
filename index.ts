import express from "express";
import getCurrentDateAndTime from "./time";
import User from "./user";
import Message from "./message";

// users is in my memory array I'm PRETENDING is a database, that stores users.
// it will be wipe every time I restart the script, because it's only used in this file.
// not a real database yet.
// but now I can push to it and get elements out of it, so it pretends to be a database.
const users: User[] = [];
const messages: Message[] = [];
const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/users", function (req, res) {
  res.send(users);
})

app.get("/user/:name", function (req, res) {
  // now I want the user to provide me a name, and I will try to find that user by name
  // in my "database", the users array.

  const user = users.find((u) => u.name === req.params.name);
  if (user) {
    res.send(user);
  } else {
    res.send("USER DOES NOT EXIST IN USERS ARRAY");
  }
});

// post requests send data to the backend to get saved, this is semantic route naming, POST.
// for this route, we want to check the 'req' object for a users name, isAdmin, and rols, then create a new user.
// the user can be fetched bt name in the GET route above.
// we want to send in a JSON object
// {name:'gogo', isAdmin: true, roles:['Crane Manager']}
app.post("/user", function (req, res) {
  // req.body is our incoming javascript object, with the user information that the person calling this route
  // wants to save
  // const time = dateTime;
  const user: User = {
    name: req.body.name,
    isAdmin: req.body.isAdmin,
    roles: req.body.roles,
    createdAt: getCurrentDateAndTime(),
  };

  // on posting the data in req.body, and saving it as a user, iI PUSH it to my users array,  now, on my GET route
  // I can get it out of the "database" of the users array
  users.push(user);

  res.send(user);
});

// create a message
app.post("/messages", function (req, res) {

  const user = users.find((u) => u.name === req.body.user);
  if (user) {
    const message: Message = {
      message: req.body.message,
      user: req.body.user,
      keks: 0,
      createdAt: getCurrentDateAndTime(),
      messageID: messages.length + 1,
    };

    messages.push(message);

    res.send(message);
  } else {
    res.send("THIS USER HAS NOT BEEN CREATED")
  }

});

// show messages
app.get("/messages", function (req, res) {
  res.send(messages);
});

app.listen(3000);
