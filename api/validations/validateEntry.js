import isMatch from 'date-fns/isMatch/index.js';
import isSameMonth from 'date-fns/isSameMonth/index.js';

const validateEntry = (body, incomeList) => {
  const format = 'yyyy-MM-dd'
  const validDateFormat = isMatch(body.date, format);
  if (!validDateFormat) {
    return {
      valid: false,
      message: `Date format is not accepted, please use ${format} format`
    };
  }

  if (incomeList.length > 0) {
    const sameMonthEntry = incomeList.some(income => {
      return isSameMonth(new Date(body.date), new Date (income.date));
    });
    if(sameMonthEntry) {
      return {
        valid: false,
        message: 'This entry has been registered already.'
      }
    }
  }
  return {
    valid: true,
  };
}

export default validateEntry;
