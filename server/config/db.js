import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/learn_socket'

const connect = async() => {
    try {
        await mongoose.connect(url);
        console.log('🔒 database is conneted ...')
    } catch (error) {
        console.log('database connection error',error)
        process.exit(1)
    }
}

connect()

export default connect;