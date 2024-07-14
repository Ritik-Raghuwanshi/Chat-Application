const io = require("socket.io")(8000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

const user = {};

//Yaha Par User Store Honge
io.on("connection", (socket) => {
  //Yeh ek Instance h socket .io ka

  socket.on("new-user-joined", (name) => {
    //Yeh User Joined Event Bhj raha h
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    //It will send information of user joining to other Except who Joined
  });


  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: user[socket.id],
    });
    //Kisne Messagae Bheja h
  });


  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left",{ message: message,
        name: user[socket.id]});
    delete user[socket.id];
  });
});
