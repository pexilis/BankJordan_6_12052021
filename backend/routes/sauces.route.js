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
    
        res.status(400).send(err.message);
    }

    self.multerHandler = require("../loader/core/imageUpload.loader");
    
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
                res.send(sauces);
            }).catch(err => {

                res.status(404).end();
            });
        });

        router.get('/:id', (req, res) => {
            const {id} = req.params;
            getSauce(id).then(data => {
                const {sauce} = data;
                res.send(sauce);
            }).catch(err => {
                res.status(404).end();
            });
        });

        router.post('/', SaucesMiddlewares.multerHandler.single('image'), 
                         SaucesMiddlewares.strToJSON, 
                         SaucesMiddlewares.handleError,
            (req, res) => { 
                const {
                    file,
                    userId
                } = req;

                const {sauce} = req.body;
    
                uploadSauce(file, sauce, userId).then(data => {
                    res.send({
                        message:"Sauce créée avec succès"
                })
                }).catch(err => {
                    res.status(403).send({
                    message:err
                })
            })
        });

        router.post('/:id/like', (req, res) => {
            const {id} = req.params;
            const {userId} = req;
            const {like} = req.body;
        
            likeSauce(userId, id, like).then(() => {
                res.send({message:"Success"});
            }).catch(err => {
                res.status(403).send({message:err.message});
            });
        });

        router.delete('/:id', (req, res) => {
            const {id} = req.params;
            const {userId} = req;
        
            deleteSauce(userId, id).then(() => {
                res.send({message:"Success"});
                       }).catch(err => {
                res.status(403).send({message:err.message});
                       })
        });

        router.put('/:id', SaucesMiddlewares.multerHandler.single('image'), 
                   SaucesMiddlewares.strToJSON, 
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
                    res.end();
                }).catch(err => {
                    res.status(403).end();
                })
                } else {
                    updateSauce.simple(userId, id, sauce).then(() => {
                    res.end();
                    }).catch(err => {
                        res.status(403).send(err.message)
                })
    }
        });

        return router;
    }

    return self;
})();




module.exports = Sauces;