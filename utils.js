const date = require('date-and-time');

const monthsToNum = {
    'jan': 0,
    'feb': 1,
    'mar': 2,
    'apr': 3,
    'may': 4,
    'jun': 5,
    'jul': 6,
    'aug': 7,
    'sep': 8,
    'oct': 9,
    'nov': 10,
    'dec': 11,
}

const numToMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'auh', 'sep', 'oct', 'nov', 'dec']

exports.transformToMonth = (data, month = null) => {
    const summToMonth = {};

    for (const row of data){
        let curDay = date.addDays(row.date, -7);
        let workingDays = 0;
        const temp = {}
        for (; curDay < row.date; curDay = date.addDays(curDay, 1)){
            if (curDay.getDay() === 0 || curDay.getDay() === 6) {
                continue;
            }
            workingDays++;
            if(temp[curDay.getMonth()]) temp[curDay.getMonth()]++;
            else temp[curDay.getMonth()] = 1;
        }
        for (const month in temp){
            const summ = temp[month]/workingDays * row.summ;
            if(summToMonth[month]) summToMonth[month] += summ;
            else summToMonth[month] = summ
        }
    }

    if(month) return {[monthsToNum[month]]: summToMonth[monthsToNum[month]]};
    else return summToMonth
}

exports.format = (summToMonth) => {
    const formatSummToMonth = {}
    for (const row in summToMonth){
        formatSummToMonth[numToMonths[row]] = summToMonth[row]
    }
    return formatSummToMonth;
}


