const RegexConfig = (() => {
    let self = {};
    self.regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/:+-.]).{12,256}$/;
    self.uuidv4Regex = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/;
    self.alphaRegex = /^[a-zA-Z]{4,}$/;
    self.filenameRegex = /^[a-zA-Z0-9_-]{1,}.[a-zA-Z0-9]{1,}$/;

    return self;
})();

module.exports = RegexConfig;