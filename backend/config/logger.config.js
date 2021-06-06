const path = require("path");

const devOption = {
    size:"10M",
    interval:"1d",
    path:path.resolve('./log/dev/')
}

const prodOption = {
    size:"100M",
    interval:"7d",
    path:path.resolve('./log/prod/')
}

module.exports = {
    prodOption,
    devOption,
    path
};
