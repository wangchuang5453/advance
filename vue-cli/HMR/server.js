// /src/lib/server/Server.js

const express = require("express");
const http = require("http");
const mime = require("mime");// 可以根据文件后缀，生成相应的Content-Type类型
const path = require("path");
const socket = require("socket.io");// 通过它和http实现websocket服务端
const MemoryFileSystem = require("memory-fs");// 内存文件系统，主要目的就是将编译后的文件打包到内存
const updateCompiler = require("./updateCompiler");

class Server {
    constructor(compiler) {
        this.compiler = compiler;// 将webpack实例挂载到this上
        updateCompiler(compiler);// 【3】entry增加 websocket客户端的两个文件，让其一同打包到chunk中
        this.currentHash;// 每次编译的hash
        this.clientSocketList = [];// 所有的websocket客户端
        this.fs;// 会指向内存文件系统
        this.server;// webserver服务器
	      this.app;// express实例
        this.middleware;// webpack-dev-middleware返回的express中间件，用于返回编译的文件

        this.setupHooks();// 【4】添加webpack的done事件回调，编译完成时会触发；编译完成时向客户端发送消息，通过websocket向所有的websocket客户端发送两个事件，告知浏览器来拉取新的代码了
      	this.setupApp();//【5】创建express实例app
        this.setupDevMiddleware();// 【6】里面就是webpack-dev-middlerware完成的工作，主要是本地文件的监听、启动webpack编译、设置文件系统为内存文件系统（让编译输出到内存中）、里面有一个中间件负责返回编译的文件
      	this.routes();// 【7】app中使用webpack-dev-middlerware返回的中间件
        this.createServer();// 【8】创建webserver服务器，让浏览器可以访问编译的文件
        this.createSocketServer();// 【9】创建websocket服务器，监听connection事件，将所有的websocket客户端存起来，同时通过发送hash事件，将最新一次的编译hash传给客户端
    }
    setupHooks() {}
    setupApp() {} 
    setupDevMiddleware() {}
    routes() {}
    createServer() {}
    createSocketServer() {}
    listen() {}// 启动服务器
}

module.exports = Server;
