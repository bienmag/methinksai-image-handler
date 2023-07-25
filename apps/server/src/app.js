import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

export function startServer() {
  const port = 8080

  const server=app.listen(port,() => console.log(`Listening on port ${port}`))
process.on('SIGTERM', ()=> {
  server.close()
})
return server
}
