import * as Joi from 'joi';
import JoiTypes, { InterfaceFrom } from 'types-joi';
import {normalize,schema} from 'normalizr'



export const companySchema = new schema.Entity(
    'companies',
    {},
    {
      idAttribute: company => {
        return company.assignee_id
      },
    },
  )
export const patentSchema = new schema.Entity(
    'patents',
    {},
    {
      idAttribute: patent => {
        return patent.patent_id
      },
    },
  )


const companySchemaType = Joi.object({
    company: Joi.string().required(),
    page: Joi.number().required(),

}).required()
const patentsSchemaType = Joi.object({
    company: Joi.string().required(),
    page: Joi.number().required(),
    per_page: Joi.number().optional()
}).required()
// type CompanySchema = InterfaceFrom<typeof companySchema>

// export type SchemaDefinitions = CompanySchema
export default {
    companySchemaType,
    patentsSchemaType
}