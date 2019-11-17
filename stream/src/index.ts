import express from 'express'
import schemas, {companySchema, patentSchema} from './schemas'
import * as Joi from 'joi'
import asyncMiddleware from './middleware/asyncMiddleware'
import axios from 'axios'
import validationMiddleware from './middleware/validationMiddleware'
import { InterfaceFrom } from "types-joi";
import socketIO from 'socket.io'
import { JoiError } from 'middleware/errorHandler'
import http from 'http'
import { createCompanyFields, createPatentsFields } from './utils/createFields'
import { normalize } from 'normalizr'
const app = express();

const server = http.createServer(app)
const io = socketIO(server)

const service = axios.create({
  baseURL: 'http://webapi.patentsview.org/api',
  
})
const config = {
  onUploadProgress: (progressEvent: any) => console.log(progressEvent.loaded)
}
io.on('connection', ws => {
  ws.on('REQUEST_COMPANIES', async(data) => {
    ws.emit('POLL_RESPONSE', {message: 'starting to fetch companies'})
    const result = await service.get('/assignees/query', {
      ...createCompanyFields(data),
      onUploadProgress: (progressEvent: any) => console.log(progressEvent.loaded)
      // @ts-ignore
    })

    ws.emit('POLL_RESPONSE', {message: 'completed fetch'})
    ws.emit('DATA_COMPLETE', result.data)
    ws.emit('POLL_RESPONSE', {message: 'sent data'})
  })
})
app.set('view engine', 'ejs')
const port = process.env.NODE_ENV || 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // @ts-ignore
  const sse = function (req, res, next) {
    res.sseSetup = function() {
      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
      });
    }
  // @ts-ignore
    res.sseSend = function(data) {
      res.write("event: " + JSON.stringify(data) + "\n");
      res.write("\n\n");
      res.end()
    }
  
    next()
  }
  app.use(sse)
// @ts-ignore
// app.get('/api/companies', validationMiddleware(schemas.companySchema), asyncMiddleware(async(req, res) => {
app.get('/api/companies', validationMiddleware(schemas.companySchemaType), asyncMiddleware(async(req, res) => {
  
const {data} = await service.get('/assignees/query', createCompanyFields(req.query))

const { entities, result } = normalize(data.assignees || [], [companySchema])

    res.json({ ids: result, entities, count: data.count, total: data.total_assignee_count },)
}))

  

app.get('/api/patents', validationMiddleware(schemas.patentsSchemaType), asyncMiddleware(async(req, res) => {
    // console.log(req)
    const {data} = await service.get(`/patents/query`, createPatentsFields(req.query))
    const { entities, result } = normalize(data.patents || [], [patentSchema])
      
      
    res.json(  { ids: result, entities, count: data.count, total: data.total_patent_count })
}))

const errorHandler = (err: JoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
// @ts-ignore
    console.log(err)
    return res.status(err.status).json({message: err.message})
}

app.use(errorHandler)

server.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})







