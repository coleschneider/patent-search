import { saveAs } from 'file-saver'
import * as _ from 'lodash'

async function download(buff: string) {
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  saveAs(new Blob([s2ab(buff)], { type: 'application/octet-stream' }), 'test.xlsx')
}

export default download
