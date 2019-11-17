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

async function download(buff) {
  // const wb = XLSX.utils.book_new()
  // const { data } = await companyPatentsLimit(company, 1)

  // const t1 = performance.now()
  // console.log(`Call to workPayload took ${t1 - t0} milliseconds.`)
  // wb.Props = {
  //   Title: `${company} Patents`,
  //   Subject: 'Test',
  //   // Author: `${firstName} ${lastName}`,
  //   CreatedDate: new Date(2017, 12, 19),
  // }

  // wb.SheetNames.push('Test Sheet')

  // // const parsedWorkbook = companyPatents.reduce(patent => {

  // // })
  // // const payload = [{ hello: 'world', hello2: 'world 2' }, { hello: 'world-3', hello2: 'world-4' }]

  // const ws = XLSX.utils.json_to_sheet(workbookPayload)
  // wb.Sheets['Test Sheet'] = ws
  // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  saveAs(new Blob([s2ab(buff)], { type: 'application/octet-stream' }), 'test.xlsx')
}

export default download
