import { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { getUsers, userJoin, userLeft } from "./util/users";

import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  socket.join("myChat");

  socket.on("handle-connection", (username: string) => {
    if (!userJoin(socket.id, username)) {
      socket.emit("username-taken");
    } else {
      socket.emit("username-submitted-successfully", () => {
        console.log("connedted");
      });
      io.to("muChat").emit("get-connected-users", getUsers());
    }
  });

  socket.on("message", (message: { message: string; username: string }) => {
    socket.broadcast.to("myChat").emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    userLeft(socket.id);
  });
});

server.listen(3001, () => {
  console.log("Application started on port 3001!");
});
