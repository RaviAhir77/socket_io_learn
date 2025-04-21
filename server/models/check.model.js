import mongoose from "mongoose";

const numCheckSchema = new mongoose.Schema({
    generated : {type : Number, required : true},
    players : {
        player1 : {type : String},
        player2 : {type : String}
    },
    status : {type : String,enum : ["waiting","running","finished"],default : "waiting"}

},{
    timestamps : true
})

const NumChecker = mongoose.model('NumChecker',numCheckSchema)

export default NumChecker;