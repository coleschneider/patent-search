import axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT
const baseURL = `${apiEndpoint}/api`
const service = axios.create({
  baseURL,
})
export const companyPatents = (company: string, page: number) =>
  service.get<PatentSearchResponse>(`/patents`, {
    params: {
      company,
      page,
    },
  })
export const companyPatentsLimit = (company: string, page: number) =>
  service.get<PatentSearchResponse>(`/companies`, {
    params: {
      company,
      page,
    },
  })

export const companySearch = (company: string, page: number) =>
  service.get<CompanySearchResponse>(`/companies`, {
    params: {
      company,
      page,
    },
  })
