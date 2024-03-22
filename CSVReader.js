// Usage: node CSVReader.js
const fs = require('fs')
const fastCsv = require('fast-csv')

const datas = {}
const options = { headers: true, delimiters: '\t' }

fastCsv
  .parseFile('./data.csv', options)
  .on('data', d => {
    if (!datas[d.insurance]) datas[d.insurance] = []
    datas[d.insurance].push(d)
  })
  .on('end', () => {
    Object.keys(datas).forEach(insurance => {
      datas[insurance].sort((a, b) => {
        const [aFirstName, aLastName] = a.name.split(' ')
        const [bFirstName, bLastName] = b.name.split(' ')
        return (
          aLastName.localeCompare(bLastName) ||
          aFirstName.localeCompare(bFirstName)
        )
      })
      datas[insurance] = datas[insurance].reduce((unique, o) => {
        const found = unique.findIndex(obj => obj.userId === o.userId)
        if (found > -1 && parseInt(unique[found].version) < parseInt(o.version)) {
          unique[found] = o
        } else if (found === -1) {
          unique.push(o)
        }           
        
        return unique
      }, [])
      fastCsv
        .write(datas[insurance], options)
        .pipe(fs.createWriteStream(`./data-id-${insurance}.csv`))
    })
  })
