const complexReq = {
    origin:'http://localhost:8080',
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials:true,
};

const simpleReq = {
    origin:'http://localhost:8080',
};


module.exports = {
    complexReq,
    simpleReq
};