import Expenses from '../models/expenses.js';
import validateEntry from '../validations/validateEntry.js';
import isSameMonth from "date-fns/isSameMonth/index.js";

const expensesEntry = async (body, query) => {
  let category = 'Outras';
  if (query.hasOwnProperty('category')) {
    category = query.category;
  }
  const expensesList = await Expenses.find({ description: body.description }).exec();
  const validate = validateEntry(body, expensesList);

  if (!validate.valid) {
    throw new Error(validate.message);
  }

  let entry = new Expenses({
    user: body.user,
    description: body.description,
    amount: body.amount,
    date: body.date,
    category: category,
  });
  return entry.save()
    .then(expense => { return expense; })
    .catch(e => { throw new Error(e); });
}

const getExpensesList = async (query) => {
  if(query.hasOwnProperty('description')) {
    const expense = await Expenses.find({ description: query.description}).exec();
    if (expense.length > 0) {
      return expense.map(expense => {
        return {
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
        }
      })
    }
    throw new Error(`No expenses with description: ${query.description}`);
  }
  const expensesList = await Expenses.find({}).exec();

  return expensesList.map(expense => {
    return {
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
    }
  });
}

const getExpensesById = async (id) => {
  const expense = await Expenses.findById(id).exec();
  if (!expense) {
    throw new Error (`There is no expenses with ID ${id}`);
  }
  return {
    description: expense.description,
    amount: expense.amount,
    date: expense.date,
  }
}

const getExpensesByMonth = async (month, year) => {
  const expensesList = await Expenses.find({}).exec();
  return expensesList.filter(expense => {
    return isSameMonth(new Date(`${year}-${month}-01 00:00`), new Date(expense.date))
  }).map(expense => {
    return {
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
    }
  });
}

const updateExpenses = async (id, body) => {
  const expense = await Expenses.findById(id).exec();
  if (!expense) {
    throw new Error (`There is no expenses with ID ${id}`);
  }
  const expensesList = await Expenses.find({date: body.date, description: body.description}).exec();
  const validate = validateEntry(body, expensesList);
  if (!validate.valid) {
    throw new Error(validate.message);
  }

  expense.description = body.description;
  expense.amount = body.amount;
  expense.date = body.date;
  return expense.save()
    .then(expense => { return expense; })
    .catch(e => { throw new Error(e); });
}

const deleteExpenses = async (id) => {
  const deletedExpense = await Expenses.findByIdAndDelete(id).exec();
  if (!deletedExpense) {
    throw new Error (`There is no expenses with ID ${id}`);
  }
  return 'Successfully delete.';
}

export default {
  expensesEntry,
  getExpensesList,
  getExpensesById,
  getExpensesByMonth,
  updateExpenses,
  deleteExpenses
}
