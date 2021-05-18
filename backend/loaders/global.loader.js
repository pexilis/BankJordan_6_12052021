require("./mongoose.loader.js");
const load = require("./middleware.loader");
const app = require("./express.loader");

load(app);

module.exports = app;

