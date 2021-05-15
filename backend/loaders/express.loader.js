const express = require('express');
require('dotenv').config();

const {
    HOSTNAME,
    PORT,
    PROTOCOL
} = process.env;

const app = express();
const port = PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on ${PROTOCOL}://${HOSTNAME}:${PORT}`);
});

module.exports = app;