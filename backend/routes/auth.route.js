const AuthMessages = {
    "loginMessage":"Email ou mot de passe incorrect",
    "registerMessage":"Cet email est déjà pris"
}

const AuthValidator = (() => {
    const AuthSchema = require("../validators/AuthValidator");

    let self = {};

    self.loginValidate = async(req, res, next) => {
        const {body} = req;

        try {
            await AuthSchema.validateAsync(body);
            next();
        } catch(e) {
            res.status(401).json({
                message:AuthMessages["login"]
            });
        }
    }

    self.registerValidate = async(req, res, next) => {
        const {body} = req;

        try {
            await AuthSchema.validateAsync(body);
            next();
        } catch(e) {
            res.status(400).json({
                message:e.message
            });
        }
    }

    return self;
})();


const Auth = (() => {
    let self = {};

    /* NPM DEPENDENCIES */
    let express = null;
    let router = null;
    let cors = null;

    /* CONFIG */
    let corsConfigSimple = null;
    let corsConfigComplex = null;

    /* Middleware */
    let isLogout = null;

    /* Services */
    let Login = null;
    let Register = null; 

    self.initDeps = (expressDep, corsDep) => {
        express = expressDep;
        router = express.Router();
        cors = corsDep;
    }

    self.initConfig = (corsSimple, corsComplex) => {
        corsConfigSimple = corsSimple;
        corsConfigComplex = corsComplex;
    }

    self.initMiddlewares = (logout) => {
        isLogout = logout;
    }

    self.initServices = (login, register) => {
        Login = login;
        Register = register;
    }

    self.initRoute = () => {
        router.use(isLogout);
        router.options("*", cors(corsConfigComplex));
        router.get("*", cors(corsConfigSimple));
        router.post("*", cors(corsConfigSimple));
        router.put("*", cors(corsConfigSimple));
        router.delete("*", cors(corsConfigSimple));
        
        router.post("/signup", AuthValidator.registerValidate, (req, res) => {
            const {email, password} = req.body;
        
            Register(email, password).then(() => res.status(202).json({
                message:"Votre compte a été réservé"
            })).catch(err => {
                res.status(401).json({message:AuthMessages["registerMessage"]});
            });
        });
        
        router.post("/login", AuthValidator.loginValidate, (req, res) => {
           const {email, password} = req.body; 
        
           Login(email, password).then(data => res.status(200).json(data))
                                 .catch(err => {
                                     res.status(401).json({message:AuthMessages["login"]})
                                })
           
        });

        return router;
    }

    return self;
})();

module.exports = Auth;