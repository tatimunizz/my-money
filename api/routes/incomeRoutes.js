import controller from '../controllers/incomeController.js';

const incomeRouter = (router) => {
  router.post('/income', async (req, res) => {
    const body = req.body;
    try {
      const registry = await controller.incomeEntry(body);
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

  router.get('/income', async (req, res) => {
    const query = req.query;
    try {
      const incomeList = await controller.getIncomeList(query);
      res.status(200).send({
        status_code: 200,
        data: incomeList,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      });
    }
  });

  router.get('/income/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const income = await controller.getIncomeById(id);
      res.status(200).send({
        status_code: 200,
        data: income,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      });
    }
  });

  router.get('/income/:year/:month', async (req, res) => {
    const {year, month} = req.params;
    try {
      const incomeList = await controller.getIncomeByMonth(month, year);
      res.status(200).send({
        status_code: 200,
        data: incomeList,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message
      });
    }
  });

  router.put('/income/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const updatedRegistry = await controller.updateIncome(id, body);
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

  router.delete('/income/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedIncome = await controller.deleteIncome(id);
      res.status(200).send({
        status_code: 200,
        message: deletedIncome,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,

        error: e.message,
      });
    }
  });
}

export default { incomeRouter };
