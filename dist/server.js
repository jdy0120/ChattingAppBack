"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, { cors: { origin: "http://hocalhost:3000" } });
io.on("connection", function () {
    console.log("client connected");
});
server.listen(5000, function () {
    console.log("Server started on port 5000.");
});
