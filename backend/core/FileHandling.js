const FileHandling = (() => {
    const fs = require("fs");
   
    let self = {};

    self.asyncDelete = (relPath) => {
        return new Promise((resolve, reject) => {
            fs.unlink(relPath, err => {
                if (err)
                    reject(err);
                
                resolve(relPath);
            })
        });
    }

    return self;
})();

module.exports = FileHandling;