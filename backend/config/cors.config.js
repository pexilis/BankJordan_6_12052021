const complexAuth = {
    origin:'http://localhost:8080',
    method:'',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials:true,
};

const simpleAuth = {
    origin:'http://localhost:8080',
};


module.exports = {
    complexAuth,
    simpleAuth
};