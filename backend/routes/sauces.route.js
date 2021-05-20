const express = require("express");
const router = express.Router();

const cors = require("cors");
const {simpleReq, complexReq} = require("../config/cors.config");
const {isLogin} = require("../middleware/access.middleware");


router.use(isLogin);
router.options("*", cors(complexReq));
router.get("*", cors(simpleReq));
router.post("*", cors(simpleReq));
router.put("*", cors(simpleReq));
router.delete("*", cors(simpleReq));

router.get('/', (req, res) => {
    res.send("OK");
});

router.get('/:id', (req, res) => {
    res.send("OK");
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.post('/:id/like', (req, res) => {

});


module.exports = router;
