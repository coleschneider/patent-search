import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

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

function download(filename, { company, firstName, lastName }, data: SearchResponse) {
  const payload = data.docs.map(companyPatent =>
    Object.keys(companyPatent).reduce((acc, company) => {
      const columnTitle = typeof company !== 'string' ? '' : company.charAt(0).toUpperCase() + company.slice(1)
      const value = companyPatent[company]
      acc[columnTitle] = typeof value === 'string' ? value : value.toString()
      return acc
    }, {}),
  )

  const wb = XLSX.utils.book_new()
  wb.Props = {
    Title: `${company} Patents`,
    Subject: 'Test',
    Author: `${firstName} ${lastName}`,
    CreatedDate: new Date(2017, 12, 19),
  }

  wb.SheetNames.push('Test Sheet')
  //   const payload = [{ hello: 'world', hello2: 'world 2' }, { hello: 'world-3', hello2: 'world-4' }]

  const ws = XLSX.utils.json_to_sheet(payload)
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
