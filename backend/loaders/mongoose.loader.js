const mongoose = require("mongoose");
require("dotenv").config();

(() => {
    const {
        DB_USER,
        DB_PASSWORD,
        DB_NAME,
        CLUSTER_HOST,
    } = process.env;

    const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}`;

    const connectOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    };

    const connection = mongoose.connection;
    mongoose.connect(DB_URI, connectOptions);

    connection.on('error', err => console.log(err));
    connection.once('open', () => console.log("Successfully connected to database"));
})();