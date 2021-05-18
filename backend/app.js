const authRouter = require("./routes/auth.route");
const sauceRouter = require("./routes/sauces.route");
const app = require("./loaders/global.loader");

app.use("/api/auth", authRouter);
app.use("/api/sauces", sauceRouter);

