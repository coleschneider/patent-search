interface AssigneedDetails {
  assignee_first_name: string | null
  assignee_first_seen_date: string | null
  assignee_id: string
  assignee_last_name: string | null
  assignee_last_seen_date: string | null
  assignee_lastknown_city: string | null
  assignee_lastknown_country: string | null
  assignee_lastknown_location_id: string | null
  assignee_lastknown_state: string | null
  assignee_organization: string | null
  assignee_total_num_patents: string | null
}

interface PatentsById {
  patent_id: string
}

interface PaginationConfig {
  count: number
  total: number
  page: number
}

interface CompanySearchResponse extends CompanyPaginationConfig {
  assignees: AssigneedDetails[] | null
  patents: PatentsById[]
}

interface Applications {
  app_date: string
  app_id: string
}
interface Assignees {
  assignee_city: string | null
  assignee_country: string | null
  assignee_first_name: string | null
  assignee_last_name: string | null
  assignee_id: string | null
  assignee_location_id: string | null
  assignee_organization: string | null
  assignee_state: string | null
}
interface CPC {
  cpc_group_title: string | null
  cpc_group_id: string | null
}
interface GovInterests {
  govint_org_id: string | null
  govint_org_name: string | null
}
interface Inventors {
  inventor_city: string | null
  inventor_country: string | null
  inventor_first_name: string | null
  inventor_last_name: string | null
  inventor_location_id: string | null
  inventor_state: string | null
}

interface NBERS {
  nber_subcategory_id: string | null
  nber_subcategory_title: string | null
}

interface USPCS {
  uspc_mainclass_id: string | null
  uspc_mainclass_title: string | null
  uspc_sequence: string | null
}

interface Patent {
  applications: Applications[]
  assignees: Assignees[]
  cpcs: CPC[]
  gov_interests: GovInterests[]
  inventors: Inventors[]
  nbers: NBERS[]
  patent_date: string
  patent_id: string
  patent_num_cited_by_us_patents: string
  patent_number: string
  patent_title: string
  patent_type: string
}

interface PatentPaginationConfig {
  count: number
  page: number
  total_patent_count: number
}

interface PatentSearchResponse extends PatentPaginationConfig {
  patents: Patent[] | null
}
