const Message = require("../models/message");
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);


exports.create = (req, res) => {
    var message = new Message(req.body);
    message.save((error, message) =>{
      if(error)
        res.status(200).json({success:false, message:error})

    io.emit('message', req.body);
    res.status(200).json({success:true, message:message})
    });
}


exports.findAll = (req, res) => {
    Message.find()
    .select('message createdAt')
    .exec((error, message) =>{
      if(error)
        res.status(200).json({success:false, message:error})
    res.status(200).json({success:true, message:message})
    });
}