const RegexConfig = (() => {
    let self = {};
    self.filenameRegex = /^[a-zA-Z0-9_-]{1,}.[a-zA-Z0-9]{1,}$/;

    return self;
})();

module.exports = RegexConfig;