const Hash = require("./core/hash.loader");
const Cipher = require("./core/cipher.loader");
const Token = require("./core/token.loader");
const Mongoose = require("./core/mongoose.loader");
const Express = require("./core/express.loader");

const {userSchema, userModel} = require("./model/user.loader");
const {sauceSchema, sauceModel} = require("./model/sauce.loader");

const Login = require("./services/login.loader");
const Register = require("./services/register.loader");
const DeleteSauce = require("./services/deleteSauce.loader");
const LikeSauce = require("./services/likeSauce.loader");
const GetSauce = require("./services/getSauce.loader");
const GetSauces = require("./services/getSauces.loader");

require("./middlewares/app.loader");
const Access = require("./middlewares/access.loader");


const AuthRoute = require("./routes/auth.loader");

const app = Express.getApp();

app.use('/api/auth', AuthRoute);

(async function() {
    await Mongoose.connect();
    await Express.listen();
})();







