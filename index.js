const csv = require('csv-parser');
const fs = require('fs');
const date = require('date-and-time');
const {transformToMonth, format} = require('./utils')
const results = [];

fs.createReadStream('sales.csv')
    .pipe(csv({separator: ';'}))
    .on('data', (data) => results.push({date: date.addDays(date.parse(data.date, 'DD.MM.YYYY'), 1), summ: data.summ}))
    .on('end', () => {
        const summToMonth = transformToMonth(results)
        console.log(format(summToMonth))
    });

