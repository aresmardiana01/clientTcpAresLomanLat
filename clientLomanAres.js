require('dotenv').config()
const net = require('net')
const JsonSocket = require('json-socket')

const socket = new JsonSocket(new net.Socket())

function processMsg(msg) {
    if (msg.includes('(DEP-')){
        const pattern = /\(DEP-(?<acid>[A-Z0-9]+)(\/A)?(?<ssr>\d*|)-(?<adep>[A-Z]{4})(?<atd>\d*)-(?<ades>[A-Z]{4})/
        const result = msg.match(pattern)
        if (result){
            console.log(result.groups)
            console.log('----\n\n')
        }else{
            console.log(`Dep message di terima namun tidak sesuai format`)
            console.log('----\n\n')
            
        }
    }
}

socket.on('error', err => {
    console.log(`error on conecting`)
    console.log(err.message)
})

socket.on ('connect',()=>{
    console.log(`connected to loman server`)
    socket.on('message', message => {
        // console.log(`message received`) //untuk memunculkan keseluruhan message
        // console.log(message)
        // console.log('----\n\n')

        processMsg(message)
    })
})

socket.connect(process.env.PORT,process.env.IP)