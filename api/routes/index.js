import express from "express";
import income from './incomeRoutes.js';
import expenses from "./expensesRoutes.js";
import statement from "./statementRoutes.js";

const router = express.Router();

income.incomeRouter(router);
expenses.expensesRouter(router);
statement.statementRouter(router);

export default router;
