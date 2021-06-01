const GetSauces = (() => {
    let self = {};
    let sauceModel = null;

    self.init = sauce => {
        sauceModel = sauce;
    };

    self.run = async() => {
        const sauces = await sauceModel.find();
        return {
            sauces
        }
    }

    return self;
})();

module.exports = GetSauces;