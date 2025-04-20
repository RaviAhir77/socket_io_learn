import React,{useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'


const Sockett = () => {
    const socketRef = useRef(null)

    useEffect(() => {
        socketRef.current = io('http://localhost:3000')

        socketRef.current.on('connect',()=>{
            console.log('🟢 socket connected frontend : ',socketRef.current.id)
        })


        return() => {
            socketRef.current.disconnect()
            console.log('🔴 disconnected frontend : ')
        }
    },[])

  return (
    <div>
        Socket learnig
    </div>
  )
}

export default Sockett