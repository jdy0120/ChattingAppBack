"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var users_1 = require("./util/users");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, { cors: { origin: "http://localhost:3000" } });
io.on("connection", function (socket) {
    socket.join("myChat");
    socket.on("handle-connection", function (username) {
        if (!(0, users_1.userJoin)(socket.id, username)) {
            socket.emit("username-taken");
        }
        else {
            socket.emit("username-submitted-successfully", function () {
                console.log("connedted");
            });
            io.to("muChat").emit("get-connected-users", (0, users_1.getUsers)());
        }
    });
    socket.on("message", function (message) {
        socket.broadcast.to("myChat").emit("receive-message", message);
    });
    socket.on("disconnect", function () {
        (0, users_1.userLeft)(socket.id);
    });
});
server.listen(3001, function () {
    console.log("Application started on port 3001!");
});
