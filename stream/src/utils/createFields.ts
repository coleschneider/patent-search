const queryBy = (searchBy: Fields[], term: string) => {
  return {
    _and: [
      {
        _or: searchBy.map(field => ({
          _and: [
            {
              _contains: {
                [field]: `${term}`,
              },
            },
          ],
        })),
      },
      {
        uspc_sequence: 0,
      },
    ],
  }
}
const companyOptions = (page: number) => ({
  per_page: 25,
  matched_subentities_only: true,
  sort_by_subentity_counts: 'patent_id',
  page: `${page}`,
})

interface CompanyParams {
  page: number
  company: string
}

interface PatentParams extends CompanyParams {
  per_page: number
}
const params = {
  companyFactory: ({ page, company }: CompanyParams, fields: Fields[]) => ({
    s: JSON.stringify([
      {
        patent_id: 'desc',
      },
      {
        assignee_total_num_patents: 'desc',
      },
      {
        assignee_organization: 'asc',
      },
      {
        assignee_last_name: 'asc',
      },
      {
        assignee_first_name: 'asc',
      },
    ]),
    f: JSON.stringify([
      'assignee_id',
      'assignee_first_name',
      'assignee_last_name',
      'assignee_organization',
      'assignee_lastknown_country',
      'assignee_lastknown_state',
      'assignee_lastknown_city',
      'assignee_lastknown_location_id',
      'assignee_total_num_patents',
      'assignee_first_seen_date',
      'assignee_last_seen_date',
      'patent_id',
    ]),
    o: JSON.stringify({
      per_page: 25,
      matched_subentities_only: true,
      sort_by_subentity_counts: 'patent_id',
      page: `${page}`,
    }),
    q: JSON.stringify(queryBy(fields, company)),
  }),
  patentsFactory: ({ per_page, page, company }: PatentParams, fields: Fields[]) => ({
    f: JSON.stringify([
      'patent_id',
      'patent_title',
      'uspc_sequence',
      'uspc_mainclass_id',
      'uspc_mainclass_title',
      'cpc_group_id',
      'cpc_group_title',
      'nber_subcategory_id',
      'nber_subcategory_title',
      'patent_type',
      'patent_num_cited_by_us_patents',
      'app_date',
      'patent_date',
      'patent_number',
      'inventor_id',
      'inventor_first_name',
      'inventor_last_name',
      'inventor_country',
      'inventor_state',
      'inventor_city',
      'inventor_location_id',
      'assignee_id',
      'assignee_first_name',
      'assignee_last_name',
      'assignee_organization',
      'assignee_country',
      'assignee_state',
      'assignee_city',
      'assignee_location_id',
      'app_date',
      'patent_date',
      'govint_org_id',
      'govint_org_name',
    ]),
    s: JSON.stringify([
      {
        patent_num_cited_by_us_patents: 'desc',
      },
      {
        patent_title: 'asc',
      },
      {
        patent_date: 'desc',
      },
    ]),
    o: JSON.stringify({
      per_page,
      matched_subentities_only: false,
      page,
    }),
    q: JSON.stringify(queryBy(fields, company)),
  }),
}

type CompanyFields =
  | 'assignee_id'
  | 'assignee_first_name'
  | 'assignee_last_name'
  | 'assignee_organization'
  | 'assignee_lastknown_country'
  | 'assignee_lastknown_state'
  | 'assignee_lastknown_city'
  | 'assignee_lastknown_location_id'
  | 'assignee_total_num_patents'
  | 'assignee_first_seen_date'
  | 'assignee_last_seen_date'
  | 'patent_id'

type Fields =
  | 'assignee_id'
  | 'assignee_first_name'
  | 'assignee_last_name'
  | 'assignee_organization'
  | 'assignee_lastknown_country'
  | 'assignee_lastknown_state'
  | 'assignee_lastknown_city'
  | 'assignee_lastknown_location_id'
  | 'assignee_total_num_patents'
  | 'assignee_first_seen_date'
  | 'assignee_last_seen_date'
  | 'patent_id'
  | 'patent_title'
  | 'uspc_sequence'
  | 'uspc_mainclass_id'
  | 'uspc_mainclass_title'
  | 'cpc_group_id'
  | 'cpc_group_title'
  | 'nber_subcategory_id'
  | 'nber_subcategory_title'
  | 'patent_type'
  | 'patent_num_cited_by_us_patents'
  | 'app_date'
  | 'patent_date'
  | 'patent_number'
  | 'inventor_id'
  | 'inventor_first_name'
  | 'inventor_last_name'
  | 'inventor_country'
  | 'inventor_state'
  | 'inventor_city'
  | 'inventor_location_id'
  | 'assignee_id'
  | 'assignee_first_name'
  | 'assignee_last_name'
  | 'assignee_organization'

export const createCompanyFields = (
  q: CompanyParams,
  searchyBy: Fields[] = ['assignee_first_name', 'assignee_last_name', 'assignee_organization'],
) => ({
  params: params.companyFactory(q, searchyBy),
})
export const createPatentsFields = (
  q: PatentParams,
  searchyBy: Fields[] = ['assignee_first_name', 'assignee_last_name', 'assignee_organization'],
) => ({
  params: params.patentsFactory(q, searchyBy),
})