import {Request, Response,NextFunction} from 'express';
import * as Joi from 'joi'
// import {SchemaDefinitions} from '../schemas'
import asyncMiddleware from './asyncMiddleware'
import { JoiError } from './errorHandler';
// import {Schema} from 'types-joi'

const validationMiddleware = (schema: any) => asyncMiddleware((req: Request, res: Response, next: NextFunction) => {
    // const validation = Joi.validate(req.query, schema)
    // @ts-ignore
    return Joi.validate(req.query, schema).then(result => {
        console.log({result})
        next()
    }).catch(err => {
        throw new JoiError(err)
    })
})

export default validationMiddleware