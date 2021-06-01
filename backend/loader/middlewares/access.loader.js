const Access = require("../../middlewares/access.middleware");
const Token = require("../../core/Token");

Access.init(
    Token
);

module.exports = Access;