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
interface CharterPaginationConfig {
  count: number
  page: number
  total_patent_count: number
}

interface ChartersSearchResponse extends CharterPaginationConfig {
  patents: Patent[] | null
}

interface Action<T> {
  type: T
}
interface ActionMeta<T, M> {
  type: T
  meta: M
}

interface PayloadedAction<T, P> {
  type: T
  payload: P
}
interface PayloadedActionMeta<T, P, M> {
  type: T
  payload: P
  meta: M
}
interface PayloadedError<T, M> {
  type: T
  errors: any
  meta: M
}

interface CompanyState extends PaginationConfig {
  ids: never[]
  isFetching: boolean
  errors: any
}
interface PatentState extends PaginationConfig {
  ids: never[]
  isFetching: boolean
  errors: any
}
type BySearchTerm<T> = {
  [k: string]: {
    [t: string | number]: T
  }
}
type ById<T> = {
  [k: string]: T
}
interface EntityState {
  companies: ById<AssigneedDetails>
  patents: ById<Patent>
}
type ErrorMessageState = string | null

interface State {
  companySearches: BySearchTerm<CompanyState>
  patentsByCompany: BySearchTerm<PatentState>
  errorMessage: ErrorMessageState
  entities: EntityState
}
type Pagination = {
  page: number
  search: string
}

// Company ActionTypes
type FETCH_COMPANIES = 'FETCH_COMPANIES'
type FETCH_COMPANIES_COMPLETE = 'FETCH_COMPANIES_COMPLETE'
type FETCH_COMPANIES_ERROR = 'FETCH_COMPANIES_ERROR'
type CompanyActionTypesUnion = FETCH_COMPANIES | FETCH_COMPANIES_COMPLETE | FETCH_COMPANIES_ERROR

type CompanyActionTypes = {
  [k in CompanyActionTypesUnion]: K
}
// Company Actions
type FetchCompanies = ActionMeta<FETCH_COMPANIES, Pagination>
type FetchCompaniesComplete = PayloadedActionMeta<FETCH_COMPANIES_COMPLETE, CompanySearchResponse, Pagination>
type FetchCompaniesError = PayloadedError<FETCH_COMPANIES_ERROR, Pagination>
type CompanyActions = FetchCompanies | FetchCompaniesComplete

// Patent ActionTypes
type FETCH_PATENTS = 'FETCH_PATENTS'
type FETCH_PATENTS_COMPLETE = 'FETCH_PATENTS_COMPLETE'
type FETCH_PATENTS_ERROR = 'FETCH_PATENTS_ERROR'
type PatentActionTypesUnion = FETCH_PATENTS | FETCH_PATENTS_COMPLETE | FETCH_PATENTS_ERROR
type PatentActionTypes = {
  [k in PatentActionTypesUnion]: K
}
// Patent Actions
type FetchPatents = ActionMeta<FETCH_PATENTS, Pagination>
type FetchPatentsComplete = PayloadedActionMeta<FETCH_PATENTS_COMPLETE, ChartersSearchResponse, Pagination>
type FetchPatentsError = PayloadedError<FETCH_PATENTS_ERROR>
type PatentActions = FetchPatents | FetchPatentsComplete | FetchPatentsError

// Error Message ActionTypes
type SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
type CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'
type ErrorMessageActionTypesUnion = SET_ERROR_MESSAGE | CLEAR_ERROR_MESSAGE

type ErrorMessageActionTypes = {
  [K in ErrorMessageActionTypesUnion]: K
}
// Error Message Actions

type SetErrorMessagee = PayloadedAction<SET_ERROR_MESSAGE, { message: string }>
type ClearErrorMessage = Action<CLEAR_ERROR_MESSAGE>
type ErrorMessageActions = SetErrorMessagee | ClearErrorMessage

//  All Actions
type Actions = PatentActions | CompanyActions | ErrorMessageActions