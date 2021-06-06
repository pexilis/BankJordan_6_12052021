const ImageUpload = (() => {
    let self = {};
    let regexConfig = null;
    const multer = require("multer");

    let StringModule = null;

    const mimeImage = {
        jpg:"image/jpeg",
        jpeg:"image/jpeg",
        png:"image/png"
    };

    let folder = null;
    let filename = null;
    let minFilename = null;
    let maxFilename = null;
    let multerLimit = null;
    

    const _checkFile = (req, file, cb) => {
        const {filenameRegex} = regexConfig;
    
        const {
            originalname,
            encoding,
            mimetype
        } = file;

        const ext = StringModule.extractExtension(originalname);


        const checkFilename = filenameRegex.test(originalname);

        const checkLength = (
                             originalname.length >= minFilename && 
                             originalname.length <= maxFilename
                            );

        const checkExt = (mimeImage[ext] ? mimetype === mimeImage[ext] : false);

        if (!checkFilename)
            return cb(new Error("FORMAT FILENAME ERROR"));
        
        if (!checkExt)
            return cb(new Error("EXT FILENAME ERROR"));
        
        if (!checkLength)
            return cb(new Error("LENGTH FILENAME ERROR"))
        
        return cb(null, true);
    }

    self.initDeps = (str) => {
        StringModule = str;
    }

    self.initConfig = regex => {
        regexConfig = regex;
    }

    self.initParam = (folderParam, filenameParam, minFilenameParam, maxFilenameParam, limit) => {
        folder = folderParam;
        filename = filenameParam;
        minFilename = minFilenameParam;
        maxFilename = maxFilenameParam;
        multerLimit = limit;
    }

    self.init = () => {
        const storage = multer.diskStorage({
            destination:folder,
            filename:filename
        })

        const uploader = multer({
            storage,
            fileFilter:_checkFile,
            limits:multerLimit
        });

        return uploader;
    }

    return self; 
})();

module.exports = ImageUpload;


