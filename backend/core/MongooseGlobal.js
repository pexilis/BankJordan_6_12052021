const MongooseGlobal = (() => {
    let mongoose = null;

    let self = {};
    let user=null;
    let password=null;
    let db=null;
    let host=null;
    let options=null;
    let connectURI = null;

    self.initDep = mongooseDep => {
        mongoose = mongooseDep;
    }

    self.init = (userDB, passwordDB, dbDB, hostDB, optionsDB) => {
        user = userDB;
        password = passwordDB;
        db = dbDB;
        host = hostDB;
        options = optionsDB;
        connectURI = `mongodb+srv://${user}:${password}@${host}/${db}`;
    }

    self.connect = async() => {
        const connection = mongoose.connection;
        mongoose.connect(connectURI, options);
        connection.on('error', err => console.log(err));
        connection.once('open', () => console.log("Successfully connected to database"));
    }

    return self;
})();

module.exports = MongooseGlobal;