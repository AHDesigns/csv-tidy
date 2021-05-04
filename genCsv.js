const parse = require('csv-parse/lib/sync')
const stringify = require('csv-stringify')
const fs = require('fs')
const pick = require('lodash.pick');

const [csvPath] = process.argv.slice(2);

const data = fs.readFileSync(csvPath)

const records = parse(data, {
  columns: true,
  skipEmptyLines: true,
})

const columns = ['Summary', 'Status', 'Project key', 'Created', 'Updated', 'Custom field (Story Points)'];

const tidy = records
    .map(r => pick(r, columns))
    .filter(r => r['Custom field (Story Points)'] && r.Status === 'Done')


stringify(tidy, { header: true, columns }, (err, cleanCsv) => {
  if (err) {
    console.error(err)
  } else {
    fs.writeFileSync('out.csv', cleanCsv);
  }
});


