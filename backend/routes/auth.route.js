const express = require("express");
const router = express.Router();

const cors = require("cors");
const {simpleReq, complexReq} = require("../config/cors.config");

router.options("*", cors(complexReq));
router.get("*", cors(simpleReq));
router.post("*", cors(simpleReq));
router.put("*", cors(simpleReq));
router.delete("*", cors(simpleReq));

router.post("/signup", (req, res) => {
    
});

router.post("/login", (req, res) => {
   
});

module.exports = router;
