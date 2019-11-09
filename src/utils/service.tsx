import axios from 'axios'

// const baseURL = 'https://cors-anywhere.herokuapp.com/https://developer.uspto.gov'
// const defaultParams = {
//   start: 0,
//   rows: 100,
//   dateFrom: '2001-01-01',
//   dateTo: '2019-11-06',
//   sortOrder: 'asc',
// }
// const service = axios.create({ baseURL, params: defaultParams })

export const companyPatents = (company: string, page: number) =>
  axios.get<ChartersSearchResponse>(
    `https://cors-anywhere.herokuapp.com/http://webapi.patentsview.org/api/patents/query?q={"_and":[{"_or":[{"_and":[{"_contains":{"assignee_first_name":"${company}"}}]},{"_and":[{"_contains":{"assignee_last_name":"${company}"}}]},{"_and":[{"_contains":{"assignee_organization":"${company}"}}]}]},{"uspc_sequence":0}]}&f=["patent_id","patent_title","uspc_sequence","uspc_mainclass_id","uspc_mainclass_title","cpc_group_id","cpc_group_title","nber_subcategory_id","nber_subcategory_title","patent_type","patent_num_cited_by_us_patents","app_date","patent_date","patent_number","inventor_id","inventor_first_name","inventor_last_name","inventor_country","inventor_state","inventor_city","inventor_location_id","assignee_id","assignee_first_name","assignee_last_name","assignee_organization","assignee_country","assignee_state","assignee_city","assignee_location_id","app_date","patent_date","govint_org_id","govint_org_name"]&o={"per_page":25,"matched_subentities_only":false,"page":${page}}&s=[{"patent_num_cited_by_us_patents":"desc"},{"patent_title":"asc"},{"patent_date":"desc"}]`,
  )
export const companySearch = (company: string, page: number) =>
  axios.get<CompanySearchResponse>(
    `https://cors-anywhere.herokuapp.com/http://webapi.patentsview.org/api/assignees/query?q={"_and":[{"_or":[{"_and":[{"_contains":{"assignee_first_name":"${company}"}}]},{"_and":[{"_contains":{"assignee_last_name":"${company}"}}]},{"_and":[{"_contains":{"assignee_organization":"${company}"}}]}]},{"uspc_sequence":0}]}&f=["assignee_id","assignee_first_name","assignee_last_name","assignee_organization","assignee_lastknown_country","assignee_lastknown_state","assignee_lastknown_city","assignee_lastknown_location_id","assignee_total_num_patents","assignee_first_seen_date","assignee_last_seen_date","patent_id"]&o={"per_page":25,"matched_subentities_only":true,"sort_by_subentity_counts":"patent_id","page":${page}}&s=[{"patent_id":"desc"},{"assignee_total_num_patents":"desc"},{"assignee_organization":"asc"},{"assignee_last_name":"asc"},{"assignee_first_name":"asc"}]`,
  )
