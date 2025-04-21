import NumChecker from "../models/check.model.js";

export const socketHandler = (io) => {
    io.on('connection',async(socket) => {
        console.log('🟢 new client is a connected : ',socket.id)
    
        const generatedNumber = Math.floor((Math.random() * 100) + 1) 
    
        const storeDB = await NumChecker.create({
            generated : generatedNumber,
            players :{
                player1 : '',
                player2 : ''
            },
            status : "waiting"
        })
    
        socket.on('join-room',async(playerId) => {
            const latest = await NumChecker.findById(storeDB._id)
            console.log('backend gated palyerId : ',playerId)
            if(!latest.players.player1){
                latest.players.player1 = playerId
                console.log('player1 stored')
                latest.save()
            }else{
                latest.players.player2 = playerId
                latest.status = 'running';
                console.log('player2 stored')
                latest.save()
            }
        })
        socket.on('num-check',async(data) => {
            console.log("generated Num log : ",storeDB.generated)
            console.log("data for backend : ",data)
            const checker = parseInt(data) === storeDB.generated;
            console.log("checker log : ", checker)
    
            if(checker){
                storeDB.status = "finished";
                await storeDB.save()
                socket.emit('feedback',"you guess is correct")
            }else{
                socket.emit('feedback',"wrong guess !")
            }
        })
    
        socket.on('disconnect',() => {
            console.log('🔴 client disconnected .....',socket.id)
        })
    })
}