const StringModule = (() => {
    let self = {};

    self.generateLogFilename = () => {
        let date = new Date();

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const date_file = `${day}-${month}-${year}.log`
        return date_file;
    }

    return self;
})();

module.exports = StringModule;