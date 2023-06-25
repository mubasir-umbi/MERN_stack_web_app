const mogoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mogoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log('mongodb connected..');
    
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}


module.exports = connectDB