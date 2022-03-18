import Income from '../models/income.js';
import validateEntry from '../validations/validateEntry.js';
import isSameMonth from "date-fns/isSameMonth/index.js";

const incomeEntry = async (body) => {
 const incomeList = await Income.find({ description: body.description }).exec();
 const validate = validateEntry(body, incomeList);
 if (!validate.valid) {
    throw new Error(validate.message);
  }

  let entry = new Income({
    user: body.user,
    description: body.description,
    amount: body.amount,
    date: body.date
  });
  return entry.save()
    .then(income => { return income; })
    .catch(e => { throw new Error(e); });
}

const getIncomeList = async (query) => {
  if(query.hasOwnProperty('description')) {
    const income = await Income.find({ description: query.description}).exec();
    if (income.length > 0) {
      return income.map(income => {
        return {
          description: income.description,
          amount: income.amount,
          date: income.date,
        }
      });
    }
    throw new Error(`No income with description: ${query.description}`);
  }
  const incomeList = await Income.find({}).exec();

  return incomeList.map(income => {
    return {
      description: income.description,
      amount: income.amount,
      date: income.date,
    }
  });
}

const getIncomeById = async (id) => {
  const income = await Income.findById(id).exec();
  if (!income) {
    throw new Error (`There is no income with ID ${id}`);
  }
  return {
    description: income.description,
    amount: income.amount,
    date: income.date,
  }
}

const getIncomeByMonth = async (month, year) => {
  const incomeList = await Income.find({}).exec();
  return incomeList.filter(income => {
    return isSameMonth(new Date(`${year}-${month}-01 00:00`), new Date(income.date))
  }).map(income => {
    return {
      description: income.description,
      amount: income.amount,
      date: income.date,
    }
  });
}

const updateIncome = async (id, body) => {
  const income = await Income.findById(id).exec();
  if (!income) {
    throw new Error (`There is no income with ID ${id}`);
  }
  const incomeList = await Income.find({date: body.date, description: body.description}).exec();
  const validate = validateEntry(body, incomeList);
  if (!validate.valid) {
    throw new Error(validate.message);
  }

  income.description = body.description;
  income.amount = body.amount;
  income.date = body.date;
  return income.save()
    .then(income => { return income; })
    .catch(e => { throw new Error(e); });
}

const deleteIncome = async (id) => {
  const deletedIncome = await Income.findByIdAndDelete(id).exec();
  if (!deletedIncome) {
    throw new Error (`There is no income with ID ${id}`);
  }
  return 'Successfully delete.';
}

export default {
  incomeEntry,
  getIncomeList,
  getIncomeById,
  getIncomeByMonth,
  updateIncome,
  deleteIncome
}
