const Hash = (() => {
    let bcrypt = null;
    let rounds = null;
    let self = {};

    self.init = saltRound => {
        rounds = saltRound;
    }

    self.initDep = bcryptDep => {
        bcrypt = bcryptDep;
    }


    self.generateHash = async(str) => {
        let salt = await bcrypt.genSalt(Number.parseInt(rounds));
        let hash = await bcrypt.hash(str, salt);
        return hash;
    }

    self.compareHash = async(hash1, hash2) => {
        const areSame = await bcrypt.compare(hash1, hash2);
        return areSame;
    }
    return self;
})();

module.exports = Hash;