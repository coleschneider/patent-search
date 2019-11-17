import {ValidationError} from 'joi'

export class JoiError  {
    message: string;
    status: number
    constructor(err: ValidationError){
        this.message = err.message
        this.status = 400
        
    }
}

