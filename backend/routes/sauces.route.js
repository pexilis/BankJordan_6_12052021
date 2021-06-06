
const SaucesMiddlewares = (() => {
    const self = {};

    self.strToJSON = (req, res, next) => {
        if (typeof req.body.sauce === "string")
            req.body.sauce = JSON.parse(req.body.sauce);
        next();
    }

    self.handleError = (err, req, res, next) => {
        if (!err)
            next();
    
        res.status(400).json({message:err.message});
    }

    self.multerHandler = require("../loader/core/imageUpload.loader");
    
    return self;
})();

const Validate = (() => {
    const LikeSchema = require("../validators/LikeValidator");
    const SauceSchema = require("../validators/SauceValidator");
    
    let self = {};
    const DeleteSauce = require("../services/deleteSauce.service");

    self.validateLike = async(req, res, next) => {
        try {
            const {body} = req;
            await LikeSchema.validateAsync(body);
            next();
        } catch(e) {
            res.status(400).json({
                message:e.message
            });
        }
        
    }

    self.validateSauce = async(req, res, next) => {
        try {
            const sauce = req.body.sauce ? req.body.sauce : req.body;
            await SauceSchema.validateAsync(sauce);
            next();
        } catch(e) {
            if (req.file) {
                const file = req.file;
                const filename = file.filename;
                await DeleteSauce.deleteFile(filename);
            }
            
            res.status(400).json({
                message:e.message
            });
        }
        
    }

    return self;
})();

const Sauces = (() => {
    let self = {};
    let express = require("express");
    let router = express.Router();
    let cors = require("cors");

    let corsConfig = null;
    let middlewareAccess = null;

    let getSauce = null;
    let getSauces = null;
    let updateSauce = null;
    let uploadSauce = null;
    let likeSauce = null;
    let deleteSauce = null;

    self.initConfig = cors => {
       corsConfig = cors; 
    }

    self.initMiddleware = access => {
        middlewareAccess = access;
    }

    self.initServices = (sauces, sauce, upload, update, del, like) => {
        getSauces = sauces;
        getSauce = sauce;
        uploadSauce = upload;
        updateSauce = update;
        deleteSauce = del;
        likeSauce = like;
    }

    self.init = () => {
        const {isLogin} = middlewareAccess;
        const {complexReq, simpleReq} = corsConfig;

        router.options("*", cors(complexReq));
        router.get("*", cors(simpleReq));
        router.post("*", cors(simpleReq));
        router.put("*", cors(simpleReq));
        router.delete("*", cors(simpleReq));
        router.use(isLogin);

        router.get('/', (req, res) => {
            getSauces().then(data => {
                const {sauces} = data;
                res.json(sauces);
            }).catch(err => {
                res.status(404).end();
            });
        });

        router.get('/:id', (req, res) => {
            const {id} = req.params;
            getSauce(id).then(data => {
                const {sauce} = data;
                res.json(sauce);
            }).catch(err => {
                res.status(404).end();
            });
        });

        router.post('/', SaucesMiddlewares.multerHandler.single('image'), 
                         SaucesMiddlewares.strToJSON,
                         Validate.validateSauce, 
                         SaucesMiddlewares.handleError,
            (req, res) => { 
                const {
                    file,
                    userId
                } = req;

                const {sauce} = req.body;
    
                uploadSauce(file, sauce, userId).then(data => {
                    res.json({
                        message:"Sauce créée avec succès"
                })
                }).catch(err => {
                    res.status(500).json({
                    message:"La sauce n'a pas pu être créée"
                })
            })
        });

        router.post('/:id/like', Validate.validateLike, (req, res) => {
            const {id} = req.params;
            const {userId} = req;
            const {like} = req.body;
        
            likeSauce(userId, id, like).then(() => {
                res.json({message:"Merci d'avoir voté"});
            }).catch(err => {
                res.status(500).json({message:"La sauce n'a pas pu être liké"});
            });
        });

        router.delete('/:id', (req, res) => {
            const {id} = req.params;
            const {userId} = req;
        
            deleteSauce(userId, id).then(() => {
                res.json({message:"La sauce a été supprimé avec succès"});
                       }).catch(err => {
                res.status(500).json({message:"La sauce n'a pas pu être supprimé"});
                       })
        });

        router.put('/:id', SaucesMiddlewares.multerHandler.single('image'), 
                           SaucesMiddlewares.strToJSON,
                           Validate.validateSauce, 
                           SaucesMiddlewares.handleError,
            (req, res) => {
                const file = req.file;
                let sauce = {};


                sauce = req.body.sauce ? req.body.sauce : {
                    description:req.body.description,
                    heat:req.body.heat,
                    mainPepper:req.body.mainPepper,
                    manufacturer:req.body.manufacturer,
                    name:req.body.name
                };

                const id = req.params.id;
                const userId = req.userId;

                if (file) {
                    updateSauce.withFile(userId, id, sauce, file).then(() => {
                    res.json({message:"La sauce a été modifié avec succès"});
                }).catch(err => {
                    res.status(403).end();
                })
                } else {
                    updateSauce.simple(userId, id, sauce).then(() => {
                    res.json({message:"La sauce a été modifié avec succès"});
                    }).catch(err => {
                        res.status(500).json({message:"La sauce n'a pas pu être mise à jour"})
                })
    }
        });

        return router;
    }

    return self;
})();




module.exports = Sauces;