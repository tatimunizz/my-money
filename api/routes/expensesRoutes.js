import controller from '../controllers/expensesController.js';

const expensesRouter = (router) => {
  router.post('/expenses', async (req, res) => {
    const body = req.body;
    const query = req.query;
    try {
      const registry = await controller.expensesEntry(body, query);
      res.status(200).send({
        status_code: 200,
        data: registry,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      });
    }
  });

  router.get('/expenses', async (req, res) => {
    const query = req.query;
    try {
      const expensesList = await controller.getExpensesList(query);
      res.status(200).send({
        status_code: 200,
        data: expensesList,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      });
    }
  });

  router.get('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const expenses = await controller.getExpensesById(id);
      res.status(200).send({
        status_code: 200,
        data: expenses,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      });
    }
  });

  router.get('/expenses/:year/:month', async (req, res) => {
    const {year, month} = req.params;
    try {
      const expensesList = await controller.getExpensesByMonth(month, year);
      res.status(200).send({
        status_code: 200,
        data: expensesList,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message
      });
    }
  });

  router.put('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const updatedRegistry = await controller.updateExpenses(id, body);
      res.status(200).send({
        status_code: 200,
        data: updatedRegistry,
      })
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      });
    }
  });

  router.delete('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedExpense = await controller.deleteExpenses(id);
      res.status(200).send({
        status_code: 200,
        message: deletedExpense,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,

        error: e.message,
      });
    }
  });
}

export default { expensesRouter };
