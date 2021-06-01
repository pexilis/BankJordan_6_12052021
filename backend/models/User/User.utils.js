const dependencies = (() => {
    let self = {};
    self.Hash = null;
    self.Cipher = null;

    self.initDeps = (hashDep, cipherDep) => {
        self.Hash = hashDep;
        self.Cipher = cipherDep
    }

    return self;
})();

async function hashBeforeSave(str) {
    const {Hash} = dependencies;

    const {password} = this;
    const hashedPassword = await Hash.generateHash(password);
    this.password = hashedPassword;
}

async function checkPassword(email, password) {
    const {Hash, Cipher} = dependencies;
    const model = this;
    const encryptedEmail = await Cipher.encrypt(email);
    const findUser = await model.findOne({email:encryptedEmail});
    const userExist = (findUser !== null);

    if (!userExist)
        throw new Error();

    const {password:hashedPassword} = findUser;
    const isValidPassword = await Hash.compareHash(password, hashedPassword);
    
    if (!isValidPassword)
        throw new Error();
    
    return findUser;
}

module.exports = {
    dependencies,
    hashBeforeSave,
    checkPassword
};