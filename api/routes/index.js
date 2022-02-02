import express from "express";
import income from './incomeRoutes.js';
import expenses from "./expensesRoutes.js";
import extract from "./extractRoutes.js";

const router = express.Router();

income.incomeRouter(router);
expenses.expensesRouter(router);
extract.extractRouter(router);

export default router;
