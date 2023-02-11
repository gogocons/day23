import express from "express";
import User from "./user";
import Message from "./message";

// users is in my memory array I'm PRETENDING is a database, that stores users.
// it will be wipe every time I restart the script, because it's only used in this file.
// not a real database yet.
// but now I can push to it and get elements out of it, so it pretends to be a database.
const users: User[] = [];
const messages: Message[] = [];

// const messages: Message[] = [
//   {
//       message: "GM",
//       user: {
//         name: "gogocons",
//         isAdmin: false,
//         roles: [
//             "Crane Manage",
//             "Diply Fan Club"
//         ],
//         createdAt: new Date
//       },
//       keks: 0,
//       createdAt: new Date,
//       messageID: 1,
//       edited: false
//   },
//   {
//       message: "ETC ETC",
//       user: {
//         name: "gogocons",
//         isAdmin: false,
//         roles: [
//             "Crane Manage",
//             "Diply Fan Club"
//         ],
//         createdAt: new Date
//       },
//       keks: 0,
//       createdAt: new Date,
//       messageID: 2,
//       edited: false
//   }
// ]

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/users", function (req, res) {
  res.send(users);
});

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
  const user = users.find((u) => u.name === req.body.name);
  // don't let a user be created with the same name
  if (user) {
    res.send("A USER WITH THIS NAME ALREADY EXISTS");
  } else {
    const user: User = {
      name: req.body.name,
      isAdmin: req.body.isAdmin,
      roles: req.body.roles,
      createdAt: new Date(),
    };

    // on posting the data in req.body, and saving it as a user, iI PUSH it to my users array,  now, on my GET route
    // I can get it out of the "database" of the users array
    users.push(user);

    res.send(user);
  }
});

// create a message
app.post("/message", function (req, res) {
  const user = users.find((u) => u.name === req.body.user);
  if (user) {
    const message: Message = {
      message: req.body.message,
      user: user,
      keks: 0,
      createdAt: new Date(),
      messageID: messages.length + 1,
      edited: false,
    };

    messages.push(message);

    res.send(message);
    // don't let a message be sent by a user that doesn't exist
  } else {
    res.send("THIS USER HAS NOT BEEN CREATED");
  }
});

// show messages
app.get("/messages", function (req, res) {
  res.send(messages);
});

// edit message
app.post("/message-edit", function (req, res) {
  // this checks if the user trying to edit the message is the one who sent it
  // it also checks if the messageID trying to edit exists (not sure if necessary yet)
  const messageEdit = messages.find(
    (m) => m.user.name === req.body.user && m.messageID === req.body.messageID
  );
  if (messageEdit) {
    messageEdit.message = req.body.message;
    messageEdit.edited = true;

    res.send(messageEdit);
  } else {
    res.send("A USER CANNOT EDIT ANOTHER USERS MESSAGE");
  }
});

// get all messages by user
app.get("/messages/:name", function (req, res) {
  // this checks if the messages array has any messages from the username passed in
  const messageByUser = messages.find((m) => m.user.name === req.params.name);
  let tempArray: Message[] = [];

  if (messageByUser) {
    messages.forEach(function (m) {
      if (m.user.name === req.params.name) {
        tempArray.push(m);
      }
    });

    // send the found messages
    res.send(tempArray);
    // empty the array for next time use
    tempArray = [];
  } else {
    res.send("THERE ARE NO MESSAGES FROM THIS USER");
  }
});

// change a message by messageID
app.put("/message-edit-admin/:ID", function (req, res) {
  const messageByID = messages.find(
    (m) => m.messageID === Number(req.params.ID)
  );

  if (messageByID) {
    messageByID.message = req.body.message;
    messageByID.edited = true;

    res.send(messageByID);
  } else {
    res.send("A MESSAGE WITH THIS ID DOES NOT EXIST");
  }
});

app.listen(3000);
