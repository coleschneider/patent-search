import axios from 'axios'

const proxyUrl = process.env.PROXY_URL
const api = 'http://webapi.patentsview.org/api'
const baseURL = `http://localhost:8080/api`
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
