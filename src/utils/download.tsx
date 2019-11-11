import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import * as _ from 'lodash'
import { companyPatents, companyPatentsLimit } from './service'

/*
{
    "applicationType":"UTILITY",
    "documentId":"US10001983B2"
    "applicationNumber":"US15221496"
    "documentType":"grant"
    "patentNumber":"10001983"
    "publicationDate":"2018-06-19T00:00:00Z"
    "documentDate":"2018-06-19T00:00:00Z"
    "productionDate":"2018-06-04T00:00:00Z"
    "applicationDate":"2016-07-27T00:00:00Z"
    "applicant":["salesforce.com
     inc."]
    "inventor":["Roy
     Saptarshi"
    "Silver
     Daniel C."
    "Schneider
     Donovan"
    "Pradhan
     Medha"
    "Lamore
     Ryan"
    "Rao
     Naveen Purushothama"
    "Geh
     Nicholas"
    "Koneru
     Srirama"]
    "assignee":["salesforce.com
     Inc."]
    "title":"Rolling Version Update Deployment Utilizing Dynamic Node Allocation"
    "archiveUrl":"https:\/\/bulkdata.uspto.gov\/data\/patent\/grant\/redbook\/fulltext\/2018\/ipg180619.zip"
    "pdfPath":"NOTAVAILABLE"
    "year":"2018"
    "_version_":1603727683805511680}
*/

async function download(filename, company: string) {
  const wb = XLSX.utils.book_new()
  const { data } = await companyPatentsLimit(company, 1)
  /* For each patent */

  // const workbookPayload = data.patents.map(patent => {
  //   return _.omit<Patent>(patent, ['applications', 'cpcs', 'nbers', 'inventors', 'gov_interests', 'assignees', 'uspcs'])
  // })
  const workbookPayload = data.patents.map(patent => {
    const applications = patent.applications.reduce((acc, curr, index) => {
      const { app_date, app_id } = curr
      const appDate = `app_date_${index}`
      const appId = `app_id_${index}`
      acc[appDate] = app_date
      acc[appId] = app_id
      return acc
    }, {})
    const cpcs = patent.cpcs.reduce((acc, curr, index) => {
      const { cpc_group_id, cpc_group_title } = curr
      const cpcGroupTitle = `cpc_group_title_${index}`
      const cpcGroupId = `cpc_group_id_${index}`
      acc[cpcGroupTitle] = cpc_group_title
      acc[cpcGroupId] = cpc_group_id
      return acc
    }, {})
    const nbers = patent.nbers.reduce((acc, curr, index) => {
      const { nber_subcategory_id, nber_subcategory_title } = curr
      const nberSubcategoryId = `nber_subcategory_id_${index}`
      const nberSubCategoryTitle = `nber_subcategory_title_${index}`
      acc[nberSubcategoryId] = nber_subcategory_id
      acc[nberSubCategoryTitle] = nber_subcategory_title
      return acc
    }, {})
    const inventors = patent.inventors.reduce((acc, curr, index) => {
      const {
        inventor_city,
        inventor_country,
        inventor_first_name,
        inventor_last_name,
        inventor_state,
        inventor_location_id,
      } = curr
      const inventorCity = `inventor_city_${index}`
      const inventorCountry = `inventor_country_${index}`
      const inventorFirstName = `inventor_first_name_${index}`
      const inventorLastName = `inventor_last_name_${index}`
      const inventorState = `inventor_state_${index}`
      const inventorLocationId = `inventor_location_id_${index}`

      acc[inventorCity] = inventor_city
      acc[inventorCountry] = inventor_country
      acc[inventorFirstName] = inventor_first_name
      acc[inventorLastName] = inventor_last_name
      acc[inventorState] = inventor_state
      acc[inventorLocationId] = inventor_location_id
      return acc
    }, {})
    const govInterests = patent.gov_interests.reduce((acc, curr, index) => {
      const { govint_org_id, govint_org_name } = curr
      const govInterestOrgId = `govint_org_id_${index}`
      const govInterestOrgName = `govint_org_name_${index}`

      acc[govInterestOrgId] = govint_org_id
      acc[govInterestOrgName] = govint_org_name
      return acc
    }, {})
    const USPCS = patent.uspcs.reduce((acc, curr, index) => {
      const { uspc_mainclass_id, uspc_mainclass_title, uspc_sequence } = curr
      const uscpcMainClassId = `uspc_mainclass_id_${index}`
      const uscpcMainClassTitle = `uspc_mainclass_title_${index}`
      const uscpcMainClassSequence = `uspc_sequence_${index}`

      acc[uscpcMainClassId] = uspc_mainclass_id
      acc[uscpcMainClassTitle] = uspc_mainclass_title
      acc[uscpcMainClassSequence] = uspc_sequence
      return acc
    }, {})
    const assignees = patent.assignees.reduce((acc, curr, index) => {
      const {
        assignee_city,
        assignee_country,
        assignee_first_name,
        assignee_last_name,
        assignee_id,
        assignee_location_id,
        assignee_organization,
        assignee_state,
      } = curr
      const assigneeCity = `assignee_city_${index}`
      const assigneeCountry = `assignee_country_${index}`
      const assigneeFirstName = `assignee_first_name_${index}`
      const assigneeLastName = `assignee_last_name_${index}`
      const assigneeId = `assignee_id_${index}`
      const assigneeLocationId = `assignee_location_id_${index}`
      const assigneeOrganization = `assignee_organization_${index}`
      const assigneeState = `assignee_state_${index}`

      acc[assigneeCity] = assignee_city
      acc[assigneeCountry] = assignee_country
      acc[assigneeFirstName] = assignee_first_name
      acc[assigneeLastName] = assignee_last_name
      acc[assigneeId] = assignee_id
      acc[assigneeLocationId] = assignee_location_id
      acc[assigneeOrganization] = assignee_organization
      acc[assigneeState] = assignee_state
      return acc
    }, {})
    return {
      ..._.omit<Patent>(patent, ['applications', 'cpcs', 'nbers', 'inventors', 'gov_interests', 'assignees', 'uspcs']),
      ...applications,
      ...cpcs,
      ...nbers,
      ...USPCS,
      ...assignees,
      ...govInterests,
      ...inventors,
    }
  })

  wb.Props = {
    Title: `${company} Patents`,
    Subject: 'Test',
    // Author: `${firstName} ${lastName}`,
    CreatedDate: new Date(2017, 12, 19),
  }

  wb.SheetNames.push('Test Sheet')

  // const parsedWorkbook = companyPatents.reduce(patent => {

  // })
  // const payload = [{ hello: 'world', hello2: 'world 2' }, { hello: 'world-3', hello2: 'world-4' }]

  const ws = XLSX.utils.json_to_sheet(workbookPayload)
  wb.Sheets['Test Sheet'] = ws
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx')
}

export default download
