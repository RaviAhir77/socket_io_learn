import React,{useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'


const Sockett = () => {
    const socketRef = useRef(null)
    const [guessNumber,setGuessNumber] = useState('')
    const [serverFeedback,setServerFeedback] = useState('')

    useEffect(() => {
        socketRef.current = io('http://localhost:3000')

        socketRef.current.on('connect',()=>{
            console.log('🟢 socket connected frontend : ',socketRef.current.id)
        })

        socketRef.current.on("feedback",(data) => {
            setServerFeedback(data)
        })
        return() => {
            socketRef.current.disconnect()
            console.log('🔴 disconnected frontend : ')
        }
    },[])

    const numberSender = () => {
        if(Number(guessNumber)){
            socketRef.current.emit('num-check',guessNumber)
        }else{
            console.log('please enter valid number')
        }
    }
  return (
    <div>
        <h2>send Number to validate</h2>
        <input type="text" value={guessNumber} onChange={e => setGuessNumber(e.target.value)} placeholder='Enter Number ...' />
        <button onClick={numberSender}>SEND</button>
        <hr />

        {serverFeedback && <span>feedback : {serverFeedback}</span>}
    </div>
  )
}

export default Sockett