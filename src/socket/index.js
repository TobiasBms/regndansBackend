const socketIO = require("socket.io");
const utility = require("./utility.js");

function findUsersInRoom(users, token, io) {
  // Finds what users in lobbyUsers are attached to the current room by making the filter
  // conditional that the lobbyUsers individual socketIds has the exists in the keys array
  const clients = io.sockets.adapter.rooms[token].sockets;
  const keys = Object.keys(clients);
  return users.filter((user) => keys.includes(user.socketId));
}

function updateUserInRoom(users, userToUpdate) {
  // Finds the user in the users array and replaces the user which ID matches with userToUpdate
  return users.map((user) => {
    if (user.user._id === userToUpdate.user._id) {
      return userToUpdate;
    } else {
      return user;
    }
  });
}

function init(server) {
  const io = socketIO(server);
  const users = {};
  let userObj = [];
  let lobbyUsers = [];
  let boardCreatorID;
  let sharedBoard;

  io.on("connection", function (socket) {
    users[socket.id] = socket.id;

    //lobby functionality
    socket.on("lobby", function ({ user, room, currentBoard }) {
      socket.join(room);
      boardCreatorID = userObj.find((usr) => usr._id === userObj[0]._id)._id;
      if (user._id === boardCreatorID) {
        sharedBoard = currentBoard;
      }
      // Check if users exists in the lobbyUsers array, if they do - update their socketId, if not - add them
      const existingUser = lobbyUsers.find(
        (existingUser) => existingUser.user._id === user._id
      );

      // ! UTILITY FUNCTIONS + CLEANUP
      if (existingUser) {
        lobbyUsers = lobbyUsers.map((user) => {
          if (user.user._id === existingUser.user._id) {
            return { ...user, socketId: socket.id };
          } else {
            return user;
          }
        });
      } else {
        lobbyUsers.push({ user, socketId: socket.id });
      }

      // All the clients in the current room
      const usersInRoom = findUsersInRoom(lobbyUsers, room, io);

      io.in(room).emit("new user", usersInRoom);
      io.in(room).emit("updateCurrentBoard", sharedBoard);

      socket.on("disconnect", function () {
        // Filter the user that left from the usersInRoom and emit the new updatedUsersInRoom
        socket.leave(room);
        const updatedUsersInRoom = usersInRoom.filter(
          (user) => user.socketId !== socket.id
        );
        console.log(updatedUsersInRoom);
        io.in(room).emit("new user", updatedUsersInRoom);
      });
    });

    socket.on("lobbyRedirect", function (data) {
      if (data === "ready") {
        socket.emit("ready", "/login");
      }
    });

    // Pass the updated users to the room from which is the function was called
    socket.on("updated", function ({ updatedUser, boardId, token }) {
      // All the clients in the current room
      const usersInRoom = findUsersInRoom(lobbyUsers, token, io);
      const updatedUsersInRoom = updateUserInRoom(usersInRoom, updatedUser);

      lobbyUsers = lobbyUsers.map((user) => {
        if (user.user._id === updatedUser.user._id) {
          return updatedUser;
        } else {
          return user;
        }
      });

      io.in(token).emit("new user", updatedUsersInRoom);
    });

    socket.on("resetChecked", function ({ token }) {
      const users = findUsersInRoom(lobbyUsers, token, io);
      const updatedUsers = users.map((user) =>
        user.isChecked ? { ...user, isChecked: false } : user
      );
      // Update the lobbyUsers array with the newly updatedUsers so that we reset the isChecked as
      // soon as all users have a isChecked: true. This is to avoid a user creating a board, then
      // going back to create a new board and the isChecked is already set to true, so the lobby
      // component is skipped
      lobbyUsers = lobbyUsers.map(
        (lobbyUser) =>
          updatedUsers.find(
            (updatedUser) => updatedUser.user._id === lobbyUser.user._id
          ) || lobbyUsers
      );
      io.in(token).emit("new user", updatedUsers);
    });

    socket.on("objShare", function (obj, key) {
      // Check if the user is already in the userObj array, if not add them.
      if (userObj.some((existingUser) => existingUser._id === obj[0]._id)) {
        // Replace existing user with obj
      } else {
        userObj.push(obj[0]);
      }
      io.sockets.emit("objShare", userObj, key);
    });

    socket.on("updateObject", function (obj, key) {
      // Obj is all the updated users, so we set that as the userObj
      // Then pass it to our objShare
      userObj = obj;
      io.sockets.emit("objShare", obj, key);
    });

    socket.on("updatePhases", function (phases) {
      io.sockets.emit("updatePhases", phases);
    });

    socket.on("canvasShare", function (canvasData) {
      socket.broadcast.emit("canvasShare", canvasData);
    });

    socket.on("users", function () {
      io.sockets.emit("users", userObj.length);
    });

    socket.on("new user", function (data) {
      console.log(users[socket.id], "is joined");
      io.sockets.in("join").emit("node news", users[socket.id] + data);
    });
  });
}

module.exports = {
  init,
};
