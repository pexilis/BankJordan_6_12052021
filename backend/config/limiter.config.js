const apiLimit = {
    windows: 60 * 1000, // 1 minute
    max:200 // 200 requests par minute,
};

const signLimit = {
    windows:3 * 60 * 60 * 1000,
    max:3
}

const registerLimit = {
    windows:3 * 60 * 60 * 1000,
    max:3
}

module.exports = {
    registerLimit,
    signLimit,
    apiLimit
};
