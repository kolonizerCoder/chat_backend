const express = require("express");
const router = express.Router();
const message = require('../controllers/message');


router.post("/message", message.create);

router.get("/message", message.findAll);



module.exports = router;
