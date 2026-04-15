import Expenses from '../models/expenses.js';
import Income from '../models/income.js';
import expensesController from "./expensesController.js";
import incomeController from "./incomeController.js";
import income from "../models/income.js";
import isSameMonth from "date-fns/isSameMonth/index.js";
import expenses from "../models/expenses.js";

// MODIFICADO: Aceitar parâmetro user
const getMonthStatement = async (year, month, user) => {
  const incomeStatement = await totalIncome(year, month, user);
  const expensesStatement = await totalExpenses(year, month, user);
  const balance = monthBalance(incomeStatement.amount, expensesStatement.amount);
  const category = await categoryExpenses(year, month, user);
  return {
    totalIncome: incomeStatement.amount,
    totalExpenses: expensesStatement.amount,
    monthBalance: balance,
    categoryExpenses: category
  };
}

// MODIFICADO: Filtrar por usuário
const totalIncome = async (year, month, user) => {
  const incomeList = await incomeController.getIncomeByMonth(month, year);
  // Filtrar apenas incomes do usuário específico
  const userIncomes = incomeList.filter(income => income.user === user);
  return userIncomes.reduce((previousValue, currentValue) => ({amount: previousValue.amount + currentValue.amount}), {amount: 0});
}

// MODIFICADO: Filtrar por usuário
const totalExpenses = async (year, month, user) => {
  const expensesList = await expensesController.getExpensesByMonth(month, year);
  // Filtrar apenas expenses do usuário específico
  const userExpenses = expensesList.filter(expense => expense.user === user);
  return userExpenses.reduce((previousValue, currentValue)=> ({amount: previousValue.amount + currentValue.amount}), {amount: 0});
}

const monthBalance = (income, expenses) => {
  return income - expenses;
}

// MODIFICADO: Filtrar por usuário
const categoryExpenses = async (year, month, user) => {
  let amountSom;
  let amountList = [];
  const expensesList = await Expenses.find({}).exec();
  const categories = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras'];
  
  // Filtrar por mês E por usuário
  const filteredList = expensesList.filter(expense => {
    return isSameMonth(new Date(`${year}-${month}-01 00:00`), new Date(expense.date)) && expense.user === user;
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