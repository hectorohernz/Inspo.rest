const mongoose = require('mongoose');
const logger = require('../utils/logger/logger');
mongoose.set('useFindAndModify', false);
const connectToMongoDataBase = async () => {
    try{
        await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true, // NewUrlPaser 
        useUnifiedTopology: true // Required for DeprecationWarning: current Server Discovery and Monitoring engine is deprecated,
        ,useCreateIndex: true
        });
        logger.info("Mongo Is Connected");
    } catch(err){
        logger.error(err.message);
        // Exit Process with failure
        process.exit(1);
    }
};

module.exports = connectToMongoDataBase;