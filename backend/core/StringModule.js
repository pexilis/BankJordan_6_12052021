const StringModule = (() => {
    let self = {};

    const path = require("path");

    const normalizeAccent = str => {
        const accentDict = {
            "é":"e",
            "à":"a",
            "è":"e",
            "ç":"c",
            "ù":"u"
        }

        Object.entries(accentDict)
              .map(([key, value]) => {
                str = str.replace(key, value);
              });
        
        return str;
    }

    self.generateLogFilename = () => {
        let date = new Date();

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const date_file = `${day}-${month}-${year}.log`
        return date_file;
    }

    self.generateImageName = (name, ext) => {
        name = name.trim()
                   .toLowerCase();
        
        name = name.replace(/[^a-zA-Z0-9éàèçù_ -]+/g, '');
        name = normalizeAccent(name);
        name = name.replace(/ |_/g, "-");
        
        return `${name}-${Date.now()}.${ext}`;
    }

    self.extractExtension = filename => {
        return filename.trim()
                       .split(".")
                       .pop()
                       .toLowerCase();
    }

    self.getFilenameFromPath = path => {
        return path.trim()
                   .split("/")
                   .pop()
    }

    self.generateRelPath = (rel, name) => {
        return path.join(rel, name);
    }

    return self;
})();

module.exports = StringModule;