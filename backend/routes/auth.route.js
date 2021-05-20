const express = require("express");
const router = express.Router();

const cors = require("cors");
const {simpleReq, complexReq} = require("../config/cors.config");
const {isLogout} = require("../middleware/access.middleware");


// Services 
const login = require("../services/login.service");
const register = require("../services/register.service");

router.use(isLogout);
router.options("*", cors(complexReq));
router.get("*", cors(simpleReq));
router.post("*", cors(simpleReq));
router.put("*", cors(simpleReq));
router.delete("*", cors(simpleReq));

router.post("/signup", async(req, res) => {
    const {email, password} = req.body;

    register(email, password).then(() => res.status(202).send({
        message:"Si cette adresse est unique, votre compte sera réservé"
    })).catch(err => {
        const message = err.message.split(":")[2];
        if (message.includes("Le mot de passe")){
            res.status(400).send({
                message
            });
        } else {
            res.status(202).send({
                message:"Si cette adresse est unique, votre compte sera réservé"
            });
        }
    });
});

router.post("/login", (req, res) => {
   const {email, password} = req.body; 

   login(email, password).then(data => res.status(200).send(data))
                         .catch(err => res.status(401).end())
   
});

module.exports = router;
