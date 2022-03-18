import Expenses from '../models/expenses.js';
import Income from '../models/income.js';
import expensesController from "./expensesController.js";
import incomeController from "./incomeController.js";
import income from "../models/income.js";
import isSameMonth from "date-fns/isSameMonth/index.js";
import expenses from "../models/expenses.js";

const getMonthStatement = async (year, month) => {
  const incomeStatement = await totalIncome(year, month);
  const expensesStatement = await totalExpenses(year, month);
  const balance = monthBalance(incomeStatement.amount, expensesStatement.amount);
  const category = await categoryExpenses(year, month);
  return {
    totalIncome: incomeStatement.amount,
    totalExpenses: expensesStatement.amount,
    monthBalance: balance,
    categoryExpenses: category
  };
}

const totalIncome = async (year, month) => {
  const incomeList = await incomeController.getIncomeByMonth(month, year);
  return incomeList.reduce((previousValue, currentValue) => ({amount: previousValue.amount + currentValue.amount}));
}

const totalExpenses = async (year, month) => {
  const expensesList = await expensesController.getExpensesByMonth(month, year);
  return expensesList.reduce((previousValue, currentValue)=> ({amount: previousValue.amount + currentValue.amount}));
}

const monthBalance = (income, expenses) => {
  return income - expenses;
}

const categoryExpenses = async (year, month) => {
  let amountSom;
  let amountList = [];
  const expensesList = await Expenses.find({}).exec();
  const categories = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras'];
  const filteredList =  expensesList.filter(expense => {
    return isSameMonth(new Date(`${year}-${month}-01 00:00`), new Date(expense.date))
  });

  return categories.map((category, index) => {
    const expensesByCategory = filteredList.filter(expense => {
      return expense.category === category
    });
    if (expensesByCategory.length === 1) {
      amountSom = expensesByCategory[0].amount;
    } else if(expensesByCategory.length > 1) {
      amountSom = expensesByCategory.reduce((previousValue, currentValue) => (previousValue.amount + currentValue.amount))
    } else {
      amountSom = 0
    }
    amountList[index] = amountSom;

    return {
      category,
      total: amountList[index]
    }
  });
}

export default {
  getMonthStatement,
}
