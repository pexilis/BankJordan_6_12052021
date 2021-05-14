const RegexConfig = (() => {
    let self = {};
    self.regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/:+-.]).{12,256}$/;
    self.uuidv4Regex = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/;
    self.alphaRegex = /^[a-zA-Z]{4,}$/;
    self.fileRegex = /^http:\/\/localhost:3000\/public\/images\/[a-z0-9]{4,}-[a-z0-9]{6}\.(jpg|png|jpeg)$/;
    
    return self;
})();

module.exports = RegexConfig;