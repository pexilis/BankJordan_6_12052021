const RegexConfig = (() => {
    let self = {};
    self.regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/:+-.]).{12,256}$/;
    return self;
})();

module.exports = RegexConfig;